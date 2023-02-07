import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTodoList } from "../store/store";
import styled from "styled-components";

export const ListContainer = styled.div`
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

export const List = styled.div`
    // TODO : Modal을 구현하는데 전체적으로 필요한 CSS를 구현합니다.
    display: flex;
    flex-direction: column;
    margin: 5px;
    text-align: left;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    > hr {
        margin-top: 3px;
        width: 100%;
    }
`;

export const Title = styled.div`
    font-weight: bold;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    i {
        font-size: 10pt;
        padding: 0px;
        margin-left: 5px;
    }
`;

export const ContentContainer = styled.div`
    font-size: 9pt;
`;

export const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Schedules = () => {
    const todoList = useSelector((state) => state.todoList);
    const selectedDay = useSelector((state) => state.selectedDay);
    const formatDate = `${selectedDay.getFullYear()}-${
        selectedDay.getMonth() + 1
    }-${selectedDay.getDate()}`;

    const dispatch = useDispatch();
    
    useEffect(() => {
        fetch(`http://localhost:3001/todolist`, {
            method: "GET",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dispatch(setTodoList(data));
            });
    }, [todoList]);

    const onDeleteHandler = (id) => {
        fetch(`http://localhost:3001/todolist/${id}`, {
            method: "DELETE",
        });
    };
    // console.log("스케쥴")
    // console.log(todoList)

    return (
        <>
            <ListContainer>
                {todoList
                    .filter((el) => el.date === formatDate)
                    .map((list) => {
                        return (
                            <List key={list.id}>
                                <TitleContainer>
                                    <Title>{list.title}</Title>
                                    <IconContainer>
                                        <i className="fa-solid fa-gear"></i>
                                        <i
                                            className="fa-solid fa-trash-can"
                                            onClick={() =>
                                                onDeleteHandler(list.id)
                                            }
                                        ></i>
                                    </IconContainer>
                                </TitleContainer>
                                <hr />
                                <ContentContainer>
                                    {list.content}
                                </ContentContainer>
                            </List>
                        );
                    })}
            </ListContainer>
        </>
    );
};

export default Schedules;
