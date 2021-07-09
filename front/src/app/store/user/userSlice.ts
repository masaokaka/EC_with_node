import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface UserState {
  uid: string | null;
  name: string | null;
}

const initialState: UserState = { uid: null, name: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return (state = action.payload);
    },
    unsetUser: (state) => {
      return (state = initialState);
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
