import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "@emotion/styled";

const LoginInput = ({
  inputValue,
  handleInput,
  isSubmit,
  handleEnter,
  type = "text",
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Input
      ref={inputRef}
      value={inputValue}
      onChange={handleInput}
      inputValue={inputValue}
      isSubmit={isSubmit}
      onKeyPress={handleEnter}
      type={type}
    ></Input>
  );
};

const Input = styled.input`
  border: none;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 24px;
  font-size: 15px;
  padding: 12px 0px 6px 0px;
  margin-right: 12px;
  transition: 0.3s;
  width: 100%;

  border-bottom: ${({ isSubmit, inputValue }) => {
    if (isSubmit && inputValue.length === 0) {
      return `solid 2px red`;
    } else if (isSubmit && inputValue.length !== 0) {
      return `solid 2px #eee`;
    } else {
      return `solid 2px #eee`;
    }
  }};

  :focus {
    border-bottom: ${({ isSubmit, inputValue }) => {
      if (isSubmit && inputValue.length === 0) {
        return `solid 2px red`;
      } else if (isSubmit && inputValue.length !== 0) {
        return `solid 2px #057feb`;
      } else {
        return `solid 2px #057feb`;
      }
    }};
  }
`;

export default LoginInput;
