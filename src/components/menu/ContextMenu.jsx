import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  addShortcut,
  removeMultiShortcut,
  removeShortcut,
} from "../../store/slice/shortcutSlice";

const ContextMenu = ({ xPos, yPos, id, isOpen, type, svg, title }) => {
  const dispatch = useDispatch();
  const dragSelect = useSelector((state) => state.dragSelect.multi);

  const handleRemove = useCallback(() => {
    if (dragSelect.length !== 0) {
      dispatch(removeMultiShortcut(dragSelect));
    } else {
      dispatch(removeShortcut(id));
    }

    isOpen(false);
  }, []);

  const openNewWindow = useCallback(() => {
    isOpen(false);
  }, []);

  const handleAddShortcut = useCallback(() => {
    dispatch(addShortcut({ icon: svg, title: title }));
    isOpen(false);
  }, []);

  const renderItem = useCallback(() => {
    switch (type) {
      case "wallpaper":
        return (
          <>
            <Item onClick={openNewWindow}>새 창에서 열기</Item>
            <Item onClick={handleRemove}>바로가기 제거</Item>
          </>
        );
        break;

      case "menu":
        return (
          <>
            <Item onClick={openNewWindow}>새 창에서 열기</Item>
            <Item onClick={handleAddShortcut}>바탕화면에 추가</Item>
          </>
        );
        break;

      default:
        return null;
        break;
    }
  }, []);

  return (
    <Wrapper xPos={xPos} yPos={yPos}>
      {renderItem()}
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
