import React, {Component} from 'react';
import UsersList from './Users_list';
import {v1 as uuidv1} from 'uuid';

export default class ListsContainer extends Component {


  //iterates through possible list types
  //and creates lists
  mapList = (lists,
             superuser,
             users,
             columns) => {
    return (
      lists.map(n =>
        this.createList(
          n.type,
          superuser,
          users,
          columns
        )
      )
    )
  };


  //returns list component
  createList = (title, access, list, headers) => {
    return (
      <div key={uuidv1()} className="wrapper__col-xs-12 wrapper__col-sm-12 child list higher">
        <UsersList
          key={uuidv1()}
          params={
            {
              title,
              access,
              list,
              headers
            }
          }
        />
      </div>
    )
  };


  render() {

    return (

      <div className="wrapper__row nested">
        {
          this.mapList
          (
            this.props.listTypes,
            this.props.superuser,
            this.props.users[0],
            this.props.userListCols
          )
        }
      </div>

    );
  }
}
