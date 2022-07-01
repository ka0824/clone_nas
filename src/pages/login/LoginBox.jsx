import React, { useState, useCallback } from "react";
import styled from "@emotion/styled";
import LoginId from "./LoginId";
import { useSelector } from "react-redux/es/exports";
import LoginPassword from "./LoginPassword";

const LoginBox = () => {
  const loginPage = useSelector((state) => state.login.loginPage);
  const renderLoginPage = useCallback(() => {
    switch (loginPage) {
      case 1:
        return <LoginId></LoginId>;
        break;

      case 2:
        return <LoginPassword></LoginPassword>;
        break;

      default:
        break;
    }
  }, [loginPage]);

  return <Wrapper>{renderLoginPage()}</Wrapper>;
};

const Wrapper = styled.article`
  background: white;
  box-shadow: 0 10px 20px 0 rgb(0 0 0 / 20%);
  padding: 0px 40px 22px 40px;
  width: 400px;
  min-height: 478px;
  border-radius: 6px;

  margin-left: 40%;

  @media (max-width: 800px) {
    margin-left: 0;
  }
`;

export default LoginBox;
