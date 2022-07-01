import React, { useCallback } from "react";
import styled from "styled-components";
import Icon from "../../components/icons/Icon";
import { useSelector } from "react-redux";

const Wallpaper = () => {
  const shortcutList = useSelector((state) => state.shortcut);

  const renderIcons = useCallback(() => {
    return shortcutList.map((el) => {
      return <Icon svg={el.icon} title={el.title} id={el.id}></Icon>;
    });
  }, [shortcutList]);

  return <Wrapper>{renderIcons()}</Wrapper>;
};

const Wrapper = styled.div`
  width: 95%;
  height: 90%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

export default Wallpaper;
