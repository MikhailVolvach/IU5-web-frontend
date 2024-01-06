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
            return { ...state, isLoaded: action.payload };
        },
        setData(state, action) {
            return { ...state, data: action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getItemPageData.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(getItemPageData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoaded = true;
            })
            .addCase(getItemPageData.rejected, (state, action) => {
                console.log(state, action.payload);
                state.isLoaded = true;
            })

    }
})

export const { setData } = dataItemSlice.actions;

const dataItemReducer = dataItemSlice.reducer;

export default dataItemReducer;