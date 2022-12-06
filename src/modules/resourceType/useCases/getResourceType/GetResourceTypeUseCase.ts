import { client } from "../../../../model/prisma/client";

interface IGetResourceTypeRequest {
    id?: string,
    name?: string,
}

class GetResourceTypeUseCase {
    async execute({id, name}:IGetResourceTypeRequest){
        
        if(!name){
            return await client.resourceType.findFirst({
                where:{
                    id:id
                }
            });
        }
        if(!id){
            return await client.resourceType.findFirst({
                where:{
                    name: name
                }
            });
        }
        
    }   

    
}

export { GetResourceTypeUseCase };