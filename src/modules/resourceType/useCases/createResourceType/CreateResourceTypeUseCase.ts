import { ResourceType } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { client } from "../../../../model/prisma/client";

interface ICreateResourceTypeRequest {
    name: string;
}

class CreateResourceTypeUseCase {
    async execute({name}: ICreateResourceTypeRequest): Promise<ResourceType>{
        
        //Verifica se já tem esse tipo de recurso
        const resourseTypeAlreadyExists = await client.resourceType.findFirst({
            where:{
                name: name
            }
        });

        if(resourseTypeAlreadyExists){
            throw new AppError("Resource Type already exists");
        }

        //Cria o ResourceType
        const resourceType = await client.resourceType.create({
            data:{
                name: name,
            }
        });

        return resourceType;
    }   

    
}

export { CreateResourceTypeUseCase };