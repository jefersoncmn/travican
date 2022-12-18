import { client } from "../../../../model/prisma/client";

interface IGetResourceTypeRequest {
    name: string,
}

class GetResourceTypeByNameUseCase {
    async execute({name}:IGetResourceTypeRequest){
        return await client.resourceType.findFirst({
            where:{
                name:name
            },
        });
        
    }   
}

export { GetResourceTypeByNameUseCase };