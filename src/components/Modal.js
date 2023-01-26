import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";


export const ModalContainer = styled.div`
  // TODO : Modal을 구현하는데 전체적으로 필요한 CSS를 구현합니다.
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const ModalBackdrop = styled.div`
  // TODO : Modal이 떴을 때의 배경을 깔아주는 CSS를 구현합니다.
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom:0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

`;

export const ModalBtn = styled.button`
  width: 90%;
  margin-top: 10px;
  border: none;
  background-color: black;
  color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: grab;
`;


export const ModalView = styled.div`
  // TODO : Modal창 CSS를 구현합니다.
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 80%;
  height: auto;
  border-radius: 20px;
  justify-content: space-between;
  >div.form-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 20px 0 20px;
    >input {
      border: solid 1px darkgrey;
    }
    >textarea {
      resize: none;
      height: 160px;
      overflow: hidden;
      border: solid 1px darkgrey;
    }
    >label {
      text-align: left;
      padding-top: 10px;
    }
  }
  >span.current-date {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px;
    font-size: 20px;
    font-weight: bold;
    background-color: darkslategray;
    color: white;
  }
  >div.button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    >button {
      background-color: darkslategray;
      border: none;
      color: white;
      font-size: 20px;
      font-weight: bold;
      height: 66px;
      width: 49.9%;
      /* margin-top: 20px; */
      &.btn-cancel {
        border-bottom-left-radius: 20px;
        /* margin-right: 0.5px; */
      }
      &.btn-confirm {
        border-bottom-right-radius: 20px;
        /* margin-left: 0.5px; */
      }
    }
  }
  
  `;

const Modal = () => {
  const date = ["일", "월", "화", "수", "목", "금", "토"]; 
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const selectedDay = useSelector(state => state.selectedDay);


  const openModalHandler = () => {
    // TODO : isOpen의 상태를 변경하는 메소드를 구현합니다.
    setIsOpen(!isOpen)

  };

  const onTitleChangeHandler = (e) => {
    setTitle(e.target.value);
  }

  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}><i className="fa-solid fa-plus"></i></ModalBtn>
        {/* TODO : 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현해야 합니다. */}
        {isOpen? (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={(event) => { event.stopPropagation() } }>
              <span className='current-date'>
                {`${selectedDay.getFullYear()}년 ${selectedDay.getMonth()+1}월 ${selectedDay.getDate()}일 ${date[selectedDay.getDay()]}요일`}
              </span>
              <div className='form-container'>
                <label>TITLE</label>
                <input type='text' value={title} onChange={onTitleChangeHandler}/>
                <label>CONTENT</label>
                <textarea></textarea>
              </div>
              <div className='button-container'>
                <button className='btn-cancel' onClick={openModalHandler}>취소</button>
                <button className='btn-confirm'>확인</button>
              </div>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );

}

export default Modal;