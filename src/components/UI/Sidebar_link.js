import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

//returns navigation menu element
export const SidebarLink = (props) => {


  return (
    <NavLink
      className={'default_button navbar_item secondary'}
      to={props.link}
      activeClassName="selected"
      activeStyle={{
        fontWeight: "bold",
        color: "red"
      }}
    >
      {props.name}
    </NavLink>
  )
};