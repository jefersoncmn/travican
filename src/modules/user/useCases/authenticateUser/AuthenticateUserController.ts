import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(request: Request, response: Response){
        const { username, password } = request.body;

        const authenticateUserUseCase = new AuthenticateUserUseCase();

        try {
            const token = await authenticateUserUseCase.execute({
                username: username,
                password: password
            });
    
            return response.json(token);
        } catch (error) {
            return response.json({
                status: "Error authenticate user",
                message: error
            });
        }
        
    }
}

export { AuthenticateUserController };