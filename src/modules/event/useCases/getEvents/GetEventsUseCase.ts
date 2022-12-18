import { connect } from "mongoose";
import { client } from "../../../../model/prisma/client";

class GetEventsUseCase {
    async execute(){
        const events = await client.event.findMany();
        return events;
    }   
}

export { GetEventsUseCase };