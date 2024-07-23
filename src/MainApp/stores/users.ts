import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from 'syrenity/build';

const initialState: { [key: number]: UserData } = {};

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserData>) => {
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        }
    }
});

export const { addUser } = userSlice.actions;