import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SiteHeader () {
  return (
    <header className="SiteHeader">
      <NavLink to="/">Digital Collections @ Lafayette College</NavLink>
    </header>
  )
}
