import { Request, Response } from "express";
import { ListGameService } from "../services/ListGamesService";

export class ListGameController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listGameService = new ListGameService();
      const games = await listGameService.execute();
      return response.status(200).json(games);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}
