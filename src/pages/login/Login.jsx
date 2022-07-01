import React from "react";
import LoginBox from "./LoginBox";
import styled, { css, keyframes } from "styled-components";

const Login = () => {
  return (
    <Wrapper>
      <LoginBox></LoginBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg);
  background-size: cover;
  -webkit-filter: grayscale(60%);
  -moz-filter: grayscale(60%);
  -o-filter: grayscale(60%);
  -ms-filter: grayscale(60%);
  filter: grayscale(60%);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Login;
