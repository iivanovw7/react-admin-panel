import React, {Component} from 'react';
import {v1 as uuidv1} from 'uuid';


//returns single user element
export const User = (props) => {

  return (
    <tr className={'list_element'} key={uuidv1()}>
      <td key={uuidv1()} className={'ripple'}>{props.user.name}</td>
      <td key={uuidv1()} className={'ripple'}>{props.user.email}</td>
      <td key={uuidv1()} className={'ripple'}>
        {
          props.user.superuser
            ?
            <i className="material-icons">done</i>
            :
            <i className="material-icons">close</i>
        }
      </td>
    </tr>
  )
};


