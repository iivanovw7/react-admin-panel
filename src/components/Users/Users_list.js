import React, {Component} from 'react';
import {v1 as uuidv1} from 'uuid';
import {User} from './Users_list_element';

export default class UsersList extends Component {

  //checks if user has root access
  checkAccess = () => localStorage.getItem('userType') === 'true';


  //filters user list according to access, returns array of objects
  filterList = (list, access) => {

    let filteredList = [];

    function checkIfRoot(object) {
      if (object.superuser === access) {
        filteredList.push(object)
      }
    }

    Object.keys(list).map((key, i) => (
      checkIfRoot(list[i])
    ));

    return (
      filteredList
    )

  };


  //renders list of users, if its root users, then checks userType
  renderList = (users, rootList) => {

    let list = (rootList ?
        this.filterList(users, true)
        :
        this.filterList(users, false)
    );

    return (
      <tbody>
      {Object.keys(list).map(
        (keyName, i) => (
        <User
          user={list[i]}
          key={uuidv1()}
        />
      ))}
      </tbody>
    )

  };

  //returns header elements
  renderHeader = (header) => {
    return (
      <th key={uuidv1()}>
        {header}
        </th>
    )
  };

  //checks user access rights before displaying table
  checkViewAccess = (users, headers, rootList) => {
    if (!this.checkAccess() && rootList) {

      return (
        <p style={{textAlign: 'center'}}>
          У вас недостаточно прав для просмотра данного списка
        </p>
      )

    } else {

      return (

        <table>
          <thead>
          <tr>
            {headers.map(x => {
              return this.renderHeader(x)
            })}
          </tr>
          </thead>
          {this.renderList(users, rootList)}
        </table>

      )
    }
  };


  render() {

    //list of users
    let users = this.props.params.list;

    //check if it is a list of administrators
    let rootList = this.props.params.title === 'Администраторы';

    //get list of headers for current list
    let headers = this.props.params.headers;

    return (

      <div className={'list'}>
        <h2>
          {this.props.params.title}
        </h2>
        {this.checkViewAccess(users, headers, rootList)}
      </div>
    )
  }

}



