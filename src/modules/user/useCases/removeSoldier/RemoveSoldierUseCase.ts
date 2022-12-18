import { client } from "../../../../model/prisma/client";

interface IRemoveSoldierRequest{
    idUser: string,
    idSoldier: string
}

class RemoveSoldierUseCase {
    async execute({idUser, idSoldier}: IRemoveSoldierRequest){
        const user = await client.user.findFirst({
            where:{
                id: idUser
            },
            select:{
                land:{
                    select:{
                        id:true,
                        army:{
                            select:{
                                id: true,
                                ArmySoldier:{
                                    select:{
                                        id:true,
                                        id_soldier:true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        for (const armySoldier of user!.land!.army.ArmySoldier) {
            if(armySoldier.id_soldier == idSoldier){
                const updatedArmy = await client.armySoldier.delete({
                    where:{
                        // id_soldier: idSoldier,
                        // id_army: user?.land?.army.id
                        id: armySoldier.id
                    }
                });
                return;
            }
        }

        
    }
}   
export { RemoveSoldierUseCase };