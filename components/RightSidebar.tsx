import { Key } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BankCard from './BankCard'

const RightSidebar = ({user, transactions, banks}: RightSidebarProps) => {
  return (
    <aside className='right-sidebar'>

      {/*Section for user credentials*/ } 
      <section className='flex flex-col pb-8'>
      <div className="profile-banner"></div>
      <div className="profile">
        
        {/*Profile Img and Name*/ }
        <div className="profile-img">
          <span className='text-5xl font-bold text-blue-500'>{user.firstName?.toString().at(0)}</span>
        </div>

        {/*Profile details*/ }
        <div className="profile-details">
          <h1 className='profile-name'>
            {user.firstName} {" "} {user.lastName}
          </h1>
          <p className='profile-email'>
            {user.email}
          </p>
        </div>
      </div>
      </section>

      {/*Section for user's bank accounts*/}
      <section className='banks'>
        <div className="flex w-full justify-between">
          <h2 className='header-2'>Bank accounts</h2>

          <Link href="/" className='flex gap-2'>
            <Image src="/icons/plus.svg" alt='plus' width={20} height={20}/> 
            <h2 className='text-14 font-semibold text-grey-600'>
              Add Account
            </h2>
          </Link>
        </div>

                              
        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            {banks.map((bank) => (
              <div className='relative z-10' key={bank.$id}>
                <BankCard 
                  account={bank}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            ))}
          </div>
        )}
      </section>

    </aside>
  )
}

export default RightSidebar