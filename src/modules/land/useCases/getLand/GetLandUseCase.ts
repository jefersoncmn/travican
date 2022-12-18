import { connect } from "mongoose";
import { client } from "../../../../model/prisma/client";

interface IGetLandRequest {
    id?: string;
    id_user?: string
}

class GetLandUseCase {
    async execute({id, id_user}: IGetLandRequest){
        if(id_user){
            return await client.land.findFirst({
                where:{id_user: id_user}
            })
        }

        const land = await client.land.findFirst({
            where:{id: id}
        });
        
        return land;
    }   
}

export { GetLandUseCase };