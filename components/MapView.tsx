'use client';

import { useRef, useCallback, useState } from 'react';

import { MapExplorer } from './MapExplorer';
import { NavBar } from './NavBar';

import { CastlePopup } from './CastlePopup';
import { JyrospinPopup } from './JyrospinPopup';
import { RollerCoasterPopup } from './RollerCoasterPopup';
import { StorePopup } from './StorePopup';

type ActivePopup =
  | 'Castle'
  | 'Jyrospin'
  | 'RollerCoater'
  | 'Store'
  | null;

export function MapView({
  svgContent,
}: {
  svgContent: string;
}) {
  // MapExplorer의 이동 함수
  const navigateRef = useRef<
    ((svgX: number, svgY: number) => void) | null
  >(null);

  // 현재 화면 중앙의 SVG 좌표
  const [currentSvgX, setCurrentSvgX] =
    useState(0);

  const [currentSvgY, setCurrentSvgY] =
    useState(0);

  // 팝업
  const [activePopup, setActivePopup] =
    useState<ActivePopup>(null);

  // NavBar 버튼 클릭
  const onNavClick = useCallback(
    (svgX: number, svgY: number) => {
      navigateRef.current?.(svgX, svgY);
    },
    []
  );

  return (
    <>
      <MapExplorer
        svgContent={svgContent}
        navigateRef={navigateRef}
        onLayerClick={setActivePopup}
        onPositionChange={(
          svgX: number,
          svgY: number
        ) => {
          setCurrentSvgX(svgX);
          setCurrentSvgY(svgY);
        }}
      />

      <NavBar
        onNavClick={onNavClick}
        currentSvgX={currentSvgX}
        currentSvgY={currentSvgY}
      />

      {activePopup === 'Castle' && (
        <CastlePopup
          onClose={() => setActivePopup(null)}
        />
      )}

      {activePopup === 'Jyrospin' && (
        <JyrospinPopup
          onClose={() => setActivePopup(null)}
        />
      )}

      {activePopup === 'RollerCoater' && (
        <RollerCoasterPopup
          onClose={() => setActivePopup(null)}
        />
      )}

      {activePopup === 'Store' && (
        <StorePopup
          onClose={() => setActivePopup(null)}
        />
      )}
    </>
  );
}