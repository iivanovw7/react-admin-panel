import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import {signInAction, signOutAction, fetchUsers} from '../../actions/index';
import {connect} from 'react-redux';
import { Header } from '../../components/UI/Header';
import ListsContainer from '../../components/Users/Users_lists_container';
import Sidebar from '../../components/UI/Sidebar';


class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {

      superuser: null,

      //types of lists to render
      listTypes: [
        {'type':'Администраторы'},
        {'type':'Пользователи'}
      ],

      //cols in each list
      userListCols: [
        'Имя',
        'Почта',
        'Админ'
      ]

    };
  }


  componentDidMount() {

    //sets current user access right and fetches users list
    this.setState({
      superuser: localStorage.getItem('userType')
    }, () => this.props.fetchUsers());

  }


  //logout function
  handleLogout = () => {
    this.props.signOutAction();
  };

  //displays loader image if there is no users to display
  displayLoader = () => {
    return (
      <div className={'loaderWrapper'}>
        <div id="loading" className={'spinner'}></div>
        <div>Загрузка...</div>
      </div>
    )
  };




  render() {

    return (

      <div>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>Admin page and sample login form Application</title>
          <link rel="canonical" href=""/>
        </Helmet>
        <Header
          title={'Пользователи'}
          handleLogout={this.handleLogout}
          icon={'list_alt'}
        />
        <div className="wrapper--fluid">
          <div className="wrapper__row">
            <Sidebar/>
            <div className="wrapper__col-xs-12 wrapper__col-lg-9 higher content_wrapper">
              {
                !this.props.users[0]
                  ?
                  this.displayLoader()
                  :
                  <ListsContainer
                    listTypes={this.state.listTypes}
                    superuser={this.state.superuser}
                    users={this.props.users}
                    userListCols={this.state.userListCols}
                  />
              }
            </div>
          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    users: state.users
  };
}


export default connect(mapStateToProps, {signInAction, signOutAction, fetchUsers})(Users);




