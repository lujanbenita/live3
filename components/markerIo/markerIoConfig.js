import markerSDK from "@marker.io/browser";

const MARKER_ID = process.env.NEXT_PUBLIC_MARKER_IO_ID;

const MarkerIoConfig = () => {
  if (MARKER_ID === undefined || MARKER_ID === "") return <></>;

  const markerIo = async () => {
    await markerSDK.loadWidget({
      destination: MARKER_ID,
    });
  };

  markerIo();

  return <></>;
};

export default MarkerIoConfig;
