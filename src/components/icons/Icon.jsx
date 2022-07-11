import React, { useCallback, useState, useEffect, useRef, memo } from "react";
import { FcFolder } from "react-icons/fc";
import styled from "styled-components";
import ContextMenu from "../menu/ContextMenu";
import DragIcon from "../drag/DragIcon";
import { useSelector, useDispatch } from "react-redux";
import { addModal } from "../../store/slice/ModalSlice";
import uuid from "react-uuid";
import ModalTemplate from "./../modal/ModalTemplate";
import { changeOrder } from "../../store/slice/shortcutSlice";
import {
  selectDragFrom,
  selectDragTo,
} from "../../store/slice/dragSelectSlice";

const Icon = ({ svg = <FcFolder />, title, id, type }) => {
  const [isContextOpen, setIsContextOpen] = useState(false);
  const menuxPos = useRef(0);
  const menuyPos = useRef(0);
  // const [tooltipxPos, setTooltipxPos] = useState(0);
  // const [tooltipyPos, setTooltipyPos] = useState(0);

  const tooltipxPos = useRef(0);
  const tooltipyPos = useRef(0);

  const [isDrag, setIsDrag] = useState(false);

  const currentxPos = useRef(0);
  const currentyPos = useRef(0);

  const modalCnt = useSelector((state) => state.modal.modalCnt);
  const dragFrom = useSelector((state) => state.dragSelect.dragFrom);
  const dragTo = useSelector((state) => state.dragSelect.dragTo);
  const [isTooltip, setIsTooltip] = useState(false);
  const dispatch = useDispatch();

  const iconRef = useRef(null);

  useEffect(() => {
    if (isDrag) {
      const dragIcon = document.querySelector(".drag-icon");

      dragIcon.style.top = `${currentyPos.current + 5}px`;
      dragIcon.style.left = `${currentxPos.current + 5}px`;
    }
  }, [isDrag]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleRightClick = useCallback((e) => {
    e.preventDefault();
    setIsContextOpen(true);
    // setMenuxPos(e.clientX);
    menuxPos.current = e.clientX;
    menuyPos.current = e.pageY; // 이건 맞음
  }, []);

  const handleOutsideClick = (e) => {
    if (isContextOpen && !iconRef.current.contains(e.target)) {
      setIsContextOpen(false);
    }
  };

  const handleMouseOver = (e) => {
    tooltipxPos.current = e.clientX;
    tooltipyPos.current = e.clientY;

    if (isTooltip) {
      const tooltip = document.querySelector(`.tooltip`);

      tooltip.style.top = `${tooltipyPos.current + 5}px`;
      tooltip.style.left = `${tooltipxPos.current + 5}px`;
    }
  };

  useEffect(() => {
    if (isTooltip) {
      console.log("유즈 이펙트");
      const tooltip = document.querySelector(`.tooltip`);

      tooltip.style.top = `${tooltipyPos.current + 5}px`;
      tooltip.style.left = `${tooltipxPos.current + 5}px`;
    }
  }, [isTooltip]);

  const handleDragStart = (e) => {
    e.stopPropagation();
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);
    setIsDrag(true);
    // setCurrentxPos(e.clientX);
    // setCurrentyPos(e.clientY);

    currentxPos.current = e.clientX;
    currentyPos.current = e.clientY;

    // dragIconRef.current?.style.top = currentyPos;
    // dragIconRef.current?.style.left = currentxPos;

    dispatch(selectDragFrom(e.currentTarget.dataset.id));
  };

  const handleDrag = (e) => {
    e.stopPropagation();

    currentxPos.current = e.clientX;
    currentyPos.current = e.clientY;

    const dragIcon = document.querySelector(".drag-icon");

    dragIcon.style.top = `${currentyPos.current + 5}px`;
    dragIcon.style.left = `${currentxPos.current + 5}px`;
  };

  const handleDragEnd = (e) => {
    e.stopPropagation();

    setIsDrag(false);
    if (dragTo !== -1) {
      dispatch(changeOrder({ dragFrom, dragTo }));
    }
  };

  const handleClick = (e) => {
    const id = uuid();

    dispatch(
      addModal({
        id: id,
        component: (
          <ModalTemplate
            id={id}
            icon={svg}
            title={title}
            modalCnt={modalCnt}
          ></ModalTemplate>
        ),
        icon: svg,
      })
    );
  };

  const handleDragOver = (e) => {
    if (e.currentTarget.dataset.id !== dragFrom) {
      dispatch(selectDragTo(e.currentTarget.dataset.id));
    }
  };

  const handleMouseEnter = (e) => {
    console.log("enter");
    setIsTooltip(true);
  };

  const handleMouseLeave = (e) => {
    console.log("leave");
    setIsTooltip(false);
  };

  return (
    <Wrapper
      data-id={`${id}`}
      onContextMenu={handleRightClick}
      ref={iconRef}
      onMouseOver={handleMouseOver}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="wallpaper-icon"
      draggable
      onClick={handleClick}
    >
      {isTooltip && <Tooltip className={`tooltip`}>{title}</Tooltip>}

      {isDrag && <DragIcon svg={svg} title={title} isDrag={isDrag}></DragIcon>}

      {isContextOpen ? (
        <ContextMenu
          xPos={menuxPos.current}
          yPos={menuyPos.current}
          id={id}
          isOpen={setIsContextOpen}
          type={type}
        ></ContextMenu>
      ) : null}
      {svg}
      <Title>{title}</Title>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100px;
  height: 120px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;

  svg {
    width: 70px;
    height: 70px;
    filter: drop-shadow(1px 1px 1px black);
  }

  :hover {
    cursor: pointer;

    div {
      visibility: visible;
    }
  }
`;

const Title = styled.div`
  color: white;
  font-size: 0.8rem;
  text-shadow: 0.8px 0.8px 0.8px black;
`;

const Tooltip = styled.div`
  position: absolute;
  z-index: 100;
  visibility: hidden;
  background: darkgrey;

  border: 1px solid #eee;
  color: #eee;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  /* 
  top: ${({ yPos }) => {
    return `${yPos}px`;
  }};
  left: ${({ xPos }) => {
    return `${xPos}px`;
  }}; */
`;

export default Icon;
