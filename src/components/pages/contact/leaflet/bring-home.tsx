import styled from 'styled-components';
import { theme } from '../../../layout/theme';
import React, { useCallback, useEffect, useState } from 'react';

const BringMeHomeStyled = styled.a`
  position: absolute;
  left: 50%;
  bottom: 5px;
  transform: translate(-50%);
  z-index: 1;

  display: inline-block;
  color: ${theme.palette.text.link.default};

  line-height: 150%;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: ${theme.palette.text.link.hover};
    text-decoration: underline;
  }

  background-color: #ffffff;
  padding: 2px 5px;
  cursor: pointer;
`;

export const BringMeHome = ({ map, center, zoom, children }) => {
  const [showHelper, setShowHelper] = useState(false);

  const onClick = useCallback(() => {
    map.setView(center, zoom);
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, setShowHelper]);

  const onMove = useCallback(() => {
    const currentCenter = map.getCenter();

    const THRESHOLD_DEGREE = 0.005;

    const dLat = Math.abs(currentCenter.lat - center[0]);
    const dLng = Math.abs(currentCenter.lng - center[1]);
    /**
     * 1 degree equals ~100km (very rough)
     * 5/100 is therefore 5km. We don't care if it's in reality 2km or 7km
     * in this case as we want a very rough signal that the user moved far away from our office
     */
    if (dLat > THRESHOLD_DEGREE || dLng > THRESHOLD_DEGREE) {
      // moved too much
      setShowHelper(true);
    } else {
      // back to normal
      setShowHelper(false);
    }
  }, [map]);

  if (!showHelper) {
    return null;
  }
  return <BringMeHomeStyled onClick={onClick}>{children}</BringMeHomeStyled>;
};
