import e, { Request, Response } from "express";
import { Event } from "../../model/event";
import { GetEventsUseCase } from "../../modules/event/useCases/getEvents/GetEventsUseCase";
import { RemoveEventUseCase } from "../../modules/event/useCases/removeEvent/removeEventUseCase";
import { ArmyPaymentUseCase } from "../../modules/user/useCases/armyPayment/ArmyPaymentUseCase";
import { BuySoldierUseCase } from "../../modules/user/useCases/buySoldier/BuySoldierUseCase";
import { ProductionLootUseCase } from "../../modules/user/useCases/productionLoot/productionLootUseCase";
import { UpgradeUserProductionUseCase } from "../../modules/user/useCases/updateUserProduction/UpdateUserProductionUseCase";

class EventsController {
    private static instance: EventsController;

    public static getInstance(): EventsController {
        if (!EventsController.instance) {
            EventsController.instance = new EventsController();
        }
        return EventsController.instance;
    }
    
    events : Event[] = [];
    removeEventUseCase : RemoveEventUseCase = new RemoveEventUseCase();

    async getEventsToDataBase(){
        try {
            const getEventsUseCase : GetEventsUseCase = new GetEventsUseCase();
            const events = await getEventsUseCase.execute();
            for (const event of events) {
                event.completeTime = new Date();
                event.completeTime.setSeconds(event.completeTime.getSeconds() + event.time);
                // console.log(event);
                this.addEvent(event);
            }
            console.log("Eventos obtidos do banco de dados!");
        } catch (error) {
            console.log("Erro ao adicionar os eventos do banco de dados "+error);
        }
    }

    addEvent(event: Event){
        this.events.push(event);
        //arrumar na ordem da data de conclusão
        this.events.sort((a:any, b:any) => a.completeTime - b.completeTime);
    }

    async eventQueue(){
        this.events = [];
        await this.getEventsToDataBase();
        setInterval(async ()=>{
            if(this.events.length > 0){
                console.log("Event queue is running");
                if(new Date() >= this.events[0].completeTime!){
                    this.executeEvent(this.events[0]);
                    this.events.shift();
                }
            }
        }, 1000);
    }

    removeEventOnDataBase(event: Event){
        this.removeEventUseCase.execute({id: event.id!});
    }

    async executeEvent(event: Event){
        const upgradeUserProductionUseCase : UpgradeUserProductionUseCase = new UpgradeUserProductionUseCase();
        const buySoldierUseCase : BuySoldierUseCase = new BuySoldierUseCase();
        const productionLootUseCase : ProductionLootUseCase = new ProductionLootUseCase();
        const armyPaymentUseCase : ArmyPaymentUseCase = new ArmyPaymentUseCase();

        switch(event.operation){
            case 'upgradeProduction':{
                // UpgradeProductionController.handle();
                console.log("Produção do usuario "+event.id_user+" upada!");
                upgradeUserProductionUseCase.execute({idUser: event.id_user, idProduction: event.id_production}) //TODO Test this <--------------------------
                this.removeEventOnDataBase(event);
                break;
            }
            case 'createSoldier':{
                buySoldierUseCase.execute({idUser: event.id_user, idNewSoldier: event.id_soldier});
                console.log("Soldado criado para o usuário "+event.id_user);
                this.removeEventOnDataBase(event);
                break;
            }
            case 'farm':{
                console.log("Usuário "+event.id_user+" ganhou loot da farm!");
                await productionLootUseCase.execute({idUser: event.id_user, idProduction: event.id_production, idEvent: event.id!});
                event.completeTime = new Date();
                event.completeTime.setSeconds(event.completeTime.getSeconds()+event.time);
                this.addEvent(new Event({id: event.id, id_user: event.id_user, completeTime: event.completeTime, id_production: event.id_production, id_soldier: event.id_soldier, id_war: event.id_war, operation: "farm", time: event.time}));
                break;
            }
            case 'mine':{
                console.log("Usuário "+event.id_user+" ganhou loot da mina!");
                await productionLootUseCase.execute({idUser: event.id_user, idProduction: event.id_production, idEvent: event.id!});
                event.completeTime = new Date();
                event.completeTime.setSeconds(event.completeTime.getSeconds()+event.time);
                this.addEvent(new Event({id: event.id, id_user: event.id_user, completeTime: event.completeTime, id_production: event.id_production, id_soldier: event.id_soldier, id_war: event.id_war, operation: "mine", time: event.time}));
                break;

            }
            case 'armyPayment':{
                armyPaymentUseCase.execute({idUser: event.id_user});
                console.log("Usuário "+event.id_user+" teve que pagar suas tropas!");
                event.completeTime = new Date();
                event.completeTime.setSeconds(event.completeTime.getSeconds()+event.time);
                this.addEvent(new Event({id: event.id, id_user: event.id_user, completeTime: event.completeTime, id_production: event.id_production, id_soldier: event.id_soldier, id_war: event.id_war, operation: event.operation, time: event.time}));
                break;
            }
            case 'attack':{
                console.log("Guerra iniciada");
                break;
            }
            
        }
        
    }
}   

export { EventsController };