export const app = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  emulateLiveData: process.env.NEXT_PUBLIC_EMULATE_LIVE_DATA === "true",
  liveDataInterval: Number(process.env.NEXT_PUBLIC_LIVE_DATA_INTERVAL),
};
