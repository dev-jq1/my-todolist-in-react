import "./App.css";
import Topbar from "./Topbar";
import Calendar from "./components/Calendar";
import Modal from "./components/Modal";
import Schedules from "./components/Schedules";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodoList } from "./store/store";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

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
        setIsPending(false);
        dispatch(setTodoList(data));
      });
  }, [selectedDay]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home isPending={isPending}/>}/>
      </Routes>
    </div>
  );
}

export default App;
