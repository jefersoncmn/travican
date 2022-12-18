import { hash } from "bcryptjs";//Criptografa
import { connect } from "mongoose";
import { AppError } from "../../../../errors/AppError";
import { client } from "../../../../model/prisma/client";
import { CreateLandUseCase } from "../../../land/useCases/createLand/CreateLandUseCase";

interface IUserRequest {
    name: string;
    password : string;
    username : string;
}

class CreateUserUseCase {
    async execute({name, username, password}: IUserRequest){

        //Verificar se usuário existe
        const userAlreadyExists = await client.user.findFirst({
            where:{
                username: username
            }
        });

        if(userAlreadyExists){
            throw new AppError("User already exists!");
        }

        //Cadastra o usuário
        const passwordHash = await hash(password, 8);//Criptografa a senha
        const createLandUseCase : CreateLandUseCase = new CreateLandUseCase();
        
        const newUser = await client.user.create({
            data:{
                name: name,
                username: username,
                password: passwordHash,
            }
        });
        // //Criar a Land
        // const newLand = await createLandUseCase.execute({name: name, username: username});

        return newUser;
    }   

    
}

export { CreateUserUseCase };