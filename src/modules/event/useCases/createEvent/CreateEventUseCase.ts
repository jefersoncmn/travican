import { connect } from "mongoose";
import { client } from "../../../../model/prisma/client";
import { EventsController } from "../../../../managers/events/EventsController";
import { Event } from "../../../../model/event";

interface ICreateEventRequest {
    id_user: string;
    operation: string;
    time: number;
    id_production: string;
    id_soldier: string;
    id_war: string;
}

class CreateEventUseCase {
    async execute({id_user, operation, time, id_production, id_soldier, id_war}: ICreateEventRequest){

        let completeTime : Date = new Date();
        completeTime.setSeconds(completeTime.getSeconds()+time);

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

        const eventsController = EventsController.getInstance();
        const _newEvent : Event = new Event({id: newEvent.id, time: newEvent.time, completeTime: newEvent.completeTime, id_production: newEvent.id_production!, id_soldier: newEvent.id_soldier!, id_user: newEvent.id_user, id_war: newEvent.id_war!, operation: newEvent.operation});
        eventsController.addEvent(_newEvent);

        return newEvent;
        
    }   
}

export { CreateEventUseCase };