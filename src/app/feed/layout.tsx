"use client";

import { Provider } from "react-redux";
import { store, mockApi } from "../data";
import { LiveData } from "../components";
import { app } from "../config";

// turns on mocked API
mockApi();

const FeedLayout = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    {app.emulateLiveData && <LiveData updateInterval={app.liveDataInterval} />}
    {children}
  </Provider>
);

export default FeedLayout;
