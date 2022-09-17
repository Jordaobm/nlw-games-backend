import { Request, Response } from "express";
import { CreateAdService, RequestAD } from "../services/CreateAdService";

export class CreateAdController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const gameId = request.params?.id;
      const body = request?.body;

      const createAdService = new CreateAdService();

      const ad = {
        name: body?.name,
        discord: body?.discord,
        yearsPlaying: body?.yearsPlaying,
        weekDays: body?.weekDays,
        hourStart: body?.hourStart,
        hourEnd: body?.hourEnd,
        useVoiceChannel: body?.useVoiceChannel,
        gameId,
      } as RequestAD;

      await createAdService.execute(ad);

      return response.status(201).json(ad);
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Não foi possível criar o anúncio" });
    }
  }
}
