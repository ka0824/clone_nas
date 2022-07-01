import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { removeShortcut } from "../../store/slice/shortcutSlice";

const ContextMenu = ({ xPos, yPos, id, isOpen }) => {
  const dispatch = useDispatch();

  const handleRemove = useCallback(() => {
    dispatch(removeShortcut(id));
    isOpen(false);
  }, []);

  return (
    <Wrapper xPos={xPos} yPos={yPos}>
      <Item>새 창에서 열기</Item>
      <Item onClick={handleRemove}>바로가기 제거</Item>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;

  top: ${({ yPos }) => {
    return `${yPos}px`;
  }};
  left: ${({ xPos }) => {
    return `${xPos}px`;
  }};

  background: #fff;
  z-index: 15000;
  border-radius: 4px;
  border: 1px solid rgba(198, 212, 224, 0.7);
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 16%);
  padding: 7px;
  list-style: none;
  outline: none;
`;

const Item = styled.li`
  line-height: 28px;
  height: 28px;
  color: #414b55;
  font-size: 0.8rem;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;

  :hover {
    background: #def6fb;
  }
`;

export default ContextMenu;
