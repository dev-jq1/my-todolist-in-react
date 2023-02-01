import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTodoList } from "../store/store";
import styled from "styled-components";

export const List = styled.div`
  // TODO : Modal을 구현하는데 전체적으로 필요한 CSS를 구현합니다.
  display: flex;
  flex-direction: column;
  margin: 5px 0 5px 0;
  /* border: 1px solid black; */
  /* justify-content: center; */
  /* align-items: center; */
  height: 100%;
  width: 90%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Schedules = () => {
  const todoList = useSelector(state => state.todoList);
  const selectedDay = useSelector(state => state.selectedDay);
  const formatDate = `${selectedDay.getFullYear()}-${selectedDay.getMonth()+1}-${selectedDay.getDate()}`;

  // console.log("스케쥴")
  // console.log(todoList)
  const dispatch = useDispatch();



  return (
    <>
      {
        todoList.filter(el=> el.date === formatDate).map(list => {
        return  (
            <List key={list.id}>
              <div>TITLE: {list.title}</div>
              <div>CONTENT : {list.content}</div>
            </List>
          )
        })
      }
    </>
  )
}

export default Schedules;