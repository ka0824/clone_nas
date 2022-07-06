import React, { useCallback, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { RiSearchLine } from "react-icons/ri";
import MenuIcon from "./../icons/MenuIcon";

const MenuList = ({ setIsListOpen }) => {
  const menuList = useSelector((state) => state.menu);
  const [searchInput, setSearchInput] = useState("");
  const searchRef = useRef(null);

  const handleInput = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  const renderMenus = useCallback(() => {
    return filterSearch().map((el) => {
      return (
        <MenuIcon
          id={el.id}
          title={el.title}
          svg={el.icon}
          type="menu"
          setIsListOpen={setIsListOpen}
          searchRef={searchRef}
        ></MenuIcon>
      );
    });
  }, [menuList, searchInput]);

  const filterSearch = useCallback(() => {
    return menuList.filter((el) => el.title.includes(searchInput));
  }, [searchInput]);

  return (
    <Wrapper>
      <GrayScale></GrayScale>
      <Search ref={searchRef}>
        <RiSearchLine></RiSearchLine>
        <input placeholder="검색" onChange={handleInput}></input>
      </Search>
      <ListWrapper>{renderMenus()}</ListWrapper>
    </Wrapper>
  );
};

const mountEvent = keyframes`
    0% {
        transform: translate(0, -30px);
    }

    100% {
        transform: translate(0, 0);
    }

`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 800;

  margin-left: -15px;
  background-image: url(https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg);
  background-size: cover;
  backdrop-filter: grayscale(80%);
  overflow: hidden;
`;

const GrayScale = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  background: white;
  opacity: 0.5;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(50, 60, 70);
  height: 34px;
  width: 230px;
  margin: 0 auto;
  margin-top: 40px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  animation: ${mountEvent} 0.4s;

  color: #eee;

  padding: 1px 10px 1px 10px;

  input {
    background: rgba(50, 60, 70);
    border: none;
    outline: none;
    color: #eee;
    height: 24px;
  }

  svg {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    color: #eee;
  }
`;

const ListWrapper = styled.div`
  margin: 20px auto;
  width: 80%;
  height: 85%;
  animation: ${mountEvent} 0.4s;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

export default MenuList;
