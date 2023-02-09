import "./App.css";
import Topbar from "./Topbar";
import Calendar from "./components/Calendar";
import Modal from "./components/Modal";
import Schedules from "./components/Todo";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsPending, setTodoList } from "./store/store";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import axios from "axios";

//터미널에서 data 폴더로 이동(cd data) 후 json-server --watch data.json --port 3001 실행해야 json-server 동작.

function App() {
  const dispatch = useDispatch();
  const selectedDay = useSelector(state => state.selectedDay);

  useEffect(() => {
    axios.get(`http://localhost:3001/todolist`)
    .then(res => {
        dispatch(setIsPending(false));
        dispatch(setTodoList(res.data));
    })
  }, [selectedDay]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
