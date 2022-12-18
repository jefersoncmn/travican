import { Request, Response } from "express";
import { GetAllProductionsUseCase } from "./GetAllProductionsUseCase";

class GetAllProductionsController {
    async handle(request: Request, response: Response){
        
        try {

            const getAllProductionsUseCase : GetAllProductionsUseCase = new GetAllProductionsUseCase();

            const productions = await getAllProductionsUseCase.execute();

            return response.json(productions);       
        } catch (error) {
            return response.json({
                status: "Error to get all productions",
                message: error
            });
        }
    }
}   

export { GetAllProductionsController };