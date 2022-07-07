import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        user-select: none;

    

    }

    [draggable="true"] {
    /*
   To prevent user selecting inside the drag source
  */
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}

    html, body, #root, .App {
        height: 100%;
        width: 100%;    
    }

    ::-webkit-scrollbar {
        display: none;
    }

    .grab {
        cursor: grab;
    }

    
    body.dragging,
    body.dragging * {
        cursor: url('./assets/cursors/grabbing.cur'), move !important;
    
}


`;

export default GlobalStyle;
