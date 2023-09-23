"use client"

import { FC } from 'react'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import BlogGrid from '@/components/layouts/BlogGrid';

import All from './All';
import Video from './Video';
import Article from './Article';
import { $Enums, Post } from '@prisma/client';

interface TabsProps {
  posts: Post[]
}

enum ActiveTab {
  all =  "all",
  video = "video",
  article = "article"
}

type activeTabType = keyof typeof ActiveTab

interface TabsData {
  id: activeTabType;
  title: string;
}

const tabs: TabsData[] = [
  {id: ActiveTab.all, title: "Усе"},
  {id: ActiveTab.video, title: "Відео"},
  {id: ActiveTab.article, title: "Статті"}
]

const Tabs: FC<TabsProps> = ({ posts }) => {
  const [activeTab, setActiveTab] = useState<activeTabType>(ActiveTab.all);

  function renderTabs (activeTab: activeTabType): React.ReactNode {
    switch (activeTab) {
        case ActiveTab.all:
            return <All data={posts} />
        case ActiveTab.video:
            return <Video data={posts.filter(item => item.type === $Enums.PostType.video)} />
        case ActiveTab.article:
            return <Article data={posts.filter(item => item.type === $Enums.PostType.article)} />
        default:
            return <All data={posts} />
    }
  }

  const viewTab = renderTabs(activeTab)

  return (
    <div>
      <div className='tabs md:container pb-4 md:pb-6'>
          {
              tabs.map((tab) => (
                      <Button 
                          onClick={() => setActiveTab(tab.id)}
                          className='text-xs h-9 font-sofia md:text-sm md:h-11'
                          key={tab.id} 
                          variant={activeTab === tab.id ? "accent" : "outline"} size="tab"
                      >
                          {tab.title}
                      </Button>
              ))
          }
      </div>
      
      { viewTab }

    </div>
  )
}


export default Tabs