import { client } from "../../../../model/prisma/client";

interface IGetResourceRequest {
    id: string;
}

class GetResourceUseCase {
    async execute({id}: IGetResourceRequest){

        const resource = await client.resource.findFirst({
            where:{id: id}
        });
        
        return resource;
    }   
}

export { GetResourceUseCase };