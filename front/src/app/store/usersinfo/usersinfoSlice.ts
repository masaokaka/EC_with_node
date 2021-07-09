import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { UserInfoType } from "../userinfo/userinfoSlice";

const initialState: UserInfoType[] = [];

export const usersinfoSlice = createSlice({
  name: "usersinfo",
  initialState,
  reducers: {
    setUsersInfo: (state, action: PayloadAction<UserInfoType[]>) => {
      return (state = action.payload);
    },
    unsetUsersInfo: (state) => {
      return (state = initialState);
    },
  },
});

export const { setUsersInfo, unsetUsersInfo } = usersinfoSlice.actions;
export const selectUsersInfo = (state: RootState) => state.usersinfo;

export default usersinfoSlice.reducer;
