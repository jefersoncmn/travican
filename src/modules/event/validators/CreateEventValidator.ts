import { GetLandUseCase } from "../../land/useCases/getLand/GetLandUseCase";
import { GetProductionUseCase } from "../../production/useCases/getProduction/GetProductionUseCase";
import { GetResourceUseCase } from "../../resource/useCases/getResource/GetResourceUseCase";
import { GetResourceByLandUseCase } from "../../resource/useCases/getResourceByLand/GetResourceByLandUseCase";
import { GetSoldierUseCase } from "../../soldier/useCases/getSoldier/GetSoldierUseCase";
import { BuySoldierUseCase } from "../../user/useCases/buySoldier/BuySoldierUseCase";
import { GetUserUseCase } from "../../user/useCases/getUser/GetUserUseCase";
import { UpgradeUserProductionUseCase } from "../../user/useCases/updateUserProduction/UpdateUserProductionUseCase";

interface IEvent {
    id_user: string;
    operation: string;
    time: number;
    id_production: string;
    id_soldier: string;
    id_war: string;
}

class CreateEventValidator {
    async handle({id_user, operation, time, id_production, id_soldier, id_war}: IEvent){
       
        const getLandUseCase : GetLandUseCase = new GetLandUseCase();
        const land = await getLandUseCase.execute({id_user: id_user});
        const getResourceByLandUseCase : GetResourceByLandUseCase = new GetResourceByLandUseCase();
        const userResourceFood = await getResourceByLandUseCase.execute({idLand: land!.id, resourceTypeName: "Food"});
        const userResourceGold = await getResourceByLandUseCase.execute({idLand: land!.id, resourceTypeName: "Gold"});

        const upgradeUserProductionUseCase : UpgradeUserProductionUseCase = new UpgradeUserProductionUseCase();
        const buySoldierUseCase : BuySoldierUseCase = new BuySoldierUseCase();
        
        switch(operation){
            
            case 'upgradeProduction':{
                const getProductionUseCase : GetProductionUseCase = new GetProductionUseCase();
                const production = await getProductionUseCase.execute({id: id_production});
                const getResourceUseCase : GetResourceUseCase = new GetResourceUseCase();
                const resourceToUpgradeProduction = await getResourceUseCase.execute({id: production!.id_costToUpgrade});
                // Se for food
                if(resourceToUpgradeProduction!.id_resourceType == userResourceFood!.id_resourceType){
                    if(userResourceFood!.amount >= resourceToUpgradeProduction!.amount){
                        upgradeUserProductionUseCase.execute({idUser: id_user, idProduction: id_production});
                    }
                } else if(resourceToUpgradeProduction!.id_resourceType == userResourceGold!.id_resourceType){
                    if(userResourceFood!.amount >= resourceToUpgradeProduction!.amount){
                        upgradeUserProductionUseCase.execute({idUser: id_user, idProduction: id_production});
                    }
                }
                
                break;
            }
            case 'createSoldier':{
                const getSoldierUseCase : GetSoldierUseCase = new GetSoldierUseCase();
                const soldier = await getSoldierUseCase.execute({id: id_soldier});
                const getResourceUseCase : GetResourceUseCase = new GetResourceUseCase();
                const resourceToCreateSoldier = await getResourceUseCase.execute({id: soldier!.id_costToSpawn});
                
                // Se for food
                if(resourceToCreateSoldier!.id_resourceType == userResourceFood!.id_resourceType){
                    if(userResourceFood!.amount >= resourceToCreateSoldier!.amount){
                        await buySoldierUseCase.execute({idUser: id_user, idNewSoldier: id_soldier});
                    }
                } else if(resourceToCreateSoldier!.id_resourceType == userResourceGold!.id_resourceType){
                    if(userResourceFood!.amount >= resourceToCreateSoldier!.amount){
                        await buySoldierUseCase.execute({idUser: id_user, idNewSoldier: id_soldier});
                    }
                }
                
                break;
            }
            case 'attack':{
                console.log("Guerra iniciada");
                break;
            }
        }
    }
}   

export { CreateEventValidator };