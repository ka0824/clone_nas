import React, { useEffect, useCallback, forwardRef } from "react";
import styled from "styled-components";
import { FcPlus } from "react-icons/fc";

const DragIcon = ({ svg, title, isDrag }, ref) => {
  const handleMouseOver = (e) => {
    e.preventDefault();
    console.log("test2");
    if (isDrag) {
      console.log("test");
    }
  };

  return (
    <Wrapper ref={ref} className="drag-icon">
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
  /* top: ${({ yPos }) => {
    return `${yPos + 10}px`;
  }};
  left: ${({ xPos }) => {
    return `${xPos + 10}px`;
  }}; */

  top: 0;
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

export default forwardRef(DragIcon);
