import { connect } from "mongoose";
import { client } from "../../../../model/prisma/client";

interface ICreateEventRequest {
    id_user: string;
    operation: string;
    time: number;
    completeTime: Date;
    id_production: string;
    id_soldier: string;
    id_war: string;
}

class CreateEventUseCase {
    async execute({id_user, operation, time, completeTime, id_production, id_soldier, id_war}: ICreateEventRequest){

        const newEvent = await client.event.create({
            data:{
                id_user: id_user,
                completeTime: completeTime,
                operation: operation,
                time: time,
                id_production: id_production,
                id_soldier: id_soldier,
                id_war: id_war,
            }
        });
        
    }   
}

export { CreateEventUseCase };