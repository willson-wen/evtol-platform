'use client';

import React from 'react';

const manufacturers = [{id:'1',name:'Joby Aviation',location:'美国加州圣克鲁兹',description:'专注于开发电动垂直起降飞行器。',employeeCount:'1000+',foundedYear:2009},{id:'2',name:'Lilium',location:'德国慕尼黑',description:'开发全电动垂直起降喷气式飞机。',employeeCount:'750+',foundedYear:2015},{id:'3',name:'Ehang',location:'中国广州',description:'自主研发自动驾驶飞行器。',employeeCount:'500+',foundedYear:2014}];

export default function ManufacturersPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>eVTOL 制造商</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {manufacturers.map(m => (
          <div key={m.id} className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-semibold mb-2'>{m.name}</h2>
            <p className='text-gray-600 mb-2'>{m.location}</p>
            <p className='text-gray-700 mb-4'>{m.description}</p>
            <div className='text-sm'>
              <div className='mb-1'><span className='text-gray-500'>成立年份：</span> {m.foundedYear}</div>
              <div><span className='text-gray-500'>员工规模：</span> {m.employeeCount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
