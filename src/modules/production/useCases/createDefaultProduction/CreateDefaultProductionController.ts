import { Request, Response } from "express";
import { GetResourceTypeUseCase } from "../../../resourceType/useCases/getResourceType/GetResourceTypeUseCase";
import { CreateProductionUseCase } from "../createProduction/CreateProductionUseCase";

class CreateDefaultProductionController {
    async handle(){
        
        try {
            const getResourceTypeUseCase : GetResourceTypeUseCase = new GetResourceTypeUseCase();
            const food = await getResourceTypeUseCase.execute({name: "Food"});
            const gold = await getResourceTypeUseCase.execute({name: "Gold"});

            const defaultProductions = [
                {
                    name: "Mina", 
                    level: 1,
                    costToUpgradeAmount: 0,
                    costToUpgradeResourceTypeId: gold!.id,
                    returnedResourceAmount: 100.0,
                    returnedResourceResourceTypeId: gold!.id,
                    timeToHarvest: 60000,
                    timeToUpgrade: 0
                },
                {
                    name: "Mina", 
                    level: 2,
                    costToUpgradeAmount: 1000,
                    costToUpgradeResourceTypeId: gold!.id,
                    returnedResourceAmount: 200.0,
                    returnedResourceResourceTypeId: gold!.id,
                    timeToHarvest: 120000,
                    timeToUpgrade: 300000,
                },
                {
                    name: "Fazenda", 
                    level: 1,
                    costToUpgradeAmount: 0,
                    costToUpgradeResourceTypeId: gold!.id,
                    returnedResourceAmount: 10.0,
                    returnedResourceResourceTypeId: food!.id,
                    timeToHarvest: 60000,
                    timeToUpgrade: 0
                },
                {
                    name: "Fazenda", 
                    level: 2,
                    costToUpgradeAmount: 5000,
                    costToUpgradeResourceTypeId: gold!.id,
                    returnedResourceAmount: 20.0,
                    returnedResourceResourceTypeId: food!.id,
                    timeToHarvest: 120000,
                    timeToUpgrade: 300000,
                },
                
            ]
            const createProductionUseCase : CreateProductionUseCase = new CreateProductionUseCase();

            for await (const production of defaultProductions) {
                const newProduction = await createProductionUseCase.execute({
                    name: production.name,
                    level: production.level,
                    costToUpgradeAmount: production.costToUpgradeAmount,
                    costToUpgradeResourceTypeId: production.costToUpgradeResourceTypeId,
                    returnedResourceAmount: production.returnedResourceAmount,
                    returnedResourceResourceTypeId: production.returnedResourceResourceTypeId,
                    timeToHarvest: production.timeToHarvest,
                    timeToUpgrade: production.timeToUpgrade
                });
            }
            
        } catch (error) {
            console.log("Error to create Default productions");
        }
    }
}
export { CreateDefaultProductionController };