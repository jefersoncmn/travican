import { Request, Response } from "express";
import { CreateLandUseCase } from "./CreateLandUseCase";

class CreateLandController {
    async handle(request: Request, response: Response){
        
        try {
            const { name, username } = request.body;

            const createLandUseCase = new CreateLandUseCase();

            const user = await createLandUseCase.execute({
                name: name,
                username: username,
            });
            return response.json(user);       
        } catch (error) {
            return response.json({
                status: "Error to create Land",
                message: error
            });
        }
        

    }
}   

export { CreateLandController };