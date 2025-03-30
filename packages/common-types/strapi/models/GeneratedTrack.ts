import { BirdTrack } from "./BirdTrack";
export type GeneratedTrack = {
  id: number;
  tracks: object | null;
  areas: object | null;
  bird_tracks: BirdTrack[] | null;
  count: number | null;
  area_size: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  publishedAt: string | null;
  createdBy: any | null;
  updatedBy: any | null;
};
