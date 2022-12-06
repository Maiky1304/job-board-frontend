import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../services/types";
import { RootState } from "../store";

export interface UserState {
  data: User | null;
}

const initialState: UserState = {
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.data = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.data;

export default userSlice.reducer;
