import { Request, Response } from "express";
import { CreateResourceTypeUseCase } from "../createResourceType/CreateResourceTypeUseCase";

class CreateDefaultResourceTypeController {
    async handle(){

        const defaultResourceTypes = [{name: "Gold"},{name: "Food"}];

        const createResourceTypeUseCase = new CreateResourceTypeUseCase();
        try {
            for await (const resourceType of defaultResourceTypes) {
                const user = await createResourceTypeUseCase.execute({
                    name: resourceType.name,
                });
            }
        } catch (error) {
            console.log("Error to create Default resource types");
        }
        

    }
}   

export { CreateDefaultResourceTypeController };