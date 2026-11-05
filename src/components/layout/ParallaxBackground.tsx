import React, { useEffect, useRef } from 'react';
import styles from './ParallaxBackground.module.css';

interface ParallaxBackgroundProps {
  theme?: 'light' | 'dark';
  speed?: number;
  opacity?: number;
  /**
   * Controls how softly the background glides/interpolates toward the scroll position.
   * Lower values = softer, longer glide (e.g. 5–7). Higher values = tighter tracking (e.g. 12–15).
   */
  smoothness?: number;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  theme = 'dark',
  speed = 0.28,
  opacity,
  smoothness = 3.5,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let currentOffset = (window.scrollY || window.pageYOffset) * speed;
    let targetOffset = currentOffset;
    let lastTime = performance.now();

    const applyTransform = (y: number) => {
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(0, -${y.toFixed(2)}px, 0)`;
      }
    };

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Frame-rate independent exponential damping (lerp)
      const factor = 1 - Math.exp(-smoothness * dt);
      currentOffset += (targetOffset - currentOffset) * factor;

      if (Math.abs(targetOffset - currentOffset) > 0.08) {
        applyTransform(currentOffset);
        rafId = window.requestAnimationFrame(animate);
      } else {
        currentOffset = targetOffset;
        applyTransform(currentOffset);
        rafId = null;
      }
    };

    const startAnimationLoop = () => {
      targetOffset = (window.scrollY || window.pageYOffset) * speed;
      if (rafId === null) {
        lastTime = performance.now();
        rafId = window.requestAnimationFrame(animate);
      }
    };

    const updateTrackHeight = () => {
      if (trackRef.current) {
        const docHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          window.innerHeight
        );
        const maxScroll = Math.max(0, docHeight - window.innerHeight);
        const requiredHeight = Math.ceil(window.innerHeight + maxScroll * speed + 300);
        trackRef.current.style.height = `${requiredHeight}px`;
      }
    };

    updateTrackHeight();
    applyTransform(currentOffset);

    window.addEventListener('scroll', startAnimationLoop, { passive: true });
    window.addEventListener('resize', updateTrackHeight, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      updateTrackHeight();
      startAnimationLoop();
    });
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('scroll', startAnimationLoop);
      window.removeEventListener('resize', updateTrackHeight);
      resizeObserver.disconnect();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [speed, smoothness]);

  return (
    <div className={styles.parallaxViewport} aria-hidden="true">
      <div
        ref={trackRef}
        className={`${styles.parallaxTrack} ${theme === 'dark' ? styles.dark : styles.light}`}
        style={opacity !== undefined ? { opacity } : undefined}
      />
    </div>
  );
};
