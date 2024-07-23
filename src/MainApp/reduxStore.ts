import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { userSlice } from './stores/users';

const store = configureStore({
    reducer: {
        users: userSlice.reducer
    }
});

export type RootUserState = ReturnType<typeof store.getState>;
export default store;
export const useAppSelector: TypedUseSelectorHook<RootUserState> = useSelector