import React, { useState, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  changeId,
  changeLoginPage,
  submitId,
} from "../../store/slice/loginSlice";
import LoginInput from "./../../components/input/LoginInput";
import LoginButton from "./../../components/button/LoginButton";

const LoginId = () => {
  const dispatch = useDispatch();
  const inputId = useSelector((state) => state.login.inputId);
  const isSubmitId = useSelector((state) => state.login.isSubmitId);

  const handleInputId = useCallback(
    (e) => {
      dispatch(changeId(e.target.value));
    },
    [inputId]
  );

  const handleIdButton = useCallback(() => {
    dispatch(submitId());

    if (inputId.length === 0) {
      return;
    }

    dispatch(changeLoginPage(2));
  }, [isSubmitId, inputId]);

  const handleEnter = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleIdButton(e);
      }
    },
    [inputId]
  );

  return (
    <Wrapper>
      <PrevInfoWrapper>
        <PrevInfo></PrevInfo>
      </PrevInfoWrapper>
      <Title>클론 코딩 입니다.</Title>
      <LoginText>로그인</LoginText>
      <LoginInput
        inputValue={inputId}
        handleInput={handleInputId}
        isSubmit={isSubmitId}
        handleEnter={handleEnter}
      ></LoginInput>
      <LoginButton
        inputValue={inputId}
        handleButton={handleIdButton}
        isSubmit={isSubmitId}
      ></LoginButton>
    </Wrapper>
  );
};

const mount = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }

`;

const Wrapper = styled.article`
  animation: ${mount} 1s;
`;

const PrevInfoWrapper = styled.section`
  width: 100%;
  height: 3rem;
`;

const PrevInfo = styled.div`
  border-top: solid 3px #057feb;
  display: inline-block;
  min-width: 70px;
  height: 3rem;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 3rem;
`;

const Title = styled.section`
  color: #057feb;
  font-size: 22px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 40px;
`;

const LoginText = styled.section`
  color: #414b55;
  font-weight: bold;
  padding-bottom: 30px;
  font-size: 18px;
`;

export default LoginId;
