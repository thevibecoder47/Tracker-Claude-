'use client';

import { useEffect, useState } from 'react';

interface CircularRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showLabel?: boolean;
  label?: string;
  fontSize?: number;
}

export default function CircularRing({
  value,
  size = 80,
  strokeWidth = 8,
  color = '#4F8CFF',
  trackColor,
  showLabel = true,
  label,
  fontSize = 14,
}: CircularRingProps) {
  const [animated, setAnimated] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(value), 150);
    return () => clearTimeout(timer);
  }, [value]);

  const track = trackColor ?? 'rgba(148,163,184,0.2)';

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={track}
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
      />
      {/* Label */}
      {showLabel && (
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            transform: `rotate(90deg) translate(0, -${size}px)`,
            transformOrigin: `${size / 2}px ${size / 2}px`,
            fill: 'var(--text-primary)',
            fontSize: `${fontSize}px`,
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 500,
          }}
        >
          {label ?? `${Math.round(value)}%`}
        </text>
      )}
    </svg>
  );
}
