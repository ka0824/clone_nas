import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Icon from "../../components/icons/Icon";
import { useSelector, useDispatch } from "react-redux";
import {
  removeSelect,
  addSelect,
  resetSelect,
} from "../../store/slice/dragSelectSlice";
import DragIcons from "./../../components/drag/DragIcons";

const Wallpaper = () => {
  const shortcutList = useSelector((state) => state.shortcut);
  const dragSelect = useSelector((state) => state.dragSelect);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [isDragIcons, setIsDragIcons] = useState(false);
  const [xPos, setxPos] = useState(0);
  const [yPos, setyPos] = useState(0);
  const [currentxPos, setCurrentxPos] = useState(0);
  const [currentyPos, setCurrentyPos] = useState(0);
  const wallpaperRef = useRef(null);
  const selectBoxRef = useRef(null);
  const dispatch = useDispatch();

  const renderIcons = useCallback(() => {
    return shortcutList.map((el) => {
      return (
        <Icon
          svg={el.icon}
          title={el.title}
          id={el.id}
          type="wallpaper"
          key={`menu-icon-${el.id}`}
        ></Icon>
      );
    });
  }, [shortcutList]);

  const handleDragStart = (e) => {
    if (dragSelect.length !== 0) {
      const img = new Image();
      e.dataTransfer.setDragImage(img, 0, 0);
      return setIsDragIcons(true);
    }

    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);
    setxPos(e.clientX);
    setyPos(e.pageY);
    setCurrentxPos(e.clientX);
    setCurrentyPos(e.pageY);
    setIsSelectBoxOpen(true);
  };

  const handleDrag = (e) => {
    if (e.clientX <= wallpaperRef.current.getBoundingClientRect().left) {
    } else if (
      e.clientX >= wallpaperRef.current.getBoundingClientRect().width
    ) {
      setCurrentxPos(wallpaperRef.current.getBoundingClientRect().width);
    } else {
      setCurrentxPos(e.clientX);
    }

    if (e.clientY <= wallpaperRef.current.getBoundingClientRect().top) {
    } else if (
      e.clientY >= wallpaperRef.current.getBoundingClientRect().height
    ) {
      setCurrentyPos(wallpaperRef.current.getBoundingClientRect().height);
    } else {
      setCurrentyPos(e.clientY);
    }
  };

  useEffect(() => {
    if (!isSelectBoxOpen) {
      return;
    }

    let icons = document.querySelectorAll(".wallpaper-icon");
    icons = [...icons];

    icons.map((el) => {
      if (
        selectBoxRef.current.getBoundingClientRect().top <=
          el.getBoundingClientRect().top + el.getBoundingClientRect().height &&
        selectBoxRef.current.getBoundingClientRect().left <=
          el.getBoundingClientRect().left + el.getBoundingClientRect().height &&
        selectBoxRef.current.getBoundingClientRect().left +
          selectBoxRef.current.getBoundingClientRect().width >=
          el.getBoundingClientRect().left
      ) {
        dispatch(addSelect(el.dataset.id));
        return el.setAttribute("style", "background: rgba(211, 211, 211, 0.5)");
      } else {
        dispatch(removeSelect(el.dataset.id));
        return el.setAttribute("style", "background: none");
      }
    });
  }, [xPos, currentxPos, yPos, currentyPos]);

  const handleDragEnd = () => {
    setIsSelectBoxOpen(false);
    setIsDragIcons(false);
  };

  const handleClick = (e) => {
    let icons = document.querySelectorAll(".wallpaper-icon");
    icons = [...icons];
    icons.map((el) => el.setAttribute("style", "background: none"));
    dispatch(resetSelect());
  };

  return (
    <Wrapper
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      draggable
      ref={wallpaperRef}
      onClick={handleClick}
    >
      {isDragIcons && (
        <DragIcons xPos={currentxPos} yPos={currentyPos}></DragIcons>
      )}
      {isSelectBoxOpen && (
        <SelectBox
          xPos={xPos}
          yPos={yPos}
          currentxPos={currentxPos}
          currentyPos={currentyPos}
          ref={selectBoxRef}
        ></SelectBox>
      )}
      {renderIcons()}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 95%;
  height: 90%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;

  ${({ theme }) => theme.mountEvent};
`;

const SelectBox = styled.div`
  background: #888;
  position: absolute;
  z-index: 999;
  background: rgba(211, 211, 211, 0.3);

  border: 1px white solid;

  top: ${({ yPos, currentyPos }) => {
    if (yPos <= currentyPos) {
      return `${yPos}px`;
    } else if (yPos > currentyPos) {
      return `${currentyPos}px`;
    }
  }};
  left: ${({ xPos, currentxPos }) => {
    if (xPos <= currentxPos) {
      return `${xPos}px`;
    } else if (xPos > currentxPos) {
      return `${currentxPos}px`;
    }
  }};

  width: ${({ xPos, currentxPos }) => {
    return `${Math.abs(xPos - currentxPos)}px`;
  }};

  height: ${({ yPos, currentyPos }) => {
    return `${Math.abs(yPos - currentyPos)}px`;
  }};
`;

export default Wallpaper;
