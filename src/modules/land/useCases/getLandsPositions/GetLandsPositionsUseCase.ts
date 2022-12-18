import { client } from "../../../../model/prisma/client";
import { CreateEventUseCase } from "../../../event/useCases/createEvent/CreateEventUseCase";
import { CreateResourceUseCase } from "../../../resource/useCases/createResource/CreateResourceUseCase";

class GetLandsPositionsUseCase {
    async execute(){

        return await client.land.findMany({
            select:{
                id:true,
                positionX:true,
                positionY:true,
                id_user:true
            }
        });

    }   
}

export { GetLandsPositionsUseCase };