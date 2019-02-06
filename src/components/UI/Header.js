import React, {Component} from 'react';


export const Header = (props) => {

  console.log(localStorage.getItem('name'));

  return (
    <div className={'header'}>
      <div>
        <i className="material-icons resizing">{props.icon}</i>
      </div>
      <div className={'title'}>
        <h3>{props.title}</h3>
      </div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <span style={{marginRight: '10px'}}>
          {localStorage.getItem('name')}
          </span>
        <button
          className={'header_button primary ripple'}
          onClick={() => {props.handleLogout()}}>Выйти</button>
      </div>
    </div>
  )

};