import { clamp } from '@zigurous/forge-react';
import { useEffect, useRef, useState } from 'react';

interface PanAndZoomState {
  panX: number;
  panY: number;
  zoom: number;
}

const delay = (1 / 16) * 1000;

const defaultState: PanAndZoomState = {
  panX: 0,
  panY: 0,
  zoom: 1,
};

export function usePanAndZoom(
  container: React.RefObject<HTMLElement>,
  minZoom = 0.5,
  maxZoom = 2,
): [PanAndZoomState, React.RefObject<boolean>] {
  const [state, setState] = useState(defaultState);
  const mousedown = useRef(false);
  const panning = useRef(false);
  const timeout = useRef<NodeJS.Timeout>();
  const touchPosition = useRef({ x: 0, y: 0 });

  // Handle mouse events
  useEffect(() => {
    if (!container.current) return;
    if (typeof window === 'undefined') return;

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
          mousedown.current = true;
        }, delay);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        mousedown.current = false;
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        if (panning.current) {
          timeout.current = setTimeout(() => {
            panning.current = false;
          }, delay);
        }
      }
    };

    const handlePan = (e: MouseEvent) => {
      if (mousedown.current) {
        panning.current = true;
        setState(state => ({
          panX: state.panX + e.movementX,
          panY: state.panY + e.movementY,
          zoom: state.zoom,
        }));
      }
    };

    const handleZoom = (e: WheelEvent) => {
      setState(state => {
        const zoomSpeed = 0.1;
        const zoomDirection = getWheelDirection(e);
        const zoomChange = zoomSpeed * zoomDirection;
        const zoom = clamp(state.zoom + zoomChange, minZoom, maxZoom);
        const rect = container.current?.getBoundingClientRect() ?? {
          left: 0,
          top: 0,
        };
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const panX = mouseX - (mouseX - state.panX) * (zoom / state.zoom);
        const panY = mouseY - (mouseY - state.panY) * (zoom / state.zoom);
        return {
          panX,
          panY,
          zoom,
        };
      });
    };

    container.current.addEventListener('wheel', handleZoom);
    container.current.addEventListener('mousedown', handleMouseDown);
    document.body.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mousemove', handlePan);

    return () => {
      container.current?.removeEventListener('wheel', handleZoom);
      container.current?.removeEventListener('mousedown', handleMouseDown);
      document.body.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mousemove', handlePan);
    };
  }, [container, minZoom, maxZoom]);

  // Handle touch events
  useEffect(() => {
    if (!container.current) return;
    if (typeof window === 'undefined') return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches.item(0);
        touchPosition.current = {
          x: touch?.clientX ?? 0,
          y: touch?.clientY ?? 0,
        };
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
          mousedown.current = true;
        }, delay);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        mousedown.current = false;
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        if (panning.current) {
          timeout.current = setTimeout(() => {
            panning.current = false;
          }, delay);
        }
      }
    };

    const handlePan = (e: TouchEvent) => {
      if (mousedown.current && e.changedTouches.length > 0) {
        const touch = e.changedTouches.item(0);
        const x = touch?.clientX ?? 0;
        const y = touch?.clientY ?? 0;
        const dx = x - touchPosition.current.x;
        const dy = y - touchPosition.current.y;
        touchPosition.current = { x, y };
        panning.current = true;
        setState(state => ({
          panX: state.panX + dx,
          panY: state.panY + dy,
          zoom: state.zoom,
        }));
      }
    };

    container.current.addEventListener('touchstart', handleTouchStart);
    document.body.addEventListener('touchend', handleTouchEnd);
    document.body.addEventListener('touchmove', handlePan);

    return () => {
      container.current?.removeEventListener('touchstart', handleTouchStart);
      document.body.removeEventListener('touchend', handleTouchEnd);
      document.body.removeEventListener('touchmove', handlePan);
    };
  }, [container, minZoom, maxZoom]);

  return [state, panning];
}

function getWheelDirection(e: WheelEvent) {
  if ('deltaY' in e) {
    return clamp(e.deltaY, -1, 1) * -1;
  }
  if ('wheelDeltaY' in e) {
    // @ts-ignore
    return clamp(e.wheelDeltaY, -1, 1);
  }
  return 0;
}
