import React, { useEffect, useState } from "react";
import { format, addMonths, subMonths, subWeeks, addWeeks } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, getWeekOfMonth, getMonth } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import './Calendar.css'
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDay } from "../store/store";

const RenderHeader = ({ currentDate, prevWeek, nextWeek }) => {
    const weeks = { 1: "첫째", 2: "둘째", 3: "셋째", 4: "넷째", 5: "다섯째", 6: "여섯째" }
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">{format(currentDate, "yyyy")}년</span>
                <span className="text month">
                    {` ${format(currentDate, "M")}월 `}
                </span>
                <span className="text">{`${weeks[getWeekOfMonth(currentDate)]} 주`}</span>
            </div>
            <div className="col col-end">
                <i className="fa-solid fa-arrow-left" onClick={prevWeek}></i>
                <i className="fa-solid fa-arrow-right" onClick={nextWeek}></i>
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ["일", "월", "화", "수", "목", "금", "토"];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className={`col day ${i === 0 ? "sunday" : i === 6 ? "saturday" : ""}`} key={i}>
                {date[i]}
            </div>
        );
    }

    return <div className="days row">{days}</div>;
};

const RenderCells = ({ currentDate, selectedDate, onDateClick }) => {
    const now = new Date();
    const startWeek = startOfWeek(currentDate);
    const endWeek = endOfWeek(currentDate);

    const rows = [];
    let days = [];
    let day = startWeek;
    let formattedDate = "";

    while (day <= endWeek) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, "d");
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${!isSameMonth(day,now) ? "other" : ""} ${isSameDay(cloneDay, selectedDate) ? "selected" : ""} ${isSameDay(day, now) ? "today" : ""}`}
                    key={day}
                    data-day={day}
                    onClick={(e) => {
                        onDateClick(cloneDay);
                    }}
                >
                    {formattedDate}
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    // const [selectedDate, setSelectedDate] = useState(new Date());
    
    const selectedDay = useSelector(state => state.selectedDay);
    const dispatch = useDispatch();
    
    useEffect(() => {
        // setSelectedDate(new Date());
    }, [])
    
    const prevWeek = () => {
        setCurrentDate(subWeeks(currentDate, 1));
    };
    const nextWeek = () => {
        setCurrentDate(addWeeks(currentDate, 1));
    };
    const onDateClick = (day) => {
        dispatch(setSelectedDay(day))
    };
    return (
        <div className="calendar">
            <RenderHeader
                currentDate={currentDate}
                prevWeek={prevWeek}
                nextWeek={nextWeek}
            />
            <RenderDays />
            <RenderCells
                currentDate={currentDate}
                selectedDate={selectedDay}
                onDateClick={onDateClick}
            />
        </div>
    );
};

export default Calendar;
