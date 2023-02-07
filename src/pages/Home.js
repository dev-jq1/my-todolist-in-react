import "../App.css";
import Topbar from "../Topbar";
import Calendar from "../components/Calendar";
import Modal from "../components/Modal";
import Schedules from "../components/Schedules";

function Home({isPending}) {
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
                    {isPending || <Schedules />}
                </div>
            </div>
        </>
    );
}
export default Home;
