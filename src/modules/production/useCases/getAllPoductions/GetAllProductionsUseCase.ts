import { client } from "../../../../model/prisma/client";

class GetAllProductionsUseCase {
    async execute(){
        return await client.production.findMany(
            {
                select:{
                    id:true,
                    name:true,
                    level:true,
                    timeToHarvest:true,
                    timeToUpgrade:true,
                    returnedResource:{
                        select:{
                            amount:true,
                            resourceType:{
                                select:{
                                    name:true,
                                }
                            }
                        }
                    }
                }
            }
        );
    }   
}

export { GetAllProductionsUseCase };