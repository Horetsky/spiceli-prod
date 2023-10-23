"use client"

import { FC } from 'react'

import { useState } from 'react';
import { FullProduct } from '@/types/types';
import { $Enums } from '@prisma/client'
import { Button } from '@/components/ui/button';

import AllSpices from './AllSpices';
import Mixes from './Mixes';
import Flavor from './Flavor';
import Supp from './Supp';

interface ProductTabsProps {
    products: FullProduct[]
}

type CategoryType = keyof typeof $Enums.ProductType
const tabButtonStyle = 'text-xs h-9 font-sofia md:text-sm md:h-11'

const ProductTabs: FC<ProductTabsProps> = ({ products }) => {
    const [activeTab, setActiveTab] = useState<CategoryType | null>(null)

    function renderTabs (activeTab: CategoryType | null): React.ReactNode {
        switch  (activeTab) {
            case null:
                return <AllSpices products={products} />
            case "mix":
                return <Mixes products={products} />
            case "flavor":
                return <Flavor products={products} />
            case "supp":
                return <Supp products={products} />
            default:
                return <AllSpices products={products} />
        }
    }

    const tabView = renderTabs(activeTab)

    return (
        <>
            <div className='tabs md:container pb-4 md:pb-6'>
                <Button 
                    onClick={() => setActiveTab(null)}
                    className={tabButtonStyle}
                    variant={activeTab === null ? "accent" : "outline"} size="tab"
                >
                   Всі 
                </Button>
                <Button 
                    onClick={() => setActiveTab("mix")}
                    className={tabButtonStyle}
                    variant={activeTab === "mix" ? "accent" : "outline"} size="tab"
                >
                   Суміші прянощів
                </Button>
                <Button 
                    onClick={() => setActiveTab("flavor")}
                    className={tabButtonStyle}
                    variant={activeTab === "flavor" ? "accent" : "outline"} size="tab"
                >
                   Прянощі
                </Button>
                <Button 
                    onClick={() => setActiveTab("supp")}
                    className={tabButtonStyle}
                    variant={activeTab === "supp" ? "accent" : "outline"} size="tab"
                >
                   Харчові добавки
                </Button>
            </div>

            {
                tabView
            }

        </>
    )
}

export default ProductTabs