import { api } from "@/api";
import useSWRMutation from "swr/mutation";
import { BirdTrack } from "@rrrcn/common-types/strapi/models/BirdTrack";

export const birdTrackFetcher = ([key, id]: [
  string,
  string
]): Promise<BirdTrack> => {
  return api.birdTrack.getApiBirdTracksId(String(id), {}).then((it) => it.data);
};
export const useBirdTrackWithGeojson = (track: BirdTrack) => {
  return useSWRMutation([`bird_track`, String(track.id)], birdTrackFetcher);
};
