import { client } from "../../../../model/prisma/client";
import { Event } from "../../../../model/event";

interface IProductionLootRequest{
    idUser: string,
    idProduction: string,
    idEvent: string,
    // callback: any
}

class ProductionLootUseCase {
    async execute({idUser, idProduction, idEvent}: IProductionLootRequest){
        //Acessar o recursos do usuário e mudar

        const userProduction = await client.production.findFirst(
            {
                where: {id: idProduction},
                select:{
                    timeToHarvest:true,
                    returnedResource:{
                        select:{
                            amount:true,
                            resourceType:{
                                select:{
                                    id:true
                                }
                            }
                        }
                    }
                }
            }
        );

        const userLand = await client.land.findUnique(
            {
                where:{id_user: idUser},
                select:{
                    id:true,
                }
            }
        );

        await client.resource.updateMany({
            where:{
                id_resourceType: userProduction!.returnedResource.resourceType.id,
                id_land: userLand!.id,
            },
            data:{
                amount: { increment: userProduction!.returnedResource.amount }
            }
        });

        // const _event = await client.event.findUnique({where:{id:idEvent}});

        // //Change event time
        // let _completeTime : Date = new Date();
        // _completeTime.setSeconds(_completeTime.getSeconds()+userProduction!.timeToHarvest);//TODO arrumar tempo
        // // _completeTime.toLocaleString('en-US', { timeZone: 'America/New_York' })
        // await client.event.update({
        //     where:{
        //         id: idEvent
        //     },
        //     data:{
        //         completeTime: _completeTime
        //     }
        // })

        // callback(new Event({id: _event!.id, time: _event!.time, completeTime: _event!.completeTime, id_production: _event!.id_production!, id_soldier: '', id_user: idUser, id_war: '', operation: _event!.operation}));
        
    }
}   
export { ProductionLootUseCase };