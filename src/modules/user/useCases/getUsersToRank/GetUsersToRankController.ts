import { Request, Response } from "express";
import { GetUsersToRankUseCase } from "./GetUsersToRankUseCase";

class GetUsersToRankController {
    async handle(request: Request, response: Response){
        
        try {
            const getUsersToRankUseCase : GetUsersToRankUseCase = new GetUsersToRankUseCase();
            const users = await getUsersToRankUseCase.execute();

            return response.json(users);
        } catch (error) {
            return response.json({
                status: "Error "+error,
                message: error
            });
        }
    }

}   
export { GetUsersToRankController };