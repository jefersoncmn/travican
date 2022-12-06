import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import { client } from "../../../../model/prisma/client";
import { GenerateRefreshToken } from "../../../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../../../provider/GenerateTokenProvider";

interface IRequest{
    username: string;
    password: string;
}

class AuthenticateUserUseCase {
    async execute({username, password}: IRequest){
        //Verificar se usuário existe
        const userAlreadyExists = await client.user.findFirst({
            where: {
                userName: username
            }
        });

        if(!userAlreadyExists){
            throw new AppError("User or password incorrect");
        }

        //Verificar se a senha está correta

        const passwordMatch = await compare(password, userAlreadyExists.password);//Verificar a entrada com a senha criptografada

        if(!passwordMatch){
            throw new AppError("User or password incorrect");
        }

        //Gerar token do usuário
        //chave gerada de https://www.uuidgenerator.net
        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(userAlreadyExists.id);

        //Remover refreshToken do usuário que logou
        await client.refreshToken.deleteMany({
            where:{
                id_user: userAlreadyExists.id,
            },
        });

        const generateRefreshToken = new GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);

        return { token, refreshToken };
    }
}

export { AuthenticateUserUseCase };