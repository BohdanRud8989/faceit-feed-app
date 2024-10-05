import { createApi } from "@reduxjs/toolkit/query/react";
import { Post, GetPostsQueryArgs, GetPostQueryArgs } from "../../types";
import { Endpoints } from "../../utils";
import { app } from "../../config";
import { axiosBaseQuery, responseHandler } from "../api";

// Main feed API where all endpoints are used. All data is stored and managed by cache.
const feedApi = createApi({
  reducerPath: "feedApi",
  baseQuery: axiosBaseQuery({
    baseUrl: app.apiUrl,
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPost: builder.query<Post, GetPostQueryArgs>({
      query: ({ id }) => ({
        url: Endpoints.POST,
        params: {
          id,
        },
        responseHandler,
      }),
      providesTags: ["Post"],
      serializeQueryArgs: ({ queryArgs: { id } }) => ({ id }),
    }),

    getPosts: builder.query<Post[], GetPostsQueryArgs>({
      query: (params) => ({
        url: Endpoints.POSTS,
        params,
        responseHandler,
      }),
      serializeQueryArgs: () => ({}),
    }),
    getMorePosts: builder.mutation<Post[], GetPostsQueryArgs>({
      query: (params) => ({
        url: Endpoints.POSTS,
        params: params,
        responseHandler,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            feedApi.util.updateQueryData(
              "getPosts",
              {} as GetPostsQueryArgs,
              (cachedData) => {
                cachedData.push(...data);
                return cachedData;
              },
            ),
          );
        } catch (err) {
          if (err instanceof Error) {
            console.warn("Error in getMorePosts query: ", err);
          }
        }
      },
    }),
  }),
});

export const { useGetPostQuery, useGetPostsQuery, useGetMorePostsMutation } =
  feedApi;

export default feedApi;
