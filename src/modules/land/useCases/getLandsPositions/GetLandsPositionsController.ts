import { Request, Response } from "express";
import { GetLandsPositionsUseCase } from "./GetLandsPositionsUseCase";

class GetLandsPositionsController {
    async handle(request: Request, response: Response){
        
        try {
            const getLandsPositionsUseCase : GetLandsPositionsUseCase = new GetLandsPositionsUseCase();

            const lands = await getLandsPositionsUseCase.execute();
            return response.json(lands);       
        } catch (error) {
            return response.json({
                status: "Error to create Land",
                message: error
            });
        }
        

    }
}   

export { GetLandsPositionsController };