import React, { useCallback, useState, useEffect, useRef } from "react";
import { FcFolder } from "react-icons/fc";
import styled from "styled-components";
import DragIcon from "../drag/DragIcon";
import ContextMenu from "../menu/ContextMenu";
import { addShortcut } from "../../store/slice/shortcutSlice";
import { useDispatch } from "react-redux";

const MenuIcon = ({
  svg = <FcFolder />,
  title,
  id,
  type,
  setIsListOpen,
  searchRef,
}) => {
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [menuxPos, setMenuxPos] = useState(0);
  const [menuyPos, setMenuyPos] = useState(0);
  const [tooltipxPos, setTooltipxPos] = useState(0);
  const [tooltipyPos, setTooltipyPos] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const [currentxPos, setCurrentxPos] = useState(0);
  const [currentyPos, setCurrentyPos] = useState(0);

  const iconRef = useRef(null);
  const dispatch = useDispatch();

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
    if (searchRef.current.contains(e.target)) {
      return;
    }

    if (isContextOpen && !iconRef.current.contains(e.target)) {
      setIsContextOpen(false);
    } else if (!e.target.closest(".menu-icon")) {
      setIsContextOpen(false);
      setIsListOpen(false);
    }
  };

  const handleMouseOver = (e) => {
    setTooltipxPos(e.clientX);
    setTooltipyPos(e.pageY);
  };

  const handleDragStart = (e) => {
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);
    setIsDrag(true);
    setCurrentxPos(e.clientX);
    setCurrentyPos(e.clientY);
  };

  const handleDrag = (e) => {
    if (e.clientX === 0 && e.clientY === 0) {
      return;
    }

    setCurrentxPos(e.clientX);
    setCurrentyPos(e.clientY);
  };

  const handleDragEnd = (e) => {
    dispatch(addShortcut({ icon: svg, title: title }));
    setIsDrag(false);
  };

  return (
    <Wrapper
      onContextMenu={handleRightClick}
      ref={iconRef}
      onMouseOver={handleMouseOver}
      className="menu-icon"
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      draggable
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
          svg={svg}
          title={title}
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

export default MenuIcon;
