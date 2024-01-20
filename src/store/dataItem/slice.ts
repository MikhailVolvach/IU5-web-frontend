import { createSlice } from "@reduxjs/toolkit";
import { getItemPageData } from "./getItemPageData";
import { DataItemModel } from "store/models";
import { DataItemSerializer } from "store/serializers";

const dataItemSlice = createSlice({
    name: 'dataItem',
    initialState: {
        isLoaded: false,
        data: {} as DataItemModel
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
                state.data = DataItemSerializer(action.payload);
                state.isLoaded = true;
            })
            .addCase(getItemPageData.rejected, (state) => {
                state.isLoaded = true;
            })

    }
})

export const { setData } = dataItemSlice.actions;

const dataItemReducer = dataItemSlice.reducer;

export default dataItemReducer;