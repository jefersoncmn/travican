import { Request, Response } from "express";
import { EventsController } from "../../../../managers/events/EventsController";

class GetEventQueueController {
    async handle(request: Request, response: Response){
        
        try {
            const eventsController = EventsController.getInstance();
            return response.json(eventsController.events);       
        } catch (error) {
            return response.json({
                status: "Error to get Events queue"+error,
                message: error
            });
        }
        

    }
}   

export { GetEventQueueController };