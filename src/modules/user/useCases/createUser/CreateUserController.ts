import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";


class CreateUserController {
    async handle(request: Request, response: Response){
        const { username, name, password } = request.body;

        const createUserUseCase = new CreateUserUseCase();

        try {
            const user = await createUserUseCase.execute({
                username: username,
                name: name,
                password: password
            });
            // const land = await cr

            return response.json(user);//Se der bom, retorna o usuário que foi cadastrado
        } catch (error) {
            return response.json({
                status: "Error",
                message: error
            });
        }
        

    }
}   

export { CreateUserController };