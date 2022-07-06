import React from "react";
import MiniMenu from "./MiniMenu";
import styled from "styled-components";
import TotalMenu from "./TotalMenu";

const TopMenu = () => {
  return (
    <Wrapper>
      <TotalMenu></TotalMenu>
      <MiniMenu></MiniMenu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.mountEvent};
`;

export default TopMenu;
