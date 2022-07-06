import React from "react";
import styled from "styled-components";

const FolderModalBtn = ({ text, icon = null }) => {
  return (
    <Button>
      {text}
      {icon}
    </Button>
  );
};

const Button = styled.button`
  border: none;
  outline: none;
  padding: 5px 15px;
  margin-right: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  border: 1px solid transparent;

  :hover {
    cursor: pointer;
    border: 1px solid rgba(80, 80, 80, 0.5);
  }

  svg {
    margin-left: 5px;
    width: 8px;
    height: 8px;
  }
`;

export default FolderModalBtn;
