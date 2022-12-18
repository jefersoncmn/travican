import { client } from "../../../../model/prisma/client";

interface ICreateSoldierUseCaseRequest{
    idUser: string,
    idNewSoldier: string,
}

class BuySoldierUseCase {
    async execute({idUser, idNewSoldier}: ICreateSoldierUseCaseRequest){
        const user = await client.user.findUnique({
            where:{id:idUser},
            select:{
                land:{
                    select:{
                        army:{
                            select:{
                                id:true,
                                ArmySoldier:{
                                    select:{
                                        id:true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        const updatedArmy = await client.armySoldier.create({
            data:{
                army:{
                    connect:{id:user!.land!.army.id}
                },
                soldier:{
                    connect:{id:idNewSoldier}
                }
            }
            /*await client.productionLand.create({
                    data:{
                        land: {connect:{id: user!.land!.id}},
                        production: {connect:{id: nextProduction.id}}
                    }
                })
                */
        });

        return updatedArmy;
    }
}   
export { BuySoldierUseCase };