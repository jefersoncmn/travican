import { connect } from "mongoose";
import { client } from "../../../../model/prisma/client";
import { CreateEventUseCase } from "../../../event/useCases/createEvent/CreateEventUseCase";
import { CreateResourceUseCase } from "../../../resource/useCases/createResource/CreateResourceUseCase";

interface ICreateLandRequest {
    name: string;
    username: string;
}

class CreateLandUseCase {
    async execute({name, username}: ICreateLandRequest){

        //Verificar se usuário já tem uma Land
        const user = await client.user.findFirst({where:{username:username}});
        const userLandAlreadyExists = await client.land.findFirst({
            where:{
                id_user: user?.id
            }
        });

        if(userLandAlreadyExists){
            throw new Error("User Land already exists!");
        }

        //Encontrar posicao disponível no mapa
        let canBuild = false;
        let xPosition = 0;
        let yPosition = 0;
        while(canBuild == false) {
            const occupiedPosition = await client.land.findFirst({where: {positionX: xPosition, positionY: yPosition}});//Procura se tem alguém na posição
            if(occupiedPosition != null){
                if(Math.round(Math.random()) < 0.5){
                    xPosition += 1;
                } else {
                    yPosition += 1;
                }
            } else {
                canBuild = true;
            }
        }

        const food = await client.resourceType.findFirst({ where:{ name:"Food"}});
        const gold = await client.resourceType.findFirst({ where:{ name:"Gold"}});
        const world = await client.world.findFirst({where:{name:"Teste"}});
        const farm = await client.production.findFirst({where:{name:"Fazenda", level:1}});
        const mine = await client.production.findFirst({where:{name:"Mina", level:1}});
        const createResourceUseCase : CreateResourceUseCase = new CreateResourceUseCase();
        
        const resourceGold = await createResourceUseCase.execute({amount: 0, resourceTypeId: food!.id});
        const resourceFood = await createResourceUseCase.execute({amount: 0, resourceTypeId: gold!.id});
        

        try {
            const newLand = await client.land.create({
                data:{
                    name: name,
                    positionX: xPosition,
                    positionY: yPosition,

                    resources:{
                        connect:[{id: resourceGold!.id}, {id: resourceFood!.id}]
                    },
                    army: {create: {}},
                    world: {connect:{id:world!.id}},

                    ProductionLand: {

                        create:[
                            {
                                production: {connect:{id: farm!.id}},
                            },
                            {
                                production: {connect:{id: mine!.id}},
                            }
                        ]
                    },
                    user: {connect:{username: username}},
                }
            });

            //Create productions events
            const createEventUseCase : CreateEventUseCase = new CreateEventUseCase();
            await createEventUseCase.execute({id_user: user!.id, time: farm!.timeToHarvest, operation: "farm", id_production: farm!.id, id_soldier:"", id_war:""});
            await createEventUseCase.execute({id_user: user!.id, time: mine!.timeToHarvest, operation: "mine", id_production: mine!.id, id_soldier:"", id_war:""});
            await createEventUseCase.execute({id_user: user!.id, time: 60, operation: "armyPayment", id_production: mine!.id, id_soldier:"", id_war:""})
        } catch (error) {
            console.log(error);
        }

        return null;
        
    }   
}

export { CreateLandUseCase };