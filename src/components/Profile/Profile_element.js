import React, { Component } from 'react';


//example of one of profile page blocks
export const ProfileElement = (props) => {


  return (
    <div className={'profile'}>
      <h4>{props.title}</h4>
    </div>
  )
};