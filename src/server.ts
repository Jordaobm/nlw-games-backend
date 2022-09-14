import { PrismaClient } from "@prisma/client";
import express, { Request, Response, Router } from "express";
import {
  convertHoursStringToMinutes,
  convertMinutesToHourString,
} from "./utils/convertHour";
import cors from "cors";
const app = express();

const prisma = new PrismaClient();

app.use(express.json());

app.use(cors());

const router = Router();

router.get("/games", async (request: Request, response: Response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.status(200).json(games);
});

router.get("/game/:id/ads", async (request: Request, response: Response) => {
  const gameId = request?.params?.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      game: true,
      weekDays: true,
      useVoiceChannel: true,
      yearPlaying: true,
      hourEnd: true,
      hourStart: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response.status(200).json(
    ads?.map((ad) => ({
      ...ad,
      weekDays: ad?.weekDays?.split(","),
      hourStart: convertMinutesToHourString(ad?.hourStart),
      hourEnd: convertMinutesToHourString(ad?.hourEnd),
    }))
  );
});

router.get("/ads/:id/discord", async (request: Request, response: Response) => {
  const adId = request?.params?.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return response.status(200).json(ad);
});

router.post("/games/:id/ad", async (request: Request, response: Response) => {
  const gameId = request.params?.id;
  const body = request?.body;

  const ad = await prisma.ad.create({
    data: {
      ...body,
      gameId,
      weekDays: body?.weekDays?.join(","),
      hourStart: convertHoursStringToMinutes(body?.hourStart),
      hourEnd: convertHoursStringToMinutes(body?.hourEnd),
    },
  });

  return response.status(201).json(ad);
});

app.use(router);

app.listen(3333, () => {
  console.log("Server is running 🚀");
});
