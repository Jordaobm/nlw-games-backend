import { Game } from "@prisma/client";
import { prisma } from "../server";
import { convertMinutesToHourString } from "../utils/convertHour";

interface AdResponse {
  id: string;
  name: string;
  discord: string;
  gameId: string;
  yearsPlaying: number;
  weekDays: number[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
  createdAt: string;
}

interface GameResponse {
  id: string;
  title: string;
  bannerUrl: string;
  ads: AdResponse[];
}

export class FindGameService {
  async execute(gameId: string): Promise<Game> {
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        ads: true,
      },
    });

    const formattedGame: GameResponse = {
      ...game,
      ads: game?.ads?.map((ad) => {
        return {
          ...ad,
          weekDays: ad?.weekDays?.split(",")?.map(Number),
          hourStart: convertMinutesToHourString(ad?.hourStart),
          hourEnd: convertMinutesToHourString(ad?.hourEnd),
          createdAt: ad?.createdAt?.toISOString(),
        };
      }),
    };

    return formattedGame;
  }
}
