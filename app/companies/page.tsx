'use client';

import React from 'react';

export default function CompaniesPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>eVTOL 公司列表</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-xl font-semibold'>Joby Aviation</h2>
          <p className='text-gray-600'>美国加州圣克鲁兹</p>
          <p className='text-gray-700 mt-2'>专注于开发电动垂直起降飞行器。</p>
        </div>
      </div>
    </div>
  );
}
