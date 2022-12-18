import { client } from "../../../../model/prisma/client";
import { GetResourceTypeByNameUseCase } from "../../../resourceType/useCases/getResourceType/GetResourceTypeByNameUseCase";

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

        const getResourceTypeByNameUseCase : GetResourceTypeByNameUseCase = new GetResourceTypeByNameUseCase();
        const food = await getResourceTypeByNameUseCase.execute({name: "Food"});
        const gold = await getResourceTypeByNameUseCase.execute({name: "Gold"});
        
        const newWorld = await client.world.create({
            data:{
                name: name,
                lootPercentage: lootPercentage,
                WorldResourceType: {
                    create: [
                        {
                            resourceType: { connect: {id: food!.id}}
                        },
                        {
                            resourceType: { connect: {id: gold!.id}}
                        }
                    ]
                }
            }
        });
    }   
}

export { CreateWorldUseCase };