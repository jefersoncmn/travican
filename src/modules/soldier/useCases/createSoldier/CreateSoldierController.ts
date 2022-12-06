import { Request, Response } from "express";
import { CreateSoldierUseCase } from "./CreateSoldierUseCase";


class CreateSoldierController {
    async handle(request: Request, response: Response){
        
        try {
            const { name, attack, defense, timeToSpawn, costToSpawnAmount, costToSpawnResourceTypeId, budgetAmout, budgetResourceTypeId} = request.body;

            const createSoldierUseCase : CreateSoldierUseCase = new CreateSoldierUseCase();

            const user = await createSoldierUseCase.execute({
                name: name,
                attack : attack,
                defense : defense,
                timeToSpawn : timeToSpawn,
                costToSpawnAmount : costToSpawnAmount, 
                costToSpawnResourceTypeId : costToSpawnResourceTypeId, 
                budgetAmout : budgetAmout, 
                budgetResourceTypeId : budgetResourceTypeId
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

export { CreateSoldierController };