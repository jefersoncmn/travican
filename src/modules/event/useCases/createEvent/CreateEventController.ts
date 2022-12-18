import { Request, Response } from "express";
import { CreateEventUseCase } from "./CreateEventUseCase";

class CreateEventController {
    async handle(request: Request, response: Response){
        
        try {
            const { id_user, operation, time, id_production, id_soldier, id_war } = request.body;

            const createEventUseCase : CreateEventUseCase = new CreateEventUseCase();


            const newEvent = await createEventUseCase.execute({
                time: time,
                id_production: id_production,
                id_soldier: id_soldier,
                id_user: id_user,
                id_war: id_war,
                operation: operation
            });

            return response.json(newEvent);       
        } catch (error) {
            return response.json({
                status: "Error to create Event"+error,
                message: error
            });
        }
        

    }
}   

export { CreateEventController };