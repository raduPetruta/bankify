import TotalBalanceBox from '@/components/TotalBalanceBox'
import HeaderBox from '@/components/HeaderBox'
import { title } from 'process'
import React from 'react'
import RightSidebar from '@/components/RightSidebar'

const Home = () => {

  const loggedInUser = {firstName : "Radu", lastName:"Petruta", title:"Welcome,", type: "greeting", email:"radupetruta@gmail.com", subtext: "Access and manage your account efficiently!"}  

  return (
    <section className='home'>
        <div className="home-content">
            <header className='home-header'>
                <HeaderBox type={loggedInUser.type} title={loggedInUser.title} user={loggedInUser?.firstName} subtext={loggedInUser.subtext}/>
                <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={2455.35}/>
            </header>
        </div>
        <RightSidebar user={loggedInUser} transactions={[]} banks={[{$id:"1", currentBalance:202}, {$id:"2", currentBalance:22552}]}/>
    </section>
  )
}

export default Home