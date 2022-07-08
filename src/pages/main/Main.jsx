import React, { useCallback, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import TopMenu from "./../../components/menu/TopMenu";
import Wallpaper from "./Wallpaper";
import { useSelector, useDispatch } from "react-redux";
import { getShortcut } from "../../store/slice/shortcutSlice";

const Main = () => {
  const modalList = useSelector((state) => state.modal.modalList);
  const dispatch = useDispatch();
  const id = window.localStorage.getItem("id");

  useEffect(() => {
    dispatch(getShortcut(id));
  }, []);

  const handleRightClick = useCallback((e) => {
    e.preventDefault();
    return;
  }, []);

  const renderModal = useCallback(() => {
    return modalList?.map((el) => (
      <div key={`modal-${el.id}`}>{el.component}</div>
    ));
  }, [modalList]);

  return (
    <Wrapper
      onContextMenu={handleRightClick}
      onDragOver={(e) => {
        e.dataTransfer.dropEffect = "move";
        e.preventDefault();
      }}
      onDragEnter={(e) => {
        e.preventDefault();
      }}
    >
      {renderModal()}
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
  background-image: url(https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg);
  background-size: cover;
`;

export default Main;
