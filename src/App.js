import "./App.css";
import Topbar from "./Topbar";
import Calendar from "./components/Calendar";
import styled from "styled-components";
import Modal from "./components/Modal";
import Schedules from "./components/Schedules";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodoList } from "./store/store";

//터미널에서 data 폴더로 이동(cd data) 후 json-server --watch data.json --port 3001 실행해야 json-server 동작.

function App() {
  const [isPending, setIsPending] = useState(true);
  
  const dispatch = useDispatch();
  const selectedDay = useSelector(state => state.selectedDay);
  useEffect(() => {
    fetch(`http://localhost:3001/todolist`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setIsPending(false);
        dispatch(setTodoList(data));
      });
  }, [selectedDay]);

  return (
    <div className="App">
      <Topbar />
      <div className="content-container">
        <div className="content-header"><span>WEEKILIST</span></div>
        <div className="content-main">
          <Calendar></Calendar>
          <Modal />
          {/* {selectedDay.payload} */}
          { isPending || <Schedules />}
          
        </div>
      </div>
    </div>
  );
}

export default App;
