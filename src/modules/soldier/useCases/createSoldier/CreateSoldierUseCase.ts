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
            throw new Error("Soldeir already exists!");
        }

        const soldier = await client.soldier.create({
            data:{
                name: name,
                attack: attack,
                defense: defense,
                timeToSpawn: timeToSpawn,
                costToSpawn: {create:{
                    id_resourceType: costToSpawnResourceTypeId,
                    amount: costToSpawnAmount
                }},
                budget: {create:{
                    id_resourceType: budgetResourceTypeId,
                    amount: budgetAmout
                }},
            }
        });
    }   
}

export { CreateSoldierUseCase };