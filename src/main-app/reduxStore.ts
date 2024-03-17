import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { userSlice } from './stores/users';
import { settingsSlice } from './stores/settings';
import { memberSlice } from './stores/member';


const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    settings: settingsSlice.reducer,
    members: memberSlice.reducer,
  },
});

export type RootUserState = ReturnType<typeof store.getState>;
export default store;
export const useAppSelector: TypedUseSelectorHook<RootUserState> = useSelector