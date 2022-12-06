import dayjs from "dayjs";
import { AppError } from "../../../../errors/AppError";
import { client } from "../../../../model/prisma/client"
import { GenerateRefreshToken } from "../../../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../../../provider/GenerateTokenProvider";

class RefreshTokenUserUseCase {
    async execute(refresh_Token: string){
        //Verifica se existe o token
        const refreshToken = await client.refreshToken.findFirst({
            where: {
                id: refresh_Token
            }
        })

        if(!refreshToken){
            throw new AppError("Refresh token invalid");
        }
        
        //verificar se o token anterior expirou pra pegar um novo
        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));//Verificar se o token expirado terminou depois do tempo definido
        
        //se existir refreshToken
        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(refreshToken.id_user);
        

        if(refreshTokenExpired){
            //Remover o refreshToken expirado
            await client.refreshToken.deleteMany({
                where:{
                    id_user: refreshToken.id_user
                }
            })

            const generateRefreshTokenProvider = new GenerateRefreshToken();
            const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.id_user);
            
            return { token, newRefreshToken };
        }

        return { token };

    }
}

export { RefreshTokenUserUseCase }