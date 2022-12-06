import { connect } from "mongoose";
import { create } from "node-firebird";
import { client } from "../../../../model/prisma/client";

interface ICreateSProductionRequest {
    name : string,
    level : number,
    costToUpgradeAmount : number,
    costToUpgradeResourceTypeId : string,
    returnedResourceAmount : number,
    returnedResourceResourceTypeId : string,
    timeToUpgrade : number,
    timeToHarvest : number,
}

class CreateProductionUseCase {
    async execute({name, level, costToUpgradeAmount, costToUpgradeResourceTypeId, returnedResourceAmount, returnedResourceResourceTypeId, timeToUpgrade, timeToHarvest}: ICreateSProductionRequest){

        const productuinAlreadyExists = await client.production.findFirst({
            where:{
                name: name,
                level: level
            }
        });

        if(productuinAlreadyExists){
            throw new Error("Production already exists!");
        }

        const newProduction = await client.production.create({
            data:{
                name: name,
                level: level,
                timeToHarvest: timeToHarvest,
                timeToUpgrade: timeToUpgrade,
                returnedResource: { create: {
                    id_resourceType: returnedResourceResourceTypeId,
                    amount: returnedResourceAmount,
                }},
                costToUpgrade: { create: {
                    id_resourceType: costToUpgradeResourceTypeId,
                    amount: costToUpgradeAmount
                }}
            }
        });

        return newProduction;
    }   
}

export { CreateProductionUseCase };