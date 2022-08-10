import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counter-slice";
import { apiSlice } from "../features/dogs/dogs-api-slice";
import { mapsApiSlice } from "../features/maps/maps-api-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [mapsApiSlice.reducerPath]: mapsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      mapsApiSlice.middleware,
    ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
