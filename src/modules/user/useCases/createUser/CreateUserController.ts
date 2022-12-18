import { Request, Response } from "express";
import { CreateEventUseCase } from "../../../event/useCases/createEvent/CreateEventUseCase";
import { CreateLandUseCase } from "../../../land/useCases/createLand/CreateLandUseCase";
import { GetUserUseCase } from "../getUser/GetUserUseCase";
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

            //Criar a Land
            const createLandUseCase : CreateLandUseCase = new CreateLandUseCase();
            const newLand = await createLandUseCase.execute({name: name, username: username});

            

            return response.json(user);//Se der bom, retorna o usuário que foi cadastrado
        } catch (error) {
            return response.json({
                status: "Error "+error,
                message: error
            });
        }
        

    }
}   

export { CreateUserController };