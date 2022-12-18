import { Request, Response } from "express";
import { GetUserArmyUseCase } from "./GetUserArmyUseCase";

class GetUserArmyController {
    async handle(request: Request, response: Response){
        
        try {
            const {idUser} = request.params;

            const getUserArmyUseCase : GetUserArmyUseCase = new GetUserArmyUseCase();
            const userArmy = await getUserArmyUseCase.execute({idUser:idUser});

            return response.json(userArmy);
        } catch (error) {
            return response.json({
                status: "Error "+error,
                message: error
            });
        }
    }

}   
export { GetUserArmyController };