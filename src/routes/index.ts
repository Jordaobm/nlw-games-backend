import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";
import { CreateAdController } from "../controllers/CreateAdController";
import { FindGameController } from "../controllers/FindGameController";
import { ListGameController } from "../controllers/ListGamesController";

export const router = Router();

const listGameController = new ListGameController();
const createAdController = new CreateAdController();
const findGameController = new FindGameController();

router.get("/games", listGameController.handle);
router.post("/games/:id/ad", createAdController.handle);
router.post("/games/:id/ad", createAdController.handle);
router.get("/game/:id", findGameController.handle);
// DOCUMENTAÇÃO DA API
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
