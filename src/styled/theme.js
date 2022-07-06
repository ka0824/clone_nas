import { keyframes, css } from "styled-components";

const mountAnimation = keyframes`
     0% {
            transform: translate(0, -30px);
        }
    
        100% {
            transform: translate(0, 0);
        }
`;

const theme = {
  mountEvent: css`
    animation: ${mountAnimation} 1s;
  `,
};

export default theme;
