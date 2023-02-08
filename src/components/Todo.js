import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTodoList } from "../store/store";
import styled from "styled-components";


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
    .modifying {
        display: none !important;
    }
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
        width: 15px;
    }
`;

export const ContentContainer = styled.div`
    font-size: 9pt;
    white-space: pre;
`;

export const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const InputTitle = styled.input`
    display: none;
`
export const TextareaContent = styled.textarea`
    resize: none;
    display: none;
    overflow: auto;
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
`

export const ModifyButtonContainer = styled.div`
    margin-top: 5px;
    text-align: right;
    button {
        background-color: black;
        color: white;
        margin-left: 1px;
        margin-right: 1px;
        border: none;
        border-radius: 5pt;
    }
`

const Todo = ({ todo }) => {
    // const [isPending, setIsPending] = useState(true);
    const titleEl = useRef(null);
    const inputEl = useRef(null);
    const contentEl = useRef(null);
    const textareaEl = useRef(null);

    const [isModifyClicked, setIsModifyClicked] = useState(false);
    const [modifiedTitle, setModifiedTitle] = useState(todo.title);
    const [modifiedContent, setModifiedContent] = useState(todo.content);

    // const dayList = todoList.filter((list) => list.date === formatDate);
    // console.log(dayList);

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
    }, []);

    const onDeleteHandler = (id) => {
        fetch(`http://localhost:3001/todolist/${id}`, {
            method: "DELETE",
        }).then(() => {
            fetch(`http://localhost:3001/todolist`, {
                method: "GET",
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    dispatch(setTodoList(data));
                    // setIsPending(false);
                });
        });
    };

    const onModifyHandler = (e) => {
        // e.target.parentElement.parentElement.style.visibility = 'hidden'
        setIsModifyClicked(true);
        titleEl.current.style.display = "none";
        contentEl.current.style.display = "none";
        inputEl.current.style.display = "block"
        textareaEl.current.style.display = "block"
        textareaEl.current.rows = todo.content.match(/\n/g).length+1;
    };

    const onChangeModifyTitle = (e) => {
        setModifiedTitle(e.target.value);
    }
    const onChangeModifyContent = (e) => {
        setModifiedContent(e.target.value);
    }

    const onModifyCancelHandler = () => {
        setIsModifyClicked(false);
        titleEl.current.style.display = "flex";
        contentEl.current.style.display = "block";
        inputEl.current.style.display = "none"
        textareaEl.current.style.display = "none"
    }

    const onModifyConfirmHandler = (id) => {
        const modifiedData = {
            title: modifiedTitle,
            content: modifiedContent,
        };
        fetch(`http://localhost:3001/todolist/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(modifiedData),
        }).then(() => {
            fetch(`http://localhost:3001/todolist`, {
                method: "GET",
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    dispatch(setTodoList(data));
                    // setIsPending(false);
                });
            onModifyCancelHandler();
        });
    }

    return (
        <List>
            {/* {!isModifyClicked ?  */}
            <TitleContainer ref={titleEl}>
                {/* <Title className={`${isModifyClicked ? "modifying" : "not-modifing"}`}>{list.title}</Title> */}
                <Title>{todo.title}</Title>
                <IconContainer>
                    <i
                        className="fa-solid fa-gear"
                        onClick={(e) => onModifyHandler(e)}
                    ></i>
                    <i
                        className="fa-solid fa-trash-can"
                        onClick={() => onDeleteHandler(todo.id)}
                    ></i>
                </IconContainer>
            </TitleContainer>
            <InputTitle ref={inputEl} value={modifiedTitle} onChange={onChangeModifyTitle}></InputTitle>
            {/* :<div></div> */}
            {/* } */}
            <hr />
            <ContentContainer ref={contentEl}>{todo.content}</ContentContainer>
            <TextareaContent ref={textareaEl} onChange={onChangeModifyContent} value={modifiedContent}></TextareaContent>
            {isModifyClicked ? 
                <ModifyButtonContainer>
                    <button onClick={onModifyCancelHandler}>취소</button>
                    <button onClick={() => {onModifyConfirmHandler(todo.id)}}>확인</button>
                </ModifyButtonContainer>
            : null}
        </List>
    );
};

export default Todo;
