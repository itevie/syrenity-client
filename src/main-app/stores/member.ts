import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExtractedMemberData } from "syrenity-api-client";
import Logger from '../../Logger';

const logger = new Logger("store");
const initialState: {[key: string]: ExtractedMemberData} = {};

export const memberSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addMember: (state, action: PayloadAction<ExtractedMemberData>) => {
      logger.log(`Added user ${action.payload.userId} for guild ${action.payload.guildId} to the store`);
      return {
        ...state,
        [`${action.payload.guildId}:${action.payload.userId}`]: action.payload
      };
    } 
  }
});

export const {addMember} = memberSlice.actions; 