import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setIsPending } from "../store/store";
import Todo from "./Todo";

export const TodoContainer = styled.div`
    width: 90%;
    height: 55vh;
    overflow: auto;
    margin: 5px 0 10px 0;
    padding: 0 0 20px 0;

    ::-webkit-scrollbar {
        width: 4px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: black;
        border-radius: 10px;
        background-clip: padding-box;
        border: 1px solid transparent;
    }
    ::-webkit-scrollbar-track {
        background-color: grey;
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px white;
    }
`;

function Todos() {
    const todos = useSelector((state) => state.todoList);
    const selectedDay = useSelector((state) => state.selectedDay);
    const isPending = useSelector((state) => state.isPending);

    const dispatch = useDispatch();
    const formatDate = `${selectedDay.getFullYear()}-${
        selectedDay.getMonth() + 1
    }-${selectedDay.getDate()}`;

    useEffect(()=>{
        dispatch(setIsPending(true));
    },[])

    return (
        <TodoContainer>
            {isPending || todos.filter((el) => el.date === formatDate).map(todo => {
                return (
                    <Todo key={todo.id} todo={todo}></Todo>
                    )
                })}
        </TodoContainer>
    );
}

export default Todos;