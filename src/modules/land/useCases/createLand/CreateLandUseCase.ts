import { connect } from "mongoose";
import { client } from "../../../../model/prisma/client";

interface ICreateLandRequest {
    name: string;
    username: string;
}

class CreateLandUseCase {
    async execute({name, username}: ICreateLandRequest){

        //Verificar se usuário já tem uma Land
        const user = await client.user.findFirst({where:{userName:username}});
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

        const gold = await client.resourceType.findFirst({ where:{ name:"Gold"}})
        const world = await client.world.findFirst({where:{name:"first"}})
        const farm = await client.production.findFirst({where:{name:"Farm", level:1}});
        const mine = await client.production.findFirst({where:{name:"Mine", level:1}});

        const newLand = await client.land.create({
           data:{
                name: name,
                positionX: xPosition,
                positionY: yPosition,
                resource: {create:{amount:0, resourceType: {connect:{id:gold?.id}}}},
                army: {create: {}},
                world: {connect:{id:world?.id}},
                // ProductionLand: {
                //     create:{
                //         production: {connect:{id:mine?.id}},
                //     }
                // },
                user: {connect:{userName: username}},
            }
        });
        
    }   
}

export { CreateLandUseCase };