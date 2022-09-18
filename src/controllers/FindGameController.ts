import { Request, Response } from "express";
import { FindGameService } from "../services/FindGameService";

export class FindGameController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const gameId = request?.params?.id;

      const findGameService = new FindGameService();

      const game = await findGameService.execute(gameId);

      return response.status(200).json(game);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
