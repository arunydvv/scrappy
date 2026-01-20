import BreadCrumbHeader from '@/components/BreadCrumbHeader'
import DesktopSidebar from '@/components/Sidebar'
import { ModeToggle } from '@/components/ThemeModeToggle'
import { Separator } from '@radix-ui/react-separator'
import React from 'react'


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen">
            <DesktopSidebar/>
            
            <div className="flex flex-col flex-1 min-h-screen">
                <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
                    <BreadCrumbHeader />
                    <div className='gap-1 flex items-center'>
                        <ModeToggle/>
                    </div>
                </header>

                <Separator
                    orientation="horizontal"
                    className="h-px w-full bg-gray-300"
                />

                <div className='overflow-auto '>
                    <div className='flex-1 container py-4 text-accent-foreground'>
                        {children }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default layout
