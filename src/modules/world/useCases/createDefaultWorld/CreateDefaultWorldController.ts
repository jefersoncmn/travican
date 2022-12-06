import { Request, Response } from "express";
import { CreateWorldUseCase } from "../createWorld/CreateWorldUseCase";

class CreateDefaultWorldController {
    async handle(){
        try {
            const defaultWorlds = [
                {
                    name: "Teste", 
                    lootPercentage: 1,
                },
            ]
            
            const createWorldUseCase : CreateWorldUseCase = new CreateWorldUseCase();

            for await (const world of defaultWorlds) {
                const newWorld = await createWorldUseCase.execute({
                    name: world.name,
                    lootPercentage: world.lootPercentage
                });
            }
            
        } catch (error) {
            console.log("Error to create default worlds"+ error);
        }
    }
}   

export { CreateDefaultWorldController };