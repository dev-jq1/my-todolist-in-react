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

const isPending = createSlice({
    name: "isPending",
    initialState: true,
    reducers: {
        setIsPending(state, data) {
            return data.payload;
        }
    }
})

export const { setSelectedDay } = selectedDay.actions;
export const { setTodoList } = todoList.actions;
export const { setIsPending } = isPending.actions;

export default configureStore({
    reducer: {
        selectedDay: selectedDay.reducer,
        todoList: todoList.reducer,
        isPending: isPending.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})