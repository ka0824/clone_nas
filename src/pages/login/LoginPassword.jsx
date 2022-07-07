import React, { useState, useCallback, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  changeLoginPage,
  submitPassword,
} from "../../store/slice/loginSlice";
import { BiChevronLeft, BiNoEntry } from "react-icons/bi";
import { RiUser3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import LoginInput from "./../../components/input/LoginInput";
import LoginButton from "./../../components/button/LoginButton";
import axios from "axios";
import { IoConstructOutline } from "react-icons/io5";

const LoginPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputId = useSelector((state) => state.login.inputId);
  const inputPassword = useSelector((state) => state.login.inputPassword);
  const isSubmitPassword = useSelector((state) => state.login.isSubmitPassword);
  const [isUnmount, setIsUnmount] = useState(false);

  const handlePrev = useCallback(() => {
    dispatch(changeLoginPage(1));
  }, []);

  const handleInputPassword = useCallback(
    (e) => {
      dispatch(changePassword(e.target.value));
    },
    [inputPassword]
  );

  const handlePasswordButton = useCallback(async () => {
    dispatch(submitPassword());

    if (inputPassword.length === 0) {
      return;
    }

    const result = await axios.get(
      `http://localhost:4000/login?id=${inputId}&password=${inputPassword}`
    );

    if (result.data.length === 0) {
      return;
    } else {
      setIsUnmount(true);
    }
  }, [isSubmitPassword, inputPassword, inputId]);

  useEffect(() => {
    if (isUnmount) {
      setTimeout(() => navigate("/main"), 500);
    }
  }, [isUnmount]);

  const handleEnter = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handlePasswordButton(e);
      }
    },
    [inputPassword, isUnmount]
  );

  return (
    <Wrapper>
      <PrevInfoWrapper>
        <PrevInfo>클론 코딩 입니다.</PrevInfo>
      </PrevInfoWrapper>
      <PrevButton onClick={handlePrev}>
        <BiChevronLeft></BiChevronLeft>
        <RiUser3Fill></RiUser3Fill>
        {inputId}
      </PrevButton>
      <LoginText>패스워드 입력</LoginText>
      <LoginInput
        inputValue={inputPassword}
        handleInput={handleInputPassword}
        isSubmit={isSubmitPassword}
        handleEnter={handleEnter}
        type="password"
      ></LoginInput>
      <Alert>계정 또는 패스워드가 맞지 않습니다. 다시 시도하십시오.</Alert>
      <UnmountEvent isUnmount={isUnmount}></UnmountEvent>
      <LoginButton
        inputValue={inputPassword}
        handleButton={handlePasswordButton}
        isSubmit={isSubmitPassword}
      ></LoginButton>
    </Wrapper>
  );
};

const circleAnimation = keyframes`


  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(3500);
  }
`;

const UnmountEvent = styled.div`
  /* position: absolute;
  margin-top: 330px;
  margin-left: 1200px; */
  position: absolute;
  margin-top: 130px;
  margin-left: 325px;

  background: #057feb;

  border-radius: 50%;
  width: 1px;
  height: 1px;

  z-index: 99;

  ${({ isUnmount }) => {
    if (isUnmount) {
      return css`
        animation: ${circleAnimation} 0.7s;
      `;
    } else {
      return css`
        animation: none;
      `;
    }
  }};
`;

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
  color: #057feb;
  font-size: 0.8rem;
`;

const LoginText = styled.section`
  color: #414b55;
  font-weight: bold;
  padding-bottom: 30px;
  font-size: 18px;
`;

const PrevButton = styled.button`
  outline: none;
  background: transparent;
  border: none;
  margin-left: -25px;
  color: gray;
  font-weight: bold;

  margin-top: 10px;

  display: flex;
  align-items: center;
  margin-bottom: 40px;

  :hover {
    cursor: pointer;

    svg:nth-of-type(1) {
      color: black;
      transform: translate(-3px, 0);
    }
  }

  svg:nth-of-type(1) {
    width: 25px;
    height: 25px;
    transition: 0.2s;
  }

  svg:nth-of-type(2) {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
`;

const Alert = styled.div``;

export default LoginPassword;
