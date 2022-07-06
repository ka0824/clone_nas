import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { FcPlus } from "react-icons/fc";

const DragIcon = ({ xPos, yPos, svg, title }) => {
  return (
    <Wrapper xPos={xPos} yPos={yPos}>
      <IconsWrapper>
        {svg}
        <PlusIcon>
          <FcPlus></FcPlus>
        </PlusIcon>
      </IconsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  z-index: 999;
  top: ${({ yPos }) => {
    return `${yPos}px`;
  }};
  left: ${({ xPos }) => {
    return `${xPos}px`;
  }};
  svg {
    width: 50px !important;
    height: 50px !important;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
`;

const PlusIcon = styled.div`
  position: absolute;
  margin-top: 25px;

  svg {
    width: 25px !important;
    height: 25px !important;
  }
`;

export default DragIcon;
