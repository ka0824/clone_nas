import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;

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
