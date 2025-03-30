import { useBirdsTracks } from "@/components/map/tracks/components/Page/swr";
import { MapBirdTrackItem } from "@/components/map/tracks/components/Item";
import { CircularProgress } from "@mui/material";

export const BirdsTracksPage = ({ index }: { index: number }) => {
  const { data, isLoading } = useBirdsTracks(index);
  console.log({ data });
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        data?.results?.map((it) => <MapBirdTrackItem track={it} />)
      )}
    </>
  );
};
