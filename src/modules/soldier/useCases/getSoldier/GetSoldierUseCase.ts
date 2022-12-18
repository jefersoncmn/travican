import e from "express";
import { connect } from "mongoose";
import { create } from "node-firebird";
import { client } from "../../../../model/prisma/client";

interface IGetSoldierRequest {
    id: string
}

class GetSoldierUseCase {
    async execute({ id }:IGetSoldierRequest){
        return await client.soldier.findFirst({
            where:{
                id: id,
            }
        });
    }   
}

export { GetSoldierUseCase };