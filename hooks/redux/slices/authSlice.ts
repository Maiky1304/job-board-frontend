import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
    token: string | null;
    loading: boolean;
}

const initialState: AuthState = {
    token: null,
    loading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string | null>) {
            if (state.loading) {
                state.loading = false;
            }
            state.token = action.payload;
        },
    },
});

export const { setToken } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
export const selectTokenLoading = (state: RootState) => state.auth.loading;

export default authSlice.reducer;
