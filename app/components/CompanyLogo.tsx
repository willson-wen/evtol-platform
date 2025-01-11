'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CompanyLogoProps {
  name: string;
  src: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
};

export default function CompanyLogo({ name, src, size = 'md' }: CompanyLogoProps) {
  const [error, setError] = useState(false);
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  if (error) {
    return (
      <div className={`${sizeMap[size]} bg-blue-100 rounded-lg flex items-center justify-center`}>
        <span className="text-blue-600 font-semibold text-lg">{initials}</span>
      </div>
    );
  }

  return (
    <div className={`${sizeMap[size]} relative`}>
      <Image
        src={src}
        alt={name}
        layout="fill"
        objectFit="contain"
        className="rounded-lg"
        onError={() => setError(true)}
      />
    </div>
  );
} 