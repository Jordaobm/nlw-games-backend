import { Game } from "@prisma/client";
import { prisma } from "../server";

export class ListGameService {
  async execute(): Promise<Game[]> {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });

    return games;
  }
}
