import React, { useCallback } from "react";
import styled, { keyframes } from "styled-components";
import TopMenu from "./../../components/menu/TopMenu";
import Wallpaper from "./Wallpaper";

const Main = () => {
  const handleRightClick = useCallback((e) => {
    e.preventDefault();
    return;
  }, []);

  return (
    <Wrapper onContextMenu={handleRightClick}>
      <TopMenu></TopMenu>
      <Wallpaper></Wallpaper>
    </Wrapper>
  );
};

const mount = keyframes`
  0% {
    opacity: 0.8;
  }

  100% {
    opacity: 1;
  }

`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  animation: ${mount} 1s;
  background-image: url(https://images.pexels.com/photos/3312671/pexels-photo-3312671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
  background-size: cover;
`;

export default Main;
