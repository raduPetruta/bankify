import TotalBalanceBox from '@/components/TotalBalanceBox'
import HeaderBox from '@/components/HeaderBox'
import { title } from 'process'
import React from 'react'

const Home = () => {

  const loggedInUser = {firstName : "Radu", title:"Welcome,", type: "greeting", subtext: "Access and manage your account efficiently!"}  

  return (
    <section className='home'>
        <div className="home-content">
            <header className='home-header'>
                <HeaderBox type={loggedInUser.type} title={loggedInUser.title} user={loggedInUser?.firstName} subtext={loggedInUser.subtext}/>
                <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={2455.35}/>
            </header>
        </div>
    </section>
  )
}

export default Home