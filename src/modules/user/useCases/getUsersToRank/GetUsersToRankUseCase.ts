import { client } from "../../../../model/prisma/client";

class GetUsersToRankUseCase {
    async execute(){

        const user = await client.user.findMany({
            select:{
                id: true,
                name: true,
                username: true,
                land: {
                    select: {
                        //Resources
                        resources:{
                            select:{
                                id:true,
                                amount:true,
                                resourceType:{
                                    select:{
                                        id:true,
                                        name:true
                                    }
                                }
                            }
                        },
                        //Army
                        army:{
                            select:{
                                id: true,
                                ArmySoldier:{
                                    select:{
                                        soldier:{
                                            select:{
                                                id: true,
                                                name:true,
                                                attack:true,
                                                defense:true,
                                                budget:{
                                                    select:{
                                                        amount:true,
                                                        resourceType:{
                                                            select:{
                                                                name:true
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }                                
                            }
                        },
                    }
                }
            }
        });
        
        return user;
    }   
}

export { GetUsersToRankUseCase };