import { Request, request, Response, response } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateResourceTypeController } from "../modules/resourceType/useCases/createResourceType/CreateResourceTypeController";
import { GetResourceTypeController } from "../modules/resourceType/useCases/getResourceType/GetResourceTypeController";
import { CreateSoldierController } from "../modules/soldier/useCases/createSoldier/CreateSoldierController";
import { GetSoldierControler } from "../modules/soldier/useCases/getSoldier/GetSoldierController";
import { AuthenticateUserController } from "../modules/user/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "../modules/user/useCases/refreshTokenUser/RefreshTokenUserController";

var express = require('express');
var router = express.Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post('/users', createUserController.handle);
router.post('/login', authenticateUserController.handle);
router.post('/refresh-token', refreshTokenUserController.handle);
router.get('/dados', ensureAuthenticated, (request: Request, response: Response)=>{
    return response.json([
        {id: 1, name: "NodeJS"}
    ]);
});


//Resource Type

const getResourceTypeController : GetResourceTypeController = new GetResourceTypeController();
router.get('/resourceType',getResourceTypeController.handle);

const createResourceTypeController : CreateResourceTypeController = new CreateResourceTypeController();
router.post('/resourceType', createResourceTypeController.handle);

//Soldier

const getSoldierController : GetSoldierControler = new GetSoldierControler();
router.get('/soldier:id', getSoldierController.handle);

const createSoldierController : CreateSoldierController = new CreateSoldierController();
router.post('/soldier', createSoldierController.handle);

export { router };