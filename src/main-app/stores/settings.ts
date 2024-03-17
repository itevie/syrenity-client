import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface Settings {
  accent: string;
  test: number;
}

const initialState: Settings = {
  accent: localStorage.getItem("accent-color") || "rgb(4, 228, 37)",
  test: 2
}

type SettingsPayload<T extends keyof Settings> = [T, Settings[T]];

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setKey: (state, action: PayloadAction<SettingsPayload<keyof Settings>>) => {
      return {
        ...state,
        [action.payload[0]]: action.payload[1],
      };
    }
  }
});

export const {setKey} = settingsSlice.actions;