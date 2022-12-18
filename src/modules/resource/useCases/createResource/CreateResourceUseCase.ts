import { client } from "../../../../model/prisma/client";

interface ICreateResourceRequest {
    amount: number;
    resourceTypeId: string;
}

class CreateResourceUseCase {
    async execute({amount, resourceTypeId}: ICreateResourceRequest){

        const newResource = await client.resource.create({
            data:{
                resourceType: { connect: { id: resourceTypeId }},
                amount: amount,
            }
        });
        
        return newResource;
    }   
}

export { CreateResourceUseCase };