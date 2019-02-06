import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signInAction, handleVKLogin } from '../actions/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import VK_icon from '../components/UI/images/vk-social-network-logo.svg'


class Signin extends Component {


  constructor(props) {
    super(props);

    this.state = {
      VK_apiId: ''
    };

  }

  static contextTypes = {
    router: PropTypes.object
  };

  //submitting form data
  submit = (formValues) => {
    this.props.signInAction(formValues, this.props.history);
  };

  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <div style={{color: 'red', margin: '10px'}}>
          {this.props.errorMessage}
        </div>
      );
    }
  }

  //setting up redirect to registration form
  redirectToTarget = () => {
    this.context.router.history.push(`/signup`)
  };


  VKinit(key) {
    return (
      VK.init({
        apiId: key
      })
    )
  }

  componentWillMount() {

    //get VK application ID from backend
    this.getVK_apiId()
      .then(res => this.setState({
        VK_apiId: res.express
      }, () => {
        //if got key
        this.VKinit(
          this.state.VK_apiId
        )
      }))
      .catch(err => console.log(err));
  }

  //gets vk app key from server
  getVK_apiId = async () => {
    const response = await fetch('/api/VK_apiId');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };




  render() {

    const {fields: {email, password}, handleSubmit} = this.props;



    return (

        <div className={'popup'}>
            <form onSubmit={handleSubmit(this.submit)}>
              <h2>Войти в учётную запись</h2>
              <Field name="email"
                     component="input"
                     type="email"
                     placeholder="Почта"
                     {...email}
              />
              <Field name="password"
                     component="input"
                     type="password"
                     placeholder="Пароль"
                     {...password}
              />
              {this.errorMessage()}
              <button type="submit" className={'popup_button primary ripple'}>Войти</button>
              <button onClick={this.redirectToTarget} className={'popup_button primary ripple'}>Зарегистрироваться</button>
          </form>
          <VK_icon className={'social_login_button secondary ripple'} onClick={() => {this.props.handleVKLogin(this.props.history)}}/>
        </div>

    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}


const reduxFormSignin = reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Signin);

export default connect(mapStateToProps, {signInAction, handleVKLogin})(reduxFormSignin);

