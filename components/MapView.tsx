'use client';

import { useRef, useCallback, useState } from 'react';
import { MapExplorer } from './MapExplorer';
import { NavBar } from './NavBar';
import { CastlePopup } from './CastlePopup';
import { JyrospinPopup } from './JyrospinPopup';
import { RollerCoasterPopup } from './RollerCoasterPopup';
import { StorePopup } from './StorePopup';

type ActivePopup = 'Castle' | 'Jyrospin' | 'RollerCoater' | 'Store' | null;

export function MapView({ svgContent }: { svgContent: string }) {
  const navigateRef = useRef<((svgX: number, svgY: number) => void) | null>(null);
  const [activePopup, setActivePopup] = useState<ActivePopup>(null);

  const onNavClick = useCallback((svgX: number, svgY: number) => {
    navigateRef.current?.(svgX, svgY);
  }, []);

  return (
    <>
      <MapExplorer
        svgContent={svgContent}
        navigateRef={navigateRef}
        onLayerClick={setActivePopup}
      />
      <NavBar onNavClick={onNavClick} />
      {activePopup === 'Castle'      && <CastlePopup       onClose={() => setActivePopup(null)} />}
      {activePopup === 'Jyrospin'    && <JyrospinPopup     onClose={() => setActivePopup(null)} />}
      {activePopup === 'RollerCoater'&& <RollerCoasterPopup onClose={() => setActivePopup(null)} />}
      {activePopup === 'Store'       && <StorePopup        onClose={() => setActivePopup(null)} />}
    </>
  );
}
