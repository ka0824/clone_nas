import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { FaShapes } from "react-icons/fa";
import MenuList from "./MenuList";
import ModalList from "./../modal/ModalList";

const TotalMenu = () => {
  const [isListOpen, setIsListOpen] = useState(false);

  const handleMenuOpen = useCallback(() => {
    setIsListOpen(true);
  }, [isListOpen]);

  return (
    <Wrapper>
      {isListOpen ? <MenuList setIsListOpen={setIsListOpen}></MenuList> : null}
      <Escape></Escape>
      <ShowAll onClick={handleMenuOpen}>
        <FaShapes></FaShapes>
      </ShowAll>
      <ModalList></ModalList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: rgba(50, 60, 70, 0.9);
  border-radius: 0 0 3px 3px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 39px;
  display: flex;
  margin-left: 15px;
`;

const Escape = styled.div`
  width: 17px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  height: 36px;

  :hover {
    background: rgba(60, 70, 80, 0.9);
    cursor: pointer;
  }
`;

const ShowAll = styled.div`
  width: 77px;
  height: 39px;

  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
    svg {
      color: #eee;
    }
  }

  svg {
    color: darkgray;
    width: 20px;
    height: 20px;
  }
`;

export default TotalMenu;
