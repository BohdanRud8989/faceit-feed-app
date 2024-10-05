export const app = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  mockedApiResponseDelay: Number(
    process.env.NEXT_PUBLIC_MOCKED_API_RESPONSE_DELAY,
  ),
  emulateLiveData: process.env.NEXT_PUBLIC_EMULATE_LIVE_DATA === "true",
  liveDataInterval: Number(process.env.NEXT_PUBLIC_LIVE_DATA_INTERVAL),
};
