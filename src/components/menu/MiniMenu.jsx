import React from "react";
import styled from "styled-components";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";

const MiniMenu = () => {
  return (
    <Wrapper>
      <IoChatbubbleEllipses></IoChatbubbleEllipses>
      <FaUserAlt></FaUserAlt>
      <RiSearchLine></RiSearchLine>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: rgba(50, 60, 70, 0.9);
  display: inline-block;
  border-radius: 0 0 3px 3px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 39px;
  margin-right: 15px;

  padding-right: 15px;

  display: flex;
  align-items: center;

  svg {
    color: darkgray;
    width: 25px;
    height: 25px;
    margin-left: 15px;

    :hover {
      color: #eee;
      cursor: pointer;
    }
  }
`;

export default MiniMenu;
