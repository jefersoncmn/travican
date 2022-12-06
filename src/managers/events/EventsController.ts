import { Request, Response } from "express";
import { CreateLandUseCase } from "./CreateLandUseCase";

class EventsController {
    private static instance: EventsController;

    public static getInstance(): EventsController {
        if (!EventsController.instance) {
            EventsController.instance = new EventsController();
        }
        return EventsController.instance;
    }
    
    events : Event[] = [];

    addEvent(event: Event){
        //arrumar na ordem da data de conclusão
        // this.events.push(event);
    }

    eventPoll(){
        setInterval(()=>{
            //Pegar o ultimo evento e ficar verificando se bate com o tempo atual do servidor, se bater, executar o evento
            // this.events.
        }, 1000);
    }

    executeEvent(operation: string){
        switch(operation){
            case 'upgradeProduction':{
                // UpgradeProductionController.handle();
                break;
            }
            case 'createSoldier':{

                break;
            }
            case 'attack':{
                
                break;
            }
        }
    }
}   

export { EventsController };