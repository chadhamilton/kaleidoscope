'use client';

import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizes = {
    sm: { height: 24 },
    md: { height: 32 },
    lg: { height: 44 },
    xl: { height: 56 },
  };

  const { height } = sizes[size];
  // Logo aspect ratio is approximately 5:1
  const width = height * 5;

  return (
    <div className="flex items-center">
      <Image
        src="/images/logo.png"
        alt="Kaleidoscope Concepts"
        width={width}
        height={height}
        priority
      />
    </div>
  );
}
