import { connect } from "mongoose";
import { create } from "node-firebird";
import { client } from "../../../../model/prisma/client";

interface ICreateSoldierRequest {
    name : string,
    attack : number,
    defense : number,
    timeToSpawn : number,
    costToSpawnAmount : number, 
    costToSpawnResourceTypeId : string, 
    budgetAmout : number, 
    budgetResourceTypeId : string
}

class CreateSoldierUseCase {
    async execute({name, attack, defense, timeToSpawn, costToSpawnAmount, costToSpawnResourceTypeId, budgetAmout, budgetResourceTypeId}: ICreateSoldierRequest){

        //Verificar se usuário já tem uma Land
        const soldierAlreadyExists = await client.soldier.findFirst({
            where:{
                name: name
            }
        });

        if(soldierAlreadyExists){
            throw new Error("Soldier already exists!");
        }

        const newSoldier = await client.soldier.create({
            data:{
                name: name,
                attack: attack,
                defense: defense,
                timeToSpawn: timeToSpawn,
                costToSpawn: {create:{
                    resourceType: { connect: { id: costToSpawnResourceTypeId }},
                    amount: costToSpawnAmount,
                    // land: {},
                }},
                budget: {create:{
                    resourceType: { connect: { id: budgetResourceTypeId }},
                    amount: budgetAmout,
                    // land: [],
                }},
            }
        });
        

        //TODO finish this!
    }   
}

export { CreateSoldierUseCase };