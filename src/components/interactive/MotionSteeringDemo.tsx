import React, { useState, useEffect } from 'react';
import { Smartphone, RefreshCw, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import styles from './MotionSteeringDemo.module.css';

export const MotionSteeringDemo: React.FC = () => {
  const { language } = useLanguage();
  const [yawAngle, setYawAngle] = useState(0);
  const [carX, setCarX] = useState(50);
  const [spectatorLaughter, setSpectatorLaughter] = useState(30);

  const isSv = language === 'sv';

  useEffect(() => {
    const interval = setInterval(() => {
      setCarX((prevX) => {
        const delta = (yawAngle / 60) * 1.5;
        return Math.max(10, Math.min(90, prevX + delta));
      });

      const absYaw = Math.abs(yawAngle);
      setSpectatorLaughter(Math.min(100, Math.round(30 + absYaw * 1.1)));
    }, 50);

    return () => clearInterval(interval);
  }, [yawAngle]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.iconBox}>
            <Smartphone size={20} />
          </div>
          <div>
            <div className={styles.demoTitle}>
              {isSv ? 'Body Motion Steering Simulator' : 'Body Motion Steering Simulator'}
            </div>
            <div className={styles.demoSubtitle}>
              {isSv
                ? 'Vrid kroppen för att navigera banan!'
                : 'Rotate your whole torso to steer along the road!'}
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setYawAngle(0);
            setCarX(50);
          }}
          icon={<RefreshCw size={13} />}
        >
          {isSv ? 'Nollställ' : 'Reset'}
        </Button>
      </div>

      {/* Road Canvas Visualizer */}
      <div className={styles.roadCanvas}>
        <div className={styles.roadLines} />
        <div className={styles.centerLine} />

        {/* Vehicle */}
        <div
          className={styles.vehicle}
          style={{
            left: `${carX}%`,
            transform: `translateX(-50%) rotate(${yawAngle * 0.4}deg)`,
          }}
        >
          <div className={styles.vehicleBody}>
            <div className={styles.cockpit} />
            <div className={styles.taillights}>
              <div className={styles.taillight} />
              <div className={styles.taillight} />
            </div>
          </div>
        </div>

        {/* HUD Info */}
        <div className={styles.hud}>
          <div className={styles.hudBadge}>
            📍 {isSv ? 'Kroppsvridning' : 'Body Yaw'}:{' '}
            <strong style={{ color: '#38bdf8' }}>{Math.round(yawAngle)}°</strong>
          </div>
          <div className={styles.hudBadge}>
            😂 {isSv ? 'Åskådarhumor' : 'Spectator Fun'}:{' '}
            <strong style={{ color: '#fde047' }}>{spectatorLaughter}%</strong>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controlsGrid}>
        <div>
          <div className={styles.sliderLabel}>
            <span>{isSv ? 'Simulera Kroppsvridning:' : 'Simulate Torso Yaw:'}</span>
            <span style={{ color: '#0284c7' }}>
              {yawAngle > 0
                ? isSv ? `+${Math.round(yawAngle)}° (Höger)` : `+${Math.round(yawAngle)}° (Right)`
                : yawAngle < 0
                ? isSv ? `${Math.round(yawAngle)}° (Vänster)` : `${Math.round(yawAngle)}° (Left)`
                : '0°'}
            </span>
          </div>

          <input
            type="range"
            min="-60"
            max="60"
            value={yawAngle}
            onChange={(e) => setYawAngle(parseFloat(e.target.value))}
            className={styles.slider}
          />

          <div className={styles.presetButtons}>
            <button onClick={() => setYawAngle(-45)} className={styles.presetBtn}>
              {isSv ? '↩️ Vänster (-45°)' : '↩️ Left (-45°)'}
            </button>
            <button onClick={() => setYawAngle(0)} className={styles.presetBtn}>
              {isSv ? '⏹️ Centrera' : '⏹️ Center'}
            </button>
            <button onClick={() => setYawAngle(45)} className={styles.presetBtn}>
              {isSv ? '↪️ Höger (+45°)' : '↪️ Right (+45°)'}
            </button>
          </div>
        </div>

        <div className={styles.infoBox}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: 600, marginBottom: '0.25rem' }}>
            <Sparkles size={15} />
            <span>{isSv ? 'Tekniken:' : 'Under the hood:'}</span>
          </div>
          {isSv ? (
            <>
              Appen använder <code style={{ background: '#e5e7eb', padding: '1px 4px', borderRadius: '3px' }}>DeviceOrientationEvent.alpha</code> (kompassriktning) och ignorerar armtilt.
            </>
          ) : (
            <>
              Utilizes <code style={{ background: '#e5e7eb', padding: '1px 4px', borderRadius: '3px' }}>DeviceOrientationEvent.alpha</code> (compass yaw heading) to isolate body turns.
            </>
          )}
        </div>
      </div>
    </div>
  );
};
