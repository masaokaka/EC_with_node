import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface UserInfoType {
  uid?: string;
  name?: string;
  email?: string;
  tel?: string;
  username?: string;
  zipcode?: string;
  address?: string;
}

const initialState: UserInfoType = {};

export const userinfoSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoType>) => {
      return (state = action.payload);
    },
    unsetUserInfo: (state) => {
      return (state = initialState);
    },
  },
});

export const { setUserInfo, unsetUserInfo } = userinfoSlice.actions;
export const selectUserInfo = (state: RootState) => state.userinfo;

export default userinfoSlice.reducer;
