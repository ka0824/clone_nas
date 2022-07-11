import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FcPlus } from "react-icons/fc";

const DragIcons = ({ xPos, yPos }) => {
  const shortcutList = useSelector((state) => state.shortcut.list);
  const dragSelect = useSelector((state) => state.dragSelect.multi);

  const renderIcons = useCallback(() => {
    const selected = shortcutList.filter((el) => dragSelect.includes(el.id));
    return (
      <IconsWrapper>
        {selected.map((el) => (
          <div>
            {el.icon}
            <PlusIcon>
              <FcPlus></FcPlus>
            </PlusIcon>
          </div>
        ))}
      </IconsWrapper>
    );
  }, [dragSelect]);

  return (
    <Wrapper xPos={xPos} yPos={yPos}>
      {renderIcons()}
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
    width: 50px;
    height: 50px;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
`;

const PlusIcon = styled.div`
  position: absolute;
  margin-top: -30px;

  svg {
    width: 25px;
    height: 25px;
  }
`;

export default DragIcons;
