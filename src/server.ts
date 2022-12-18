import express, { NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "express-async-errors";
import { Request, request, Response, response } from "express";

const app = express();

import { router } from "./routes/userRoutes";
import { AppError } from './errors/AppError';
import { CreateDefaultResourceTypeController } from './modules/resourceType/useCases/createDefaultResourceType/CreateDefaultResourceType';
import { CreateDefaultSoldierController } from './modules/soldier/useCases/createDefaultSoldierController/CreateDefaultSoldierController';
import { CreateDefaultProductionController } from './modules/production/useCases/createDefaultProduction/CreateDefaultProductionController';
import { CreateDefaultWorldController } from './modules/world/useCases/createDefaultWorld/CreateDefaultWorldController';
import { EventsController } from './managers/events/EventsController';

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const eventsController = EventsController.getInstance();

//Rotas
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
})

app.listen(3000, async()=>{
    //ResourceTypes
    const createDefaultResourceTypeController : CreateDefaultResourceTypeController = new CreateDefaultResourceTypeController();
    await createDefaultResourceTypeController.handle();
    //Soldiers
    const createDefaultSoldierControler : CreateDefaultSoldierController = new CreateDefaultSoldierController();
    await createDefaultSoldierControler.handle();
    //Productions
    const createDefaultProductionController : CreateDefaultProductionController = new CreateDefaultProductionController();
    await createDefaultProductionController.handle();
    // //World
    const createDefaultWorldController : CreateDefaultWorldController = new CreateDefaultWorldController();
    await createDefaultWorldController.handle();
    // //Events
    // await eventsController.getEventsToDataBase();
    await eventsController.eventQueue();
    console.log("Servidor rodando e pronto para o uso! :D");
});