import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExtractedUserData, User, UserData } from "syrenity-api-client";
import Logger from '../../Logger';
import client from '../Client';

const logger = new Logger("store");
const initialState: {[key: number]: ExtractedUserData} = {};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<ExtractedUserData>) => {
      let data = action.payload;
      logger.log(`Added user ${action.payload.id} to the store`);

      client.cacheManager.users.set(data.id, {
        is_bot: data.isBot,
        created_at: data.createdAt,
        ...data,
      })

      return {
        ...state,
        [action.payload.id]: action.payload
      };
    } 
  }
});

export const {addUser} = userSlice.actions; 