'use client';

import { useRef, useCallback, useState } from 'react';
import { MapExplorer } from './MapExplorer';
import { NavBar } from './NavBar';
import { StorePopup } from './StorePopup';

export function MapView({ svgContent }: { svgContent: string }) {
  const navigateRef = useRef<((svgX: number, svgY: number) => void) | null>(null);
  const [showStorePopup, setShowStorePopup] = useState(false);

  const onNavClick = useCallback((svgX: number, svgY: number) => {
    navigateRef.current?.(svgX, svgY);
  }, []);

  return (
    <>
      <MapExplorer
        svgContent={svgContent}
        navigateRef={navigateRef}
        onStoreClick={() => setShowStorePopup(true)}
      />
      <NavBar onNavClick={onNavClick} />
      {showStorePopup && <StorePopup onClose={() => setShowStorePopup(false)} />}
    </>
  );
}
