import { Request, Response } from "express";
import { GetEventsUseCase } from "./GetEventsUseCase";

class GetEventsController {
    async handle(request: Request, response: Response){
        
        try {
            const getEventsUseCase : GetEventsUseCase = new GetEventsUseCase();
            const events = await getEventsUseCase.execute();
            return response.json(events);       
        } catch (error) {
            return response.json({
                status: "Error to get Events"+error,
                message: error
            });
        }
    }
}   

export { GetEventsController };