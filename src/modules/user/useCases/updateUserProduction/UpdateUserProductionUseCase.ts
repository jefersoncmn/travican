import { client } from "../../../../model/prisma/client";

interface IUpgradeUserProductionUseCaseRequest{
    idUser: string,
    idProduction: string
}

class UpgradeUserProductionUseCase {
    async execute({idUser, idProduction}: IUpgradeUserProductionUseCaseRequest){
        const user = await client.user.findUnique({
            where:{
                id: idUser
            },
            select:{
                land:{
                    select:{
                        id:true,
                        ProductionLand:{
                            select:{
                                id:true,
                                production:{
                                    select:{
                                        id:true,
                                        name:true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        const nextProduction = await client.production.findFirst({where:{id:idProduction}});
        for (const productionLand of user!.land!.ProductionLand) {
            
            console.log(productionLand.id);
            console.log(nextProduction!.id);
            if(productionLand.production.name == nextProduction!.name){
                if(nextProduction == null){
                    return null;
                }
                console.log(nextProduction.id);
                console.log(user!.land!.id);
                await client.productionLand.deleteMany({
                    where:{
                        id: productionLand.id,
                        id_land: user!.land!.id,
                    }
                })
                await client.productionLand.create({
                    data:{
                        land: {connect:{id: user!.land!.id}},
                        production: {connect:{id: nextProduction.id}}
                    }
                })
            }
        }
    }
}   
export { UpgradeUserProductionUseCase };