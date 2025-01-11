'use client';

import { useState } from 'react';
import CompanyLogo from '@/app/components/CompanyLogo';

// 定义类型
type SpecKey = 'range' | 'maxSpeed' | 'cruiseSpeed' | 'capacity' | 'maxPayload' | 
  'noise' | 'wingspan' | 'height' | 'powerType' | 'batteryType' | 'chargingTime' | 
  'propellers' | 'certification' | 'flightTime';

type ProductSpecs = {
  [K in SpecKey]: string;
};

type Product = {
  id: number;
  name: string;
  company: string;
  companyLogo: string;
  specs: ProductSpecs;
};

type SpecCategory = {
  title: string;
  items: SpecKey[];
  labels: {
    [K in SpecKey]?: string;
  };
};

type SpecCategories = {
  [key: string]: SpecCategory;
};

// 模拟数据
const products: Product[] = [
  {
    id: 1,
    name: 'Joby S4',
    company: 'Joby Aviation',
    companyLogo: '/images/joby.png',
    specs: {
      range: '150英里',
      maxSpeed: '200mph',
      cruiseSpeed: '175mph',
      capacity: '4名乘客 + 1名飞行员',
      maxPayload: '450kg',
      noise: '65分贝@100米',
      wingspan: '12米',
      height: '4米',
      powerType: '电动',
      batteryType: '锂离子电池',
      chargingTime: '45分钟',
      propellers: '6个倾转旋翼',
      certification: 'FAA认证进行中',
      flightTime: '45分钟',
    },
  },
  {
    id: 2,
    name: 'Lilium Jet',
    company: 'Lilium',
    companyLogo: '/images/lilium.png',
    specs: {
      range: '155英里',
      maxSpeed: '175mph',
      cruiseSpeed: '160mph',
      capacity: '6名乘客 + 1名飞行员',
      maxPayload: '600kg',
      noise: '60分贝@100米',
      wingspan: '14米',
      height: '4.5米',
      powerType: '电动',
      batteryType: '锂离子电池',
      chargingTime: '60分钟',
      propellers: '36个喷气式电动风扇',
      certification: 'EASA认证进行中',
      flightTime: '60分钟',
    },
  },
  {
    id: 3,
    name: 'EH216',
    company: 'EHang',
    companyLogo: '/images/ehang.png',
    specs: {
      range: '22英里',
      maxSpeed: '80mph',
      cruiseSpeed: '60mph',
      capacity: '2名乘客',
      maxPayload: '220kg',
      noise: '55分贝@100米',
      wingspan: '5.6米',
      height: '1.8米',
      powerType: '电动',
      batteryType: '锂离子电池',
      chargingTime: '90分钟',
      propellers: '16个独立旋翼',
      certification: '已获CAAC认证',
      flightTime: '25分钟',
    },
  },
];

// 规格类别
const specCategories: SpecCategories = {
  performance: {
    title: '性能参数',
    items: ['range', 'maxSpeed', 'cruiseSpeed', 'flightTime'],
    labels: {
      range: '航程',
      maxSpeed: '最大速度',
      cruiseSpeed: '巡航速度',
      flightTime: '飞行时间',
    },
  },
  capacity: {
    title: '载重参数',
    items: ['capacity', 'maxPayload'],
    labels: {
      capacity: '载客量',
      maxPayload: '最大载重',
    },
  },
  physical: {
    title: '物理参数',
    items: ['wingspan', 'height', 'noise'],
    labels: {
      wingspan: '翼展',
      height: '高度',
      noise: '噪音水平',
    },
  },
  technical: {
    title: '技术参数',
    items: ['powerType', 'batteryType', 'chargingTime', 'propellers', 'certification'],
    labels: {
      powerType: '动力类型',
      batteryType: '电池类型',
      chargingTime: '充电时间',
      propellers: '推进系统',
      certification: '认证状态',
    },
  },
};

export default function SpecsPage() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([1, 2]); // 默认选中前两个产品

  const handleProductToggle = (productId: number) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else if (prev.length < 3) { // 最多同时比较3个产品
        return [...prev, productId];
      }
      return prev;
    });
  };

  const filteredProducts = products.filter(product => selectedProducts.includes(product.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">eVTOL技术参数对比</h1>

        {/* 产品选择器 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">选择要比较的产品（最多3个）</h2>
          <div className="flex flex-wrap gap-4">
            {products.map(product => (
              <button
                key={product.id}
                onClick={() => handleProductToggle(product.id)}
                className={`flex items-center px-4 py-2 rounded-lg border ${
                  selectedProducts.includes(product.id)
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <div className="w-8 h-8 relative mr-2">
                  <CompanyLogo name={product.company} src={product.companyLogo} size="sm" />
                </div>
                <span className="font-medium">{product.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 参数对比表格 */}
        {Object.entries(specCategories).map(([category, { title, items, labels }]) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-1/4">参数</th>
                    {filteredProducts.map(product => (
                      <th key={product.id} className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                        <div className="flex items-center">
                          <div className="w-8 h-8 relative mr-2">
                            <CompanyLogo name={product.company} src={product.companyLogo} size="sm" />
                          </div>
                          {product.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map(item => (
                    <tr key={item} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {labels[item]}
                      </td>
                      {filteredProducts.map(product => (
                        <td key={product.id} className="px-6 py-4 text-sm text-gray-500">
                          {product.specs[item]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 