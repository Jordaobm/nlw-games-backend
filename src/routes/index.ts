import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";
import { CreateAdController } from "../controllers/CreateAdController";
import { ListGameController } from "../controllers/ListGameController";

export const router = Router();

const listGameController = new ListGameController();
const createAdController = new CreateAdController();

router.get("/games", listGameController.handle);
router.post("/games/:id/ad", createAdController.handle);
// DOCUMENTAÇÃO DA API
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
