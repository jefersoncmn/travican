import { client } from "../../../../model/prisma/client";

class GetAllSoldiersUseCase {
    async execute(){
        return await client.soldier.findMany({
            select:{
                id:true,
                name:true,
                attack:true,
                defense:true,
                timeToSpawn:true,
                costToSpawn:{
                    select:{
                        amount:true,
                        resourceType:{
                            select:{
                                id:true,
                                name:true
                            }
                        }
                    }
                },
                budget:{
                    select:{
                        amount:true,
                        resourceType:{
                            select:{
                                id:true,
                                name:true
                            }
                        }
                    }
                }
                
            }
        });
    }   
}

export { GetAllSoldiersUseCase };