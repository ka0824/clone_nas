import React, { useCallback, useState, useEffect, useRef, memo } from "react";
import { FcFolder } from "react-icons/fc";
import styled from "styled-components";
import ContextMenu from "../menu/ContextMenu";
import DragIcon from "../drag/DragIcon";
import { useSelector, useDispatch } from "react-redux";
import { addModal } from "../../store/slice/ModalSlice";
import uuid from "react-uuid";
import ModalTemplate from "./../modal/ModalTemplate";

const Icon = ({ svg = <FcFolder />, title, id, type }) => {
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [menuxPos, setMenuxPos] = useState(0);
  const [menuyPos, setMenuyPos] = useState(0);
  const [tooltipxPos, setTooltipxPos] = useState(0);
  const [tooltipyPos, setTooltipyPos] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const [currentxPos, setCurrentxPos] = useState(0);
  const [currentyPos, setCurrentyPos] = useState(0);
  const modalCnt = useSelector((state) => state.modal.modalCnt);
  const dispatch = useDispatch();

  const iconRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleRightClick = useCallback((e) => {
    e.preventDefault();
    setIsContextOpen(true);
    setMenuxPos(e.clientX);
    setMenuyPos(e.pageY); // 이건 맞음
  }, []);

  const handleOutsideClick = (e) => {
    if (isContextOpen && !iconRef.current.contains(e.target)) {
      setIsContextOpen(false);
    }
  };

  const handleMouseOver = (e) => {
    setTooltipxPos(e.clientX);
    setTooltipyPos(e.pageY);
  };

  const handleDragStart = (e) => {
    e.stopPropagation();
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);
    setIsDrag(true);
    setCurrentxPos(e.clientX);
    setCurrentyPos(e.clientY);
  };

  const handleDrag = (e) => {
    e.stopPropagation();
    setCurrentxPos(e.clientX);
    setCurrentyPos(e.clientY);
  };

  const handleDragEnd = (e) => {
    e.stopPropagation();
    setIsDrag(false);
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

  const handleDragEnter = (e) => {};

  return (
    <Wrapper
      data-id={`${id}`}
      onContextMenu={handleRightClick}
      ref={iconRef}
      onMouseOver={handleMouseOver}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      className="wallpaper-icon"
      draggable
      onClick={handleClick}
      onDragEnter={() => console.log(title)}
    >
      <Tooltip xPos={tooltipxPos} yPos={tooltipyPos}>
        {title}
      </Tooltip>
      {isDrag && (
        <DragIcon
          xPos={currentxPos}
          yPos={currentyPos}
          svg={svg}
          title={title}
        ></DragIcon>
      )}
      {isContextOpen ? (
        <ContextMenu
          xPos={menuxPos}
          yPos={menuyPos}
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

  top: ${({ yPos }) => {
    return `${yPos}px`;
  }};
  left: ${({ xPos }) => {
    return `${xPos}px`;
  }};
`;

export default Icon;
