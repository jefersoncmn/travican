import { Request, Response } from "express";
import { CreateResourceTypeUseCase } from "./CreateResourceTypeUseCase";

class CreateResourceTypeController {
    async handle(request: Request, response: Response){
        const { name } = request.body;

        const createResourceTypeUseCase = new CreateResourceTypeUseCase();
        //TO DO arrumar tudo 
        try {
            const user = await createResourceTypeUseCase.execute({
                name: name,
            });
            return response.json(user);        
        } catch (error) {
            return response.json({
                status: "Error to create ResourceType",
                message: error
            });
        }
        

    }
}   

export { CreateResourceTypeController };