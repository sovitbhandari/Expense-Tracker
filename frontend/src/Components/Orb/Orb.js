import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from '../../utils/useWindowSize';

// Define keyframes and styled component outside the functional component
const moveOrb = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(var(--orb-width), var(--orb-height));
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
  margin-left: -37vh;
  margin-top: -37vh;
  background: linear-gradient(180deg, #F56692 100%, #F2994A 100%);
  filter: blur(400px);
  animation: ${moveOrb} 15s alternate linear infinite;
  z-index: 1;
`;

function Orb() {
  const { width, height } = useWindowSize();

  // Set CSS variables for dynamic styling
  const style = {
    '--orb-width': `${width}px`,
    '--orb-height': `${height / 2}px`,
  };

  return <OrbStyled style={style} />;
}

export default Orb;
