import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from '../../utils/useWindowSize';

// Define keyframes dynamically
const moveOrb = (width, height) => keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(${width / 4}px, ${height / 4}px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const OrbStyled = styled.div`
  width: 70vh;
  height: 70vh;
  position: absolute;
  border-radius: 50%;
  margin-left: -35vh;
  margin-top: -35vh;
  background: linear-gradient(180deg, #F56692 100%, #F2994A 100%);
  filter: blur(400px);
  z-index: 1;
`;

function Orb() {
  const { width, height } = useWindowSize();
  const animation = moveOrb(width, height);

  return <OrbStyled style={{ animation: `${animation} 15s alternate linear infinite` }} />;
}

export default Orb;
