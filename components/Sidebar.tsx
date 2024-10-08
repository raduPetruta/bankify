'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = ({user}:SiderbarProps) => {

  const pathname = usePathname();  

  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href="/" className='mb-12 cursor-pointer items-center gap-2 flex'> 
               <Image src="/icons/logo.svg" width={34} height={34} alt='logo' className='size-[24] max-xl:size-14'/>
               <h1 className="sidebar-logo"> Bankify </h1>
            </Link>
            {sidebarLinks.map((item) => {
                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);  
                return ( 
                    <Link href={item.route}  key={item.label} className={cn('sidebar-link', {'bg-bank-gradient': isActive})}>     {/* sa faci in nav in stanga pagina curenta colorata daca URL ul din array e acelasi cu url ul curent */}
                        <div className="relative size-6">
                           <Image src={item.imgURL} alt='link' fill className={cn({'brightness-[3] invert-0': isActive})}/>
                        </div>
                        <p className={cn('sidebar-label', {'!text-white':isActive})}>                                             {/* sa faci textul din link sa fie alta culoare cand e selectat */}
                            {item.label}
                        </p>
                    </Link> 
                )
            })}

            USER 
            
        </nav>

        FOOTER
    </section>
  )
}

export default Sidebar