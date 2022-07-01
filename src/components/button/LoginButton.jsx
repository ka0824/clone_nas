import React from "react";
import { BsArrowRight } from "react-icons/bs";
// import styled from "@emotion/styled";
// import { keyframes } from "@emotion/react";
import styled, { keyframes, css } from "styled-components";

const LoginButton = ({ handleButton, inputValue, isSubmit }) => {
  return (
    <Wrapper onClick={handleButton} inputValue={inputValue} isSubmit={isSubmit}>
      <Icon>
        <BsArrowRight></BsArrowRight>
      </Icon>
      <Wave></Wave>
    </Wrapper>
  );
};

const wave = keyframes`
    0% {
        transform: scale(1);
        opacity: 0.8;
    }

    20% {
        transform: scale(1.3);
        opacity: 0;
    }

    100% {
        transform: scale(1.3);
        opacity: 0;
    }

`;

const Wrapper = styled.div`
  background: #057feb;
  width: 72px;
  height: 72px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  margin-top: 130px;
  margin-left: 325px;

  :hover {
    ${({ isSubmit, inputValue }) => {
      if (isSubmit && inputValue.length === 0) {
        return css`
          cursor: default;
        `;
      } else {
        return css`
          cursor: pointer;
        `;
      }
    }}
  }

  svg {
    width: 40px;
    height: 40px;
    z-index: 10;
    display: block;
    color: white;

    ${({ isSubmit, inputValue }) => {
      if (isSubmit && inputValue.length === 0) {
        return css`
          opacity: 0.2;
        `;
      } else {
        return css`
          opacity: 1;
        `;
      }
    }}
  }
`;

const Wave = styled.div`
  background: #057feb;
  width: 72px;
  height: 72px;
  border-radius: 50%;

  position: absolute;
  z-index: 8;

  animation: ${wave} 2s infinite;
  animation-delay: 2s;
`;

const Icon = styled.div`
  z-index: 10;
`;

export default LoginButton;
