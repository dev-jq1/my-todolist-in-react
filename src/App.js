import "./App.css";
import Topbar from "./Topbar";
import Calendar from "./components/Calendar";
import styled from "styled-components"
import Modal from "./components/Modal";
import Schedules from "./components/Schedules";




function App() {
    return (
        <div className="App">
            <Topbar />
            <div className="content-container">
                <div className="content-header">WEEKILIST</div>
                <div className="content-main">
                    <Calendar></Calendar>
                    <Modal/>
                    {/* {selectedDay.payload} */}
                    <Schedules/>
                </div>
            </div>
        </div>
    );
}

export default App;
