import { Request, request, Response, response } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateEventController } from "../modules/event/useCases/createEvent/CreateEventController";
import { GetEventQueueController } from "../modules/event/useCases/getEventQueue/GetEventQueueController";
import { GetEventsController } from "../modules/event/useCases/getEvents/GetEventsController";
import { GetLandsPositionsController } from "../modules/land/useCases/getLandsPositions/GetLandsPositionsController";
import { GetAllProductionsController } from "../modules/production/useCases/getAllPoductions/GetAllProductionsController";
import { CreateResourceTypeController } from "../modules/resourceType/useCases/createResourceType/CreateResourceTypeController";
import { GetResourceTypeController } from "../modules/resourceType/useCases/getResourceType/GetResourceTypeController";
import { CreateSoldierController } from "../modules/soldier/useCases/createSoldier/CreateSoldierController";
import { GetAllSoldiersController } from "../modules/soldier/useCases/getAllSoldiers/GetAllSoldiersController";
import { GetSoldierControler } from "../modules/soldier/useCases/getSoldier/GetSoldierController";
import { AuthenticateUserController } from "../modules/user/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";
import { GetUserController } from "../modules/user/useCases/getUser/GetUserController";
import { GetUserArmyController } from "../modules/user/useCases/getUserArmy/GetUserArmyController";
import { GetUsersToRankController } from "../modules/user/useCases/getUsersToRank/GetUsersToRankController";
import { RefreshTokenUserController } from "../modules/user/useCases/refreshTokenUser/RefreshTokenUserController";
import { RemoveSoldierController } from "../modules/user/useCases/removeSoldier/RemoveSoldierController";

var express = require('express');
var router = express.Router();


//Register
const createUserController = new CreateUserController();
router.post('/register', createUserController.handle);

//Login
const authenticateUserController = new AuthenticateUserController();
router.post('/login', authenticateUserController.handle);

//RefreshToken
const refreshTokenUserController = new RefreshTokenUserController();
router.post('/refresh-token', refreshTokenUserController.handle);

//Test
router.get('/dados', ensureAuthenticated, (request: Request, response: Response)=>{
    return response.json([
        {id: 1, name: "NodeJS"}
    ]);
});

//User
const getUserController : GetUserController = new GetUserController();
router.get('/user:id', ensureAuthenticated, getUserController.handle);

//User Remove soldier
const removeSoldierController : RemoveSoldierController = new RemoveSoldierController();
router.post('/removeSoldier', removeSoldierController.handle);

//User get army
const getUserArmyController : GetUserArmyController = new GetUserArmyController();
router.get('/army:idUser',getUserArmyController.handle); 

//Lands positions
const getLandsPositionsController : GetLandsPositionsController = new GetLandsPositionsController();
router.get('/landsPositions', getLandsPositionsController.handle);

//Ranking
const getUsersToRankController : GetUsersToRankController = new GetUsersToRankController();
router.get('/rank', getUsersToRankController.handle);

//Production
const getAllProductionsController : GetAllProductionsController = new GetAllProductionsController();
router.get('/productions', getAllProductionsController.handle);

//Resource Type
const getResourceTypeController : GetResourceTypeController = new GetResourceTypeController();
router.get('/resourceType',getResourceTypeController.handle);

const createResourceTypeController : CreateResourceTypeController = new CreateResourceTypeController();
router.post('/resourceType', createResourceTypeController.handle);

//Soldier
const createSoldierController : CreateSoldierController = new CreateSoldierController();
router.post('/soldier', createSoldierController.handle);

const getAllSoldiersController : GetAllSoldiersController = new GetAllSoldiersController();
router.get('/soldiers', getAllSoldiersController.handle);

const getSoldierController : GetSoldierControler = new GetSoldierControler();
router.get('/soldier:id', getSoldierController.handle);

//Event
const createEventController : CreateEventController = new CreateEventController();
router.post('/event', createEventController.handle);

const getEventQueueController : GetEventQueueController = new GetEventQueueController();
router.get('/eventQueue', getEventQueueController.handle);

const getEventsController : GetEventsController = new GetEventsController();
router.get('/event', getEventsController.handle);

export { router };