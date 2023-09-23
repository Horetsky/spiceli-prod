"use client"

import { FC } from 'react'
import { useState } from 'react';
import { Button } from '../ui/button';
import { FullCategory } from '@/types/types';

import ProductGrid from '../layouts/ProductGrid';
import ProductCard from '../cards/ProductCard';

interface TabsProps {
  tabs: FullCategory[],
}

const Tabs: FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <> 
      <div className='tabs md:container pb-4 md:pb-6'>
          {
              tabs.map(tab => (
                      <Button 
                          key={tab.id} 
                          onClick={() => setActiveTab(tab.id)}
                          className='text-xs h-9 font-sofia md:text-sm md:h-11'
                          variant={activeTab === tab.id ? "accent" : "outline"} size="tab"
                      >
                          {tab.name}
                      </Button>
              ))
          }
      </div>
      <ProductGrid>
        {
          tabs.find(tab => tab.id === activeTab)?.products.map(item => (
            <ProductCard
              product={item}
            />
          ))
        }
      </ProductGrid>
    </>
  )
}


export default Tabs