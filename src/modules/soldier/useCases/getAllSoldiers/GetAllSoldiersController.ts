import { Request, Response } from "express";
import { GetAllSoldiersUseCase } from "./GetAllSoldiersUseCase";

class GetAllSoldiersController {
    async handle(request: Request, response: Response){
        
        try {
            const getAllSoldiersUseCase : GetAllSoldiersUseCase = new GetAllSoldiersUseCase();

            const soldiers = await getAllSoldiersUseCase.execute();
            return response.json(soldiers);       
        } catch (error) {
            return response.json({
                status: "Error to return all soldiers",
                message: error
            });
        }
    }
}   

export { GetAllSoldiersController };