import { createSlice } from "@reduxjs/toolkit";
import { DataItem } from "api";
import { getItemPageData } from "./getItemPageData";

const dataItemSlice = createSlice({
    name: 'dataItem',
    initialState: {
        isLoaded: false,
        data: {} as DataItem
    },
    reducers: {
        setIsLoaded(state, action) {
            return { ...state, isLoaded: true };
        },
        setData(state, action) {
            return { ...state, data: action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getItemPageData.fulfilled, (state, action) => {
                state.isLoaded = false;
                state.data = action.payload;
                state.isLoaded = true;
            })
            .addCase(getItemPageData.rejected, (state, action) => {
                console.log(state, action.payload);
            })
    }
})

export const { setData } = dataItemSlice.actions;

const dataItemReducer = dataItemSlice.reducer;

export default dataItemReducer;