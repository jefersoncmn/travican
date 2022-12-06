import { Request, Response } from "express";
import { CreateWorldUseCase } from "./CreateWorldUseCase";

class CreateWorldController {
    async handle(request: Request, response: Response){
        
        try {
            const {name, lootPercentage} = request.body;

            const createWorldUseCase : CreateWorldUseCase = new CreateWorldUseCase();

            const user = await createWorldUseCase.execute({
                name: name,
                lootPercentage: lootPercentage
            });
            return response.json(user);       
        } catch (error) {
            return response.json({
                status: "Error to create World",
                message: error
            });
        }
    }
}   

export { CreateWorldController };