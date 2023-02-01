import { configureStore, createSlice, getDefaultMiddleware, current } from "@reduxjs/toolkit";

const selectedDay = createSlice({
    name: "selectedDay",
    initialState: new Date(),
    reducers: {
        setSelectedDay(state, day) {
            // console.log(state);
            state = day.payload;
            return state;
        }
    } 
})

const todoList = createSlice({
    name: "todoList",
    initialState: {},
    reducers: {
        setTodoList(state, list) {
            return list.payload;
        }
    }
})

export const { setSelectedDay } = selectedDay.actions;
export const { setTodoList } = todoList.actions;

export default configureStore({
    reducer: {
        selectedDay: selectedDay.reducer,
        todoList: todoList.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})