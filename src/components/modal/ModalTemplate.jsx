import React, { useRef, useState, useEffect, memo } from "react";
import styled, { css } from "styled-components";
import { FcFolder } from "react-icons/fc";
import { TbQuestionMark, TbSearch } from "react-icons/tb";
import { AiOutlineLine } from "react-icons/ai";
import { FaRegWindowMaximize } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";
import { AiOutlineCaretDown } from "react-icons/ai";
import {
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext,
  MdOutlineRefresh,
  MdOutlineSort,
} from "react-icons/md";
import FolderModalBtn from "./../button/FolderModalBtn";
import { BiSortDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  removeModal,
  changeZindex,
  changeHidden,
} from "../../store/slice/ModalSlice";

const ModalTemplate = ({ id, icon, title, modalCnt }) => {
  const [size, setSize] = useState({ width: 1010, height: 600 });
  const [topSpace, setTopSpace] = useState("50%");
  const [rightSpace, setRightSpace] = useState(0);
  const [leftSpace, setLeftSpace] = useState("50%");
  const [bottomSpace, setBottomSpace] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const posX = useRef(0);
  const posY = useRef(0);
  const prevWidth = useRef(1010);
  const prevHeight = useRef(600);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const visibility = useSelector(
    (state) =>
      state.modal.visibleList.filter((el) => el.id === id)[0].visibility
  );
  const zIndex = useSelector(
    (state) => state.modal.zIndexList.filter((el) => el.id === id)[0].zIndex
  );
  const [isResize, setIsResize] = useState(false);

  const handleClose = (e) => {
    e.stopPropagation();

    dispatch(removeModal(id));
  };

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleDragEnd = (event) => {
    event.stopPropagation();
    if (event.screenX === 0) {
      return;
    }

    if (isFullScreen) {
      return;
    }
  };

  const handleDragStart = (event) => {
    event.stopPropagation();

    const img = new Image();
    event.dataTransfer.setDragImage(img, 0, 0);
    if (isFullScreen) {
      return;
    }
    // posX.current = event.clientX;

    posX.current = event.nativeEvent.offsetX;

    posY.current = event.nativeEvent.offsetY;

    return false;
  };

  const handleDrag = (event) => {
    if (event.clientX === 0 && event.clientY === 0) {
      return;
    }

    event.stopPropagation();

    if (isFullScreen) {
      return;
    }

    setTopSpace(`${event.clientY - posY.current}px`);
    setLeftSpace(`${event.clientX - posX.current}px`);
  };

  const handleClick = () => {
    // setzIndex(zIndex + modalList.length);
    dispatch(changeZindex(id));
  };

  const handleVisibility = () => {
    dispatch(changeHidden(id));
  };

  const handleWrapperStart = (e) => {
    console.log("start");

    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);

    posX.current = e.nativeEvent.offsetX;

    posY.current = e.nativeEvent.offsetY;

    prevWidth.current = size.width;
    prevHeight.current = size.height;
  };

  const handleResize = (e, posX, posY, prevWidth, prevHeight) => {
    console.log([
      e,
      posX.current,
      posY.current,
      prevHeight.current,
      prevWidth.current,
    ]);
    // e.stopImmediatePropagation();
    if (e.clientX === 0 && e.clientY === 0) {
      return;
    }
    if (e.clientX === 0) {
      return;
    }
    console.log([posX.current, prevHeight.current]);
    if (
      prevWidth.current - posX.current < 10 &&
      prevHeight.current - posY.current < 10
    ) {
      handleRightBottomSpace(e);
    } else if (posX.current < 10 && prevHeight.current - posY.current < 10) {
      handleLeftBottomSpace(e);
    } else if (posX.current < 10 && posY.current < 10) {
      handleLeftTopSpace(e);
    } else if (prevWidth.current - posX.current < 10 && posY.current < 10) {
      handleRightTopSpace(e);
    } else if (prevWidth.current - posX.current < 10) {
      handleRightSpace(e);
    } else if (prevHeight.current - posY.current < 10) {
      handleBottomSpace(e);
    } else if (posX.current < 10) {
      handleLeftSpace(e);
    } else if (posY.current < 10) {
      handleTopSpace(e);
    }
  };

  const handleWrapperDrag = (e) => {
    console.log("drag");
    // e.stopImmediatePropagation();
    if (e.clientX === 0 && e.clientY === 0) {
      return;
    }
    if (e.clientX === 0) {
      return;
    }
    console.log("hi");
    if (
      prevWidth.current - posX.current < 10 &&
      prevHeight.current - posY.current < 10
    ) {
      handleRightBottomSpace(e);
    } else if (posX.current < 10 && prevHeight.current - posY.current < 10) {
      handleLeftBottomSpace(e);
    } else if (posX.current < 10 && posY.current < 10) {
      handleLeftTopSpace(e);
    } else if (prevWidth.current - posX.current < 10 && posY.current < 10) {
      handleRightTopSpace(e);
    } else if (prevWidth.current - posX.current < 10) {
      handleRightSpace(e);
    } else if (prevHeight.current - posY.current < 10) {
      handleBottomSpace(e);
    } else if (posX.current < 10) {
      handleLeftSpace(e);
    } else if (posY.current < 10) {
      handleTopSpace(e);
    }
  };

  const handleWrapperEnd = (e) => {
    console.log("end");

    // e.stopImmediatePropagation();
  };

  const handleRightSpace = (e) => {
    const newWidth =
      e.clientX - wrapperRef.current.getBoundingClientRect().left;

    setSize({
      ...size,
      width: newWidth < 1010 ? 1010 : newWidth,
    });
  };

  const handleLeftSpace = (e) => {
    const newWidth =
      wrapperRef.current.getBoundingClientRect().left +
      wrapperRef.current.offsetWidth -
      e.clientX;
    setSize({
      ...size,
      width: newWidth < 1010 ? 1010 : newWidth,
    });

    if (newWidth < 1010) {
      return;
    }

    setLeftSpace(`${e.clientX}px`);
  };

  const handleTopSpace = (e) => {
    const newHeight =
      wrapperRef.current.getBoundingClientRect().top +
      wrapperRef.current.offsetHeight -
      e.clientY;

    setSize({
      ...size,
      height: newHeight < 600 ? 600 : newHeight,
    });

    if (newHeight < 600) {
      return;
    }

    setTopSpace(`${e.clientY}px`);
  };

  const handleBottomSpace = (e) => {
    const newHeight =
      e.clientY - wrapperRef.current.getBoundingClientRect().top;

    setSize({
      ...size,
      height: newHeight < 600 ? 600 : newHeight,
    });
  };

  const handleLeftBottomSpace = (e) => {
    const newHeight =
      e.clientY - wrapperRef.current.getBoundingClientRect().top;

    const newWidth =
      wrapperRef.current.getBoundingClientRect().left +
      wrapperRef.current.offsetWidth -
      e.clientX;

    setSize({
      width: newWidth < 1010 ? 1010 : newWidth,
      height: newHeight < 600 ? 600 : newHeight,
    });

    if (newWidth < 1010) {
      return;
    }

    setLeftSpace(`${e.clientX}px`);
  };

  const handleRightBottomSpace = (e) => {
    const newWidth =
      e.clientX - wrapperRef.current.getBoundingClientRect().left;

    const newHeight =
      e.clientY - wrapperRef.current.getBoundingClientRect().top;

    setSize({
      height: newHeight < 600 ? 600 : newHeight,
      width: newWidth < 1010 ? 1010 : newWidth,
    });
  };

  const handleLeftTopSpace = (e) => {
    const newHeight =
      wrapperRef.current.getBoundingClientRect().top +
      wrapperRef.current.offsetHeight -
      e.clientY;
    const newWidth =
      wrapperRef.current.getBoundingClientRect().left +
      wrapperRef.current.offsetWidth -
      e.clientX;

    setSize({
      height: newHeight < 600 ? 600 : newHeight,
      width: newWidth < 1010 ? 1010 : newWidth,
    });

    if (newHeight < 600) {
      return;
    }

    setTopSpace(`${e.clientY}px`);

    if (newWidth < 1010) {
      return;
    }

    setLeftSpace(`${e.clientX}px`);
  };

  const handleRightTopSpace = (e) => {
    const newHeight =
      wrapperRef.current.getBoundingClientRect().top +
      wrapperRef.current.offsetHeight -
      e.clientY;
    const newWidth =
      e.clientX - wrapperRef.current.getBoundingClientRect().left;

    setSize({
      height: newHeight < 600 ? 600 : newHeight,
      width: newWidth < 1010 ? 1010 : newWidth,
    });

    if (newHeight < 600) {
      return;
    }

    setTopSpace(`${e.clientY}px`);
  };

  return (
    <Wrapper
      info={"userInfo"}
      id={id}
      zIndex={zIndex}
      onClick={handleClick}
      modalCnt={modalCnt}
      visibility={visibility}
      size={size}
      isFullScreen={isFullScreen}
      onDragStart={handleWrapperStart}
      onDrag={handleWrapperDrag}
      onDragEnd={handleWrapperEnd}
      ref={wrapperRef}
      topSpace={topSpace}
      rightSpace={rightSpace}
      leftSpace={leftSpace}
      bottomSpace={bottomSpace}
      onTouchMove={() => console.log("touch")}
      draggable
    >
      <LeftSizeTag></LeftSizeTag>

      <BottomSizeTag
        width={wrapperRef.current?.offsetWidth}
        height={wrapperRef.current?.offsetHeight}
      ></BottomSizeTag>

      <RightSizeTag width={wrapperRef.current?.offsetWidth}></RightSizeTag>
      <TopSizeTag width={wrapperRef.current?.offsetWidth}></TopSizeTag>

      <RightBottomSizeTag
        width={wrapperRef.current?.offsetWidth}
        height={wrapperRef.current?.offsetHeight}
      ></RightBottomSizeTag>
      <LeftBottomSizeTag
        height={wrapperRef.current?.offsetHeight}
      ></LeftBottomSizeTag>
      <LeftTopSize></LeftTopSize>
      <RightTopSize width={wrapperRef.current?.offsetWidth}></RightTopSize>
      <TopBar
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        draggable
      >
        <Title>
          {icon}
          <div>{title}</div>
        </Title>
        <TitleOps>
          <TbQuestionMark></TbQuestionMark>
          <AiOutlineLine onClick={handleVisibility}></AiOutlineLine>
          <FaRegWindowMaximize onClick={handleFullScreen}></FaRegWindowMaximize>
          <IoCloseOutline onClick={handleClose}></IoCloseOutline>
        </TitleOps>
      </TopBar>
      <Content>
        <Directory></Directory>
        <Infomation>
          <PageOps>
            <IconButton type="first">
              <MdOutlineNavigateBefore></MdOutlineNavigateBefore>
            </IconButton>
            <IconButton type="second">
              <MdOutlineNavigateNext></MdOutlineNavigateNext>
            </IconButton>
            <IconButton>
              <MdOutlineRefresh></MdOutlineRefresh>
            </IconButton>
            <Path>
              <div></div>
              <IoMdStar></IoMdStar>
            </Path>
            <Search>
              <SearchIcons>
                <TbSearch></TbSearch>
                <AiOutlineCaretDown></AiOutlineCaretDown>
              </SearchIcons>
              <input placeholder="검색"></input>
            </Search>
          </PageOps>
          <Option>
            <TextOps>
              <FolderModalBtn text="폴더 생성"></FolderModalBtn>
              <FolderModalBtn
                text="업로드"
                icon={<AiOutlineCaretDown></AiOutlineCaretDown>}
              ></FolderModalBtn>
              <FolderModalBtn
                text="작업"
                icon={<AiOutlineCaretDown></AiOutlineCaretDown>}
              ></FolderModalBtn>
              <FolderModalBtn
                text="도구"
                icon={<AiOutlineCaretDown></AiOutlineCaretDown>}
              ></FolderModalBtn>
              <FolderModalBtn text="설정"></FolderModalBtn>
            </TextOps>
            <IconOps>
              <IconButton type="first">
                <MdOutlineSort></MdOutlineSort>
              </IconButton>
              <IconButton type="third">
                <AiOutlineCaretDown></AiOutlineCaretDown>
              </IconButton>
              <IconButton type="fourth">
                <BiSortDown></BiSortDown>
              </IconButton>
            </IconOps>
          </Option>
          <Detail></Detail>
          <Refresh>
            <RefreshInfo>
              <div>00 개 항목</div>
              <MdOutlineRefresh></MdOutlineRefresh>
            </RefreshInfo>
          </Refresh>
        </Infomation>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;

  ${({ isFullScreen, size, topSpace, rightSpace, leftSpace, bottomSpace }) => {
    if (isFullScreen) {
      return css`
        width: 100%;
        height: 100%;
        top: 0 !important;
        left: 0 !important;
        transform: none;
        margin-top: 38px;
      `;
    } else {
      return css`
        width: ${size.width}px !important;
        height: ${size.height}px !important;

        top: ${({ modalCnt, topSpace }) => {
          if (topSpace === "50%") {
            return `calc(20% + ${modalCnt * 10}px )`;
          } else {
            return `${topSpace}`;
          }
        }};

        left: ${({ modalCnt, leftSpace, topSpace }) => {
          if (topSpace === "50%" && leftSpace === "50%") {
            return `calc(20% + ${modalCnt * 10}px )`;
          } else {
            return `${leftSpace}`;
          }
        }};

        /* transform: translate(-50%, -50%); */
      `;
    }
  }};

  background: white;
  z-index: 1200;

  z-index: ${({ zIndex }) => {
    return `${zIndex}`;
  }};

  visibility: ${({ visibility }) => {
    return `${visibility}`;
  }};

  border-radius: 5px;
  overflow: hidden;

  -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  border-bottom: 1.5px solid #eee;

  :hover {
    cursor: move;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: bold;
  color: #808080;
  svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  height: 32px;
`;

const TitleOps = styled.div`
  display: flex;
  height: 32px;
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
    margin-left: 5px;
    color: rgba(80, 80, 80, 0.5);

    :hover {
      cursor: pointer;
      color: rgba(80, 80, 80, 0.8);
    }
  }
`;

const Content = styled.div`
  display: flex;
  height: 100%;
`;

const Directory = styled.div`
  border-right: 1.5px solid #eee;
  min-width: 230px;
`;

const Infomation = styled.div`
  padding: 15px 10px 10px 10px;
`;

const IconButton = styled.button`
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;

  width: 30px;
  height: 30px;

  ${({ type }) => {
    if (type === "first") {
      return css`
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-right: 1.5px solid rgba(80, 80, 80, 0.8);
      `;
    } else if (type === "second") {
      return css`
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        margin-right: 10px;
      `;
    } else if (type === "third") {
      return css`
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        width: 15px;
        margin-right: 10px;
      `;
    } else if (type === "fourth") {
      return css`
        margin-right: 0px;
      `;
    } else {
      return css`
        margin-right: 10px;
      `;
    }
  }};

  :hover {
    border: 2px solid rgba(80, 80, 80, 0.2);
  }

  svg {
    color: rgba(80, 80, 80, 0.5);

    ${({ type }) => {
      if (type === "third") {
        return css`
          width: 10px;
          height: 10px;
        `;
      } else {
        return css`
          width: 25px;
          height: 25px;
        `;
      }
    }}
  }
`;

const PageOps = styled.div`
  display: flex;
`;

const Path = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1.5px solid rgba(80, 80, 80, 0.5);
  overflow: hidden;

  div {
    width: 400px;

    height: 30px;
  }

  svg {
    width: 20px;
    height: 20px;
    color: rgba(80, 80, 80, 0.5);
    margin-right: 5px;

    :hover {
      cursor: pointer;
    }
  }
`;

const Search = styled.label`
  display: flex;
  align-items: center;
  margin-left: 10px;
  height: 30px;
  border: 1.5px solid rgba(80, 80, 80, 0.5);
  overflow: hidden;
  border-radius: 5px;

  input {
    height: 30px;
    border: none;
    outline: none;
    margin-left: 5px;
  }
`;

const SearchIcons = styled.div`
  color: rgba(80, 80, 80, 0.5);
  display: flex;
  align-items: center;

  :hover {
    color: #057feb;
    cursor: pointer;
  }

  svg:nth-of-type(1) {
    margin-left: 5px;
  }

  svg:nth-of-type(2) {
    width: 12px;
    height: 12px;
  }
`;

const TextOps = styled.div`
  display: flex;
`;

const Option = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1.5px solid #eee;
`;

const IconOps = styled.div`
  display: flex;
`;

const Detail = styled.div`
  width: 100%;
  height: 72%;
  border-bottom: 10px;
  border-bottom: 1.5px solid #eee;
`;

const Refresh = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1.5px solid #eee;
`;

const RefreshInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;

  & > div {
    padding-right: 10px;
    border-right: 3px solid #eee;
  }

  svg {
    width: 20px;
    height: 20px;
    color: #057feb;
    margin-left: 10px;

    :hover {
      cursor: pointer;
    }
  }
`;

const LeftSizeTag = styled.div`
  position: absolute;
  width: 10px;
  height: 100%;

  :hover {
    cursor: ew-resize;
  }
  &:disabled {
    cursor: ew-resize;
  }
`;

const LeftBottomSizeTag = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  margin-top: auto;
  top: ${({ top, height }) => {
    return `${height - 10}px`;
  }};

  :hover {
    cursor: nesw-resize;
  }
`;

const BottomSizeTag = styled.div`
  position: absolute;
  height: 10px;

  ${({ width, height }) => {
    return css`
      width: ${width}px;
      top: ${height - 10}px;
    `;
  }};

  :hover {
    cursor: ns-resize;
  }
`;

const RightBottomSizeTag = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;

  ${({ width, height }) => {
    return css`
      left: ${width - 10}px;
      top: ${height - 10}px;
    `;
  }}

  :hover {
    cursor: nwse-resize;
  }
`;

const RightSizeTag = styled.div`
  position: absolute;
  width: 10px;
  height: 100%;

  ${({ width }) => {
    return css`
      left: ${width - 10}px;
    `;
  }};

  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  :hover {
    cursor: ew-resize !important;
  }

  :active {
    cursor: pointer !important;
  }
  :focus {
    cursor: pointer !important;
  }
`;

const TopSizeTag = styled.div`
  position: absolute;
  height: 10px;
  ${({ width }) => {
    return css`
      width: ${width}px;
    `;
  }};

  :hover {
    cursor: ns-resize;
  }
`;

const LeftTopSize = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;

  :hover {
    cursor: nwse-resize;
  }
`;

const RightTopSize = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;

  :hover {
    cursor: nesw-resize;
  }

  :hover:active {
    cursor: nesw-resize;
  }

  ${({ width }) => {
    return css`
      left: ${width - 10}px;
    `;
  }};
`;

export default memo(ModalTemplate);
