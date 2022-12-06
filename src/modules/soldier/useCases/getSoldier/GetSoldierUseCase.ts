import e from "express";
import { connect } from "mongoose";
import { create } from "node-firebird";
import { client } from "../../../../model/prisma/client";

interface IGetSoldierRequest {
    id: string
}

class GetSoldierUseCase {
    async execute({ id }:IGetSoldierRequest){

        if(id){
            const soldier = await client.soldier.findFirst({
                where:{
                    id: id
                }
            });
            return soldier;
        } else {
            const soldier = await client.soldier.findMany();
            return soldier;
        }
    }   
}

export { GetSoldierUseCase };