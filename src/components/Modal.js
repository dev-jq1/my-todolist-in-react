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

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog',
}))`
  // TODO : Modal창 CSS를 구현합니다.
  background-color: white;
  width: 90%;
  height: 60%;
  border-radius: 20px;
  display: flex;
  /* justify-content: center;
  align-items: center; */
  flex-direction: column;
  >div>button {
    background-color: transparent;
    border: none;
    color: black;
    font-size: 1.2rem;
  }
  `;

const Modal = () => {
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
              {selectedDay.toLocaleString("ko-kr")}
              <div className='form-container'>
                <label>TITLE</label>
                <input type='text' value={title} onChange={onTitleChangeHandler}/>
                <label>CONTENT</label>
              </div>
              <div className='button-container'>
                <button onClick={openModalHandler}>취소</button>
                <button>확인</button>
              </div>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );

}

export default Modal;