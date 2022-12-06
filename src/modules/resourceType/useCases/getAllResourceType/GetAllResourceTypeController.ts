import { Request, Response } from "express";
import { GetAllResourceTypeUseCase } from "./GetAllResourceTypeUseCase";

class GetResourceTypeController {
    async handle(request: Request, response: Response){

        const getResourceTypeUseCase : GetAllResourceTypeUseCase = new GetAllResourceTypeUseCase(); 
        try {
            const resourceTypes = await getResourceTypeUseCase.execute();
            return response.json(resourceTypes);        
        } catch (error) {
            return response.json({
                status: "Error to create ResourceType",
                message: error
            });
        }
    }
}
export { GetResourceTypeController };