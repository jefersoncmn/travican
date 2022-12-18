import { connect } from "mongoose";
import { client } from "../../../../model/prisma/client";

interface IRemoveEventRequest {
    id: string;
}

class RemoveEventUseCase {
    async execute({id}: IRemoveEventRequest){

        const removedEvent = await client.event.delete({
            where: {id: id}
        });

        return removedEvent;
    }   
}

export { RemoveEventUseCase };