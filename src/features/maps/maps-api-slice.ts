import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MapConfig, Maps, Layers } from "../../types/types";

export const mapsApiSlice = createApi({
  reducerPath: "mapsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/api/v1",
  }),
  endpoints(builder) {
    return {
      fetchMapConfig: builder.query<MapConfig, string | void>({
        query(map = "map_1") {
          return `/mapconfig/${map}`;
        },
      }),
      fetchMaps: builder.query<Maps, void>({
        query() {
          return `/mapconfig/list`;
        },
      }),
      fetchLayers: builder.query<Layers, void>({
        query() {
          return `/config/layers`;
        },
      }),
    };
  },
});

export const {
  useFetchMapsQuery,
  useFetchMapConfigQuery,
  useFetchLayersQuery,
} = mapsApiSlice;
