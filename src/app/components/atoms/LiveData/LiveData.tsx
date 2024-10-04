"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearInterval, setInterval } from "timers";
import { addNewPostAction } from "../../../data";

type LiveDataProps = {
  updateInterval?: number;
};

/**
 * Component that emulates live data updates
 * @param {number} updateInterval - updateInterval
 * @returns {JSX.Element}
 */
const LiveData = ({ updateInterval = 5000 }: LiveDataProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      // @ts-expect-error TRK somehow cannot distinguish action type
      dispatch(addNewPostAction());
    }, updateInterval);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, updateInterval]);

  return null;
};

export default LiveData;
