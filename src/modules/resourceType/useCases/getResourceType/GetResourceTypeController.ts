import { Request, Response } from "express";
import { GetResourceTypeUseCase } from "./GetResourceTypeUseCase";

class GetResourceTypeController {
    async handle(request: Request, response: Response){
        const {id, name} = request.body;

        const getResourceTypeUseCase : GetResourceTypeUseCase = new GetResourceTypeUseCase(); 
        //TO DO arrumar tudo 
        try {
            const resourceTypes = await getResourceTypeUseCase.execute({
                id: id,
                name: name
            });
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