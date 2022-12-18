import { client } from "../../../../model/prisma/client";
import { Event } from "../../../../model/event";

interface IArmyPaymentRequest{
    idUser: string,
}

class ArmyPaymentUseCase {
    async execute({ idUser }: IArmyPaymentRequest){
        //Acessar o recursos do usuário e mudar

        const user = await client.user.findUnique(
            {
                where: { id: idUser },
                select:{
                    land:{
                        select:{
                            id:true,
                            army:{
                                select:{
                                    ArmySoldier:{
                                        select:{
                                            soldier:{
                                                select:{
                                                    id:true,
                                                    name:true,
                                                    attack:true,
                                                    defense:true,
                                                    budget:{
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
                                        }
                                    }
                                }
                            },
                            resources:{
                                select:{
                                    id:true,
                                    resourceType:{
                                        select:{
                                            id:true,
                                            name:true
                                        }
                                    }
                                }
                            }
                        }
                    },
                }
            }
        );
        
        let armyCost = 0;
        for (const soldier of user!.land!.army.ArmySoldier) {
            armyCost += soldier!.soldier!.budget!.amount!;
        }
    
        await client.resource.updateMany({
            where:{
                id_resourceType: user?.land?.resources.find((resource)=>{if(resource.resourceType.name=="Food"){return resource}})?.resourceType.id,
                id_land: user!.land!.id,
            },
            data:{
                amount: { decrement: armyCost }
            }
        });

        // const _event = await client.event.findUnique({where:{id:idEvent}});
        //Change event time
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
export { ArmyPaymentUseCase };