import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import {signInAction, signOutAction} from '../../actions/index';
import {connect} from 'react-redux';
import { Header } from '../../components/UI/Header';
import Sidebar from '../../components/UI/Sidebar';
import {ProfileElement} from '../../components/Profile/Profile_element';
import {ProfileInformation} from '../../components/Profile/Profile_information'



class Profile extends Component {


  constructor(props) {
    super(props);

    this.state = {

      superuser: null,
      token: null,
      name: '',
      email: '',

    };
  }



  componentWillMount() {


    this.setState({
      superuser: localStorage.getItem('userType'),
      token: localStorage.getItem('user'),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email')
    });

  }




  handleLogout = () => {
    this.props.signOutAction();
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
          title={'Страница профиля'}
          handleLogout={this.handleLogout}
          icon={'account_circle'}
          name={this.state.name}
        />
        <div className="wrapper--fluid">
          <div className="wrapper__row">
            <Sidebar/>
            <div className="wrapper__col-xs-12 wrapper__col-lg-9 higher content_wrapper">
              <div className="wrapper__row nested">
                <div className="wrapper__col-xs-12 wrapper__col-sm-4 child higher">
                  <ProfileInformation />
                </div>
                <div className="wrapper__col-xs-12 wrapper__col-sm-4 child higher">
                  <ProfileElement title={'Элемент 2'}/>
                </div>
                <div className="wrapper__col-xs-12 wrapper__col-sm-4 child higher">
                  <ProfileElement title={'Элемент 3'}/>
                </div>
                <div className="wrapper__col-xs-12 wrapper__col-sm-6 child higher">
                  <ProfileElement title={'Элемент 4'}/>
                </div>
                <div className="wrapper__col-xs-12 wrapper__col-sm-6 child higher">
                  <ProfileElement title={'Элемент 5'}/>
                </div>
                <div className="wrapper__col-xs-12 wrapper__col-sm-12 child higher">
                  <ProfileElement title={'Элемент 6'}/>
                </div>
              </div>
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

  };
}

export default connect(mapStateToProps, {signInAction, signOutAction})(Profile);





