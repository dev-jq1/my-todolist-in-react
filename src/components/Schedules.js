import { useSelector } from "react-redux";

const Schedules = () => {
  const todoList = useSelector(state => state.todoList);
  const selectedDay = useSelector(state => state.selectedDay);
  console.log(todoList)
  return (
    <div>
      {todoList[selectedDay]}
    </div>
  )
}

export default Schedules;