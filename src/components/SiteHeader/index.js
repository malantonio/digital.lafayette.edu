import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SiteHeader (props) {
  return (
    <header className="SiteHeader">
      <NavLink to="/">Digital Collections @ Lafayette College</NavLink>
    </header>
  )
}
