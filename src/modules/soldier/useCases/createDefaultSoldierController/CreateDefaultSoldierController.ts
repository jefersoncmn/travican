import { GetResourceTypeByNameUseCase } from "../../../resourceType/useCases/getResourceType/GetResourceTypeByNameUseCase";
import { CreateSoldierUseCase } from "../createSoldier/CreateSoldierUseCase";

class CreateDefaultSoldierController {
    async handle(){
        
        try {
            const getResourceTypeByNameUseCase : GetResourceTypeByNameUseCase = new GetResourceTypeByNameUseCase();
            const food = await getResourceTypeByNameUseCase.execute({name: "Food"});
            const gold = await getResourceTypeByNameUseCase.execute({name: "Gold"});
            
            const defaultSoldiers = [
                {
                    name: "Guerreiro Simples", 
                    attack: 22.0, 
                    defense: 10.0, 
                    timeToSpawn: 20000, 
                    costToSpawnAmount: 100, 
                    costToSpawnResourceTypeId: food!.id,
                    budgetAmout: 40,
                    budgetResourceTypeId: gold!.id
                },
                {
                    name: "Guerreiro Armadurado", 
                    attack: 42.0, 
                    defense: 40.0, 
                    timeToSpawn: 50000, 
                    costToSpawnAmount: 300, 
                    costToSpawnResourceTypeId: food!.id,
                    budgetAmout: 100,
                    budgetResourceTypeId: gold!.id
                },
            ]
            const createSoldierUseCase : CreateSoldierUseCase = new CreateSoldierUseCase();

            for await (const defaultSoldier of defaultSoldiers) {
                const user = await createSoldierUseCase.execute({
                    name: defaultSoldier.name,
                    attack : defaultSoldier.attack,
                    defense : defaultSoldier.defense,
                    timeToSpawn : defaultSoldier.timeToSpawn,
                    costToSpawnAmount : defaultSoldier.costToSpawnAmount, 
                    costToSpawnResourceTypeId : defaultSoldier.costToSpawnResourceTypeId!, 
                    budgetAmout : defaultSoldier.budgetAmout, 
                    budgetResourceTypeId : defaultSoldier.budgetResourceTypeId!
                });
            }
            
        } catch (error) {
            console.log("Error to create Soldier - CreateDefaultSoldierController"+error);
        }
    }
}   

export { CreateDefaultSoldierController };