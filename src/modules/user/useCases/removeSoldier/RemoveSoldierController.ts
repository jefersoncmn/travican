import { Request, Response } from "express";
import { RemoveSoldierUseCase } from "./RemoveSoldierUseCase";

class RemoveSoldierController {
    async handle(request: Request, response: Response){
        const { idUser, idSoldier } = request.body;

        const removeSoldierUseCase : RemoveSoldierUseCase = new RemoveSoldierUseCase();

        try {
            const user = await removeSoldierUseCase.execute({
                idUser: idUser,
                idSoldier: idSoldier
            });

            return response.json(user);
        } catch (error) {
            return response.json({
                status: "Error to remove soldier"+error,
                message: error
            });
        }
    }

}   
export { RemoveSoldierController };