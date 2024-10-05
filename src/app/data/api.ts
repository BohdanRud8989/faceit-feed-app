import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { FetchArgs } from "@reduxjs/toolkit/query/react";
import { Endpoints } from "../utils";
import { mockedPosts } from "./mocked";
import { PAGE_OFFSET } from "../utils";
import { app } from "../config";

/**
 * Mocks all app endpoints to fake data
 * @returns {void}
 */
export const mockApi = () => {
  const mock = new MockAdapter(axios, {
    delayResponse: app.mockedApiResponseDelay,
  });

  mock
    .onGet(Endpoints.POST)
    .reply(({ params: { id } }) => {
      const mockedPost = mockedPosts.find(
        ({ id: postId }) => postId === Number(id),
      );
      if (mockedPost === undefined) {
        return [500, undefined];
      }

      return [200, mockedPost];
    })
    .onGet(Endpoints.POSTS)
    .reply(({ params: { page } }) => {
      const pagePosts = mockedPosts.slice(
        (page - 1) * PAGE_OFFSET,
        page * PAGE_OFFSET,
      );

      return [200, pagePosts];
    });
};

/**
 * Handles RTK Query response(suppress an error once it caught)
 * @returns {AxiosResponse}
 */
export const responseHandler: NonNullable<
  FetchArgs["responseHandler"]
> = async (response) => {
  if (!response.ok) {
    const { status, url } = response;
    const message = `Request failed with status code ${status}: GET ${url}`;

    return new Error(message);
  }
  const body = await response.json();
  return body;
};

/**
 * Custom RTK Query baseQuery, which is a lightweight axios wrapper that
 * automatically handles request headers and response parsing
 * @param {string} baseUrl - Base API url(by default it's empty string, which means your current host will be used(http://localhost:3000))
 * @returns {BaseQueryFn}
 */
export const axiosBaseQuery =
  ({
    baseUrl = "",
  }: {
    baseUrl: string | undefined;
  }): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const response = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: response.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
