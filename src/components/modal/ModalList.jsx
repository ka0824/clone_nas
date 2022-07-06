import React, { useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { changeVisible, changeZindex } from "../../store/slice/ModalSlice";

const ModalList = () => {
  const modals = useSelector((state) => state.modal.modalList);
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(changeVisible(id));
    dispatch(changeZindex(id));
  };

  const renderIcons = useCallback(() => {
    return modals.map((el) => (
      <div key={`modal-${el.id}`} onClick={() => handleClick(el.id)}>
        {el.icon}
      </div>
    ));
  }, [modals]);

  return <Wrapper>{renderIcons()}</Wrapper>;
};

const Wrapper = styled.div`
  position: absolute;
  margin-left: 100px;
  display: flex;
  background: rgba(60, 70, 80, 0.9);
  margin-top: -2px;
  height: 39px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  svg {
    width: 39px;
    height: 39px;
    padding-left: 5px;
    padding-right: 5px;

    :hover {
      cursor: pointer;
      background: rgba(80, 80, 80, 1);
    }
  }
`;

export default ModalList;
