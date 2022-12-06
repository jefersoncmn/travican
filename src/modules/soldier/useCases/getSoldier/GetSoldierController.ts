import { Request, Response } from "express";
import { GetSoldierUseCase } from "./GetSoldierUseCase";


class GetSoldierControler {
    async handle(request: Request, response: Response){
        
        try {
            const { id } = request.params;

            const getSoldierUseCase : GetSoldierUseCase = new GetSoldierUseCase();

            const user = await getSoldierUseCase.execute({
                id: id
            });
            return response.json(user);       
        } catch (error) {
            return response.json({
                status: "Error to get Soldier",
                message: error
            });
        }
    }
}   

export { GetSoldierControler };