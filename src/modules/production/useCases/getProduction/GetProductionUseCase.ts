import { client } from "../../../../model/prisma/client";

interface IGetProductionRequest {
    id: string;
}

class GetProductionUseCase {
    async execute({id}: IGetProductionRequest){

        const production = await client.production.findFirst({
            where:{id: id}
        });
        
        return production;
    }   
}

export { GetProductionUseCase };