import { Router } from "express";
import * as medicosControllers from "./../controllers/medicos.controllers.js";

const router = Router();

router.get(`/`, medicosControllers.getAll );
//http://localhost:8000/api/medicos/

router.get(`/especifico/:specific` , medicosControllers.getMedicEspecific);
//3. http://localhost:8000/api/medicos/especifico/


export default router;