import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExtractedUserData } from "syrenity-api-client";
import Logger from '../../Logger';

const logger = new Logger("store");
const initialState: {[key: number]: ExtractedUserData} = {};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<ExtractedUserData>) => {
      logger.log(`Added user ${action.payload.id} to the store`);
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    } 
  }
});

export const {addUser} = userSlice.actions; 