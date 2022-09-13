import express, { Request, Response, Router } from "express";

const app = express();

app.use(express.json());

const router = Router();

router.get("/", (request: Request, response: Response) => {
  return response.status(200).json({ sim: "sim" });
});

app.use(router);

app.listen(3333, () => {
  console.log("Server is running 🚀");
});
