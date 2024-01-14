import counterReducer from "@/app/Redux/features/counter/counterSlice";
import { AuthorizeManagerApiSlice } from "@/services/Authorization/Store/RolePermissionApiSlice";
import { UserManagerApiSlice } from "@/services/UserManager/Store/UserManagerApiSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UserManagerSlice } from "@/services/UserManager/Store/UserManagerSlice";

export const reduxStore = configureStore({
  reducer: {
    counterReducer,
    [UserManagerApiSlice.reducerPath]: UserManagerApiSlice.reducer,
    [UserManagerSlice.name]: UserManagerSlice.reducer,
    [AuthorizeManagerApiSlice.reducerPath]: AuthorizeManagerApiSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([UserManagerApiSlice.middleware]),
});

setupListeners(reduxStore.dispatch);

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
