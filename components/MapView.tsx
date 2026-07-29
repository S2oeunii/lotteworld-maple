'use client';

import { useRef, useCallback } from 'react';
import { MapExplorer } from './MapExplorer';
import { NavBar } from './NavBar';

export function MapView({ svgContent }: { svgContent: string }) {
  const navigateRef = useRef<((svgX: number, svgY: number) => void) | null>(null);

  const onNavClick = useCallback((svgX: number, svgY: number) => {
    navigateRef.current?.(svgX, svgY);
  }, []);

  return (
    <>
      <MapExplorer svgContent={svgContent} navigateRef={navigateRef} />
      <NavBar onNavClick={onNavClick} />
    </>
  );
}
