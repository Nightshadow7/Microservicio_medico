import { Router } from "express";
import * as usuariosControllers from "./../controllers/usuarios.controllers.js";

const router = Router();

router.get(`/`, usuariosControllers.getAll );
//http://localhost:8000/api/usuarios/

router.get(`/alfabeticamente` , usuariosControllers.getAlphabetic );
//1. http://localhost:8000/api/usuarios/alfabeticamente

router.get(`/siguiente/:next` , usuariosControllers.getAlphabetic );
//4. http://localhost:8000/api/usuarios/siguiente/


export default router;