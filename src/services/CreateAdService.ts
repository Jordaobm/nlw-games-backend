import { prisma } from "../server";
import { convertHoursStringToMinutes } from "../utils/convertHour";

export interface RequestAD {
  weekDays: number[];
  hourStart: string;
  hourEnd: string;
  id: string;
  name: string;
  discord: string;
  gameId: string;
  yearsPlaying: number;
  useVoiceChannel: boolean;
  createdAt: Date;
}

export class CreateAdService {
  async execute(ad: RequestAD): Promise<void> {
    await prisma.ad.create({
      data: {
        ...ad,
        weekDays: ad?.weekDays?.join(","),
        hourStart: convertHoursStringToMinutes(ad?.hourStart),
        hourEnd: convertHoursStringToMinutes(ad?.hourEnd),
      },
    });
  }
}
