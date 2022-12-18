import { client } from "../../../../model/prisma/client";

interface IGetUserArmyRequest {
    idUser: string
}

class GetUserArmyUseCase {
    async execute({idUser}:IGetUserArmyRequest){

        const user = await client.user.findFirst({
            where:{
                id:idUser
            },
            select:{
                id: true,
                name: true,
                username: true,
                land: {
                    select: {
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

export { GetUserArmyUseCase };