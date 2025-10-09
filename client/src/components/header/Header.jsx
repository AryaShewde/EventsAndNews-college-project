import React from 'react'
import "./header.css"

const Header = () => {
  return (
    <>
      <div className='header'>
        <div className="headerTitles">
          <span className='headerTitleSm'>Events & News</span>
          <span className='headerTitleLg'>Blog</span>
        </div>
        <img className='headerImg' src="https://i.pinimg.com/originals/f6/42/cd/f642cdffdac25be276ed241ac0218f89.jpg" alt="" />
      </div>
    </>
  )
}

export default Header
