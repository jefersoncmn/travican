import { client } from "../../../../model/prisma/client";

class GetAllResourceTypeUseCase {
    async execute(){
        const resourceType = await client.resourceType.findMany();
        return resourceType;
    }   
}

export { GetAllResourceTypeUseCase };