import { Request, Response } from "express";
import { CreateProductionUseCase } from "./CreateProductionUseCase";

class CreateProductionController {
    async handle(request: Request, response: Response){
        
        try {
            const {name, level, costToUpgradeAmount, costToUpgradeResourceTypeId, returnedResourceAmount, returnedResourceResourceTypeId, timeToUpgrade, timeToHarvest} = request.body;

            const createProductionUseCase : CreateProductionUseCase = new CreateProductionUseCase();

            const newProduction = await createProductionUseCase.execute({
                name: name,
                level: level,
                costToUpgradeAmount: costToUpgradeAmount,
                costToUpgradeResourceTypeId: costToUpgradeResourceTypeId,
                returnedResourceAmount: returnedResourceAmount,
                returnedResourceResourceTypeId: returnedResourceResourceTypeId,
                timeToHarvest: timeToHarvest,
                timeToUpgrade: timeToUpgrade
            });
            return response.json(newProduction);       
        } catch (error) {
            return response.json({
                status: "Error to create Production",
                message: error
            });
        }
    }
}   

export { CreateProductionController };