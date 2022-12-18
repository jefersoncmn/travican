import { client } from "../../../../model/prisma/client";

interface IGetResourceTypeRequest {
    id: string,
}

class GetResourceTypeUseCase {
    async execute({id}:IGetResourceTypeRequest){
        
        return await client.resourceType.findFirst({
            where:{
                id:id
            },
        });
        
    }   

    
}

export { GetResourceTypeUseCase };