import { connect } from "mongoose";
import { create } from "node-firebird";
import { client } from "../../../../model/prisma/client";
import { GetResourceTypeUseCase } from "../../../resourceType/useCases/getResourceType/GetResourceTypeUseCase";

interface ICreateWorldRequest {
    name: string;
    lootPercentage: number;
}

class CreateWorldUseCase {
    async execute({name, lootPercentage}: ICreateWorldRequest){

        //Verificar se já existe
        const worldAlreadyExists = await client.world.findFirst({
            where:{
                name: name,
            }
        });

        if(worldAlreadyExists){
            throw new Error("World already exists!");
        }

        const getResourceTypeUseCase : GetResourceTypeUseCase = new GetResourceTypeUseCase();
        const food = await getResourceTypeUseCase.execute({name: "Food"});
        const gold = await getResourceTypeUseCase.execute({name: "Gold"});

        const newWorld = await client.world.create({
            data:{
                name: name,
                lootPercentage: lootPercentage,
            }
        });

        const worldResourceTypeFood = await client.worldResourceType.create({
            data:{
                id_resourceType: food!.id,
                id_world: newWorld.id,
            },
        });
        const worldResourceTypeGold = await client.worldResourceType.create({
            data:{
                id_resourceType: gold!.id,
                id_world: newWorld.id,
            },
        });

        await client.world.update({
            where:{
                id: newWorld.id,
            },
            data:{
                WorldResourceType: {connect: [{id:worldResourceTypeFood.id},{id:worldResourceTypeGold.id}]}
            }
        }) 
    }   
}

export { CreateWorldUseCase };