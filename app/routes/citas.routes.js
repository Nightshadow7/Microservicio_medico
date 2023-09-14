import { Router } from "express";
import * as citasControllers from "./../controllers/citas.controllers.js";

const router = Router();

router.get(`/`, citasControllers.getAll );
//http://localhost:8000/api/citas/

router.get(`/siguiente/:next`, citasControllers.getNext)
//4. http://localhost:8000/api/citas/siguiente/

router.get(`/day` , citasControllers.getDay)
//6. http://localhost:8000/api/citas/day/

router.get(`/room` , citasControllers.getRoom)
//7. http://localhost:8000/api/citas/room/

router.get(`/count` , citasControllers.getCount)
//8. http://localhost:8000/api/citas/count/

export default router;