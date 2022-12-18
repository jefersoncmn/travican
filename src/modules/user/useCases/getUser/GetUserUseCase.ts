import { connect } from "mongoose";
import { client } from "../../../../model/prisma/client";

interface IGetUserRequest {
    id: string;
}

// interface IGetUserResponse {
//     id: string;
//     username: string;
//     name: string;

// }

class GetUserUseCase {
    async execute({id}: IGetUserRequest){

        const user = await client.user.findFirst({
            where:{id: id},
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
                        //Production
                        ProductionLand:{
                            select:{
                                production:{
                                    select:{
                                        timeToHarvest:true,
                                        timeToUpgrade:true,
                                        id:true,
                                        name:true,
                                        level:true,
                                        returnedResource:{
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
                                }
                            }
                        },
                        //World
                        world:{
                            select:{
                                id:true,
                                name:true,
                            }
                        },
                        //LandAttack
                        LandAttack:{
                            select:{
                                landAttack:{
                                    select:{
                                        id:true,
                                        user:{
                                            select:{
                                                id:true,
                                                username:true
                                            }
                                        },
                                        name:true,
                                    }
                                }
                            }
                        },
                        //LandDefense
                        LandDefense:{
                            select:{
                                landDefense:{
                                    select:{
                                        id:true,
                                        user:{
                                            select:{
                                                id:true,
                                                username:true
                                            }
                                        },
                                        name:true,
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

export { GetUserUseCase };