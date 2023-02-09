import "../App.css";
import Topbar from "../Topbar";
import Calendar from "../components/Calendar";
import Modal from "../components/Modal";
import Todos from "../components/Todos";
import { useDispatch, useSelector } from "react-redux";
import { setIsPending } from "../store/store";
import { useEffect } from "react";

function Home() {
    return (
        <>
            <Topbar />
            <div className="content-container">
                <div className="content-header">
                    <span>WEEKILIST</span>
                </div>
                <div className="content-main">
                    <Calendar></Calendar>
                    <Modal />
                    <Todos/>
                    {/* {isPending || <Todos />} */}
                </div>
            </div>
        </>
    );
}
export default Home;
