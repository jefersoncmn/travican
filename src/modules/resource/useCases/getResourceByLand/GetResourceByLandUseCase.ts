import { client } from "../../../../model/prisma/client";

interface IGetResourceByLandRequest {
    idLand: string;
    resourceTypeName: string;
}

class GetResourceByLandUseCase {
    async execute({idLand, resourceTypeName}: IGetResourceByLandRequest){
        const resourceType = await client.resourceType.findFirst({
            where:{name: resourceTypeName}
        });
        const resource = await client.resource.findFirst({
            where:{
                id_land: idLand,
                id_resourceType: resourceType!.id 
            }
        });
        
        return resource;
    }   
}

export { GetResourceByLandUseCase };