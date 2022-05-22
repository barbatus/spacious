import React from 'react';
import styled from 'styled-components/macro';

const StyledImg = styled.img`
  height: 120px;
`;

export const PlanetSvg = ({ id = 1 }) => {
  const imgId = Math.max(parseInt(id, 10) % 10, 1);
  const [svg, setSvg] = React.useState(null);

  React.useEffect(() => {
    import(`./assets/planet-${imgId}.svg`).then(({ default: src }) => setSvg(src));
  }, [imgId]);

  return (
    <StyledImg alt="Planet" src={svg}></StyledImg>
  );
};
