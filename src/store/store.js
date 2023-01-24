import { configureStore, createSlice, getDefaultMiddleware } from "@reduxjs/toolkit";

const selectedDay = createSlice({
    name: "selectedDay",
    initialState: new Date(),
    reducers: {
        setSelectedDay(state, day) {
            state = day.payload;
            return state;
        }
    } 
})
export const { setSelectedDay } = selectedDay.actions;

export default configureStore({
    reducer: {
        selectedDay: selectedDay.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})