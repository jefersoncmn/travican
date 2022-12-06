import { Request, Response } from "express";
import { CreateProductionUseCase } from "./CreateProductionUseCase";

class CreateProductionController {
    async handle(request: Request, response: Response){
        
        try {
            const {name, level, costToUpgradeAmount, costToUpgradeResourceTypeId, returnedResourceAmount, returnedResourceResourceTypeId, timeToUpgrade, timeToHarvest} = request.body;

            const createProductionUseCase : CreateProductionUseCase = new CreateProductionUseCase();

            const user = await createProductionUseCase.execute({
                name: name,
                level: level,
                costToUpgradeAmount: costToUpgradeAmount,
                costToUpgradeResourceTypeId: costToUpgradeResourceTypeId,
                returnedResourceAmount: returnedResourceAmount,
                returnedResourceResourceTypeId: returnedResourceResourceTypeId,
                timeToHarvest: timeToHarvest,
                timeToUpgrade: timeToUpgrade
            });
            return response.json(user);       
        } catch (error) {
            return response.json({
                status: "Error to create soldier",
                message: error
            });
        }
    }
}   

export { CreateProductionController };