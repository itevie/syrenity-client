import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './Syrenity'

const initialState: {[key: number]: User} = {};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    } 
  }
});

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
})

export type RootUserState = ReturnType<typeof store.getState>;
export const {addUser} = userSlice.actions; 
export default store;