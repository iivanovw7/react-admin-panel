import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {signUpAction} from '../actions/index';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'


//values and properties needed for input form validation
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Поле обязательно!'
  } else if (values.name.length > 15) {
    errors.name = 'Не более пятнадцати символов!'
  } else if (values.name.length < 3) {
    errors.name = 'Не менее трех символов!'
  }
  if (!values.email) {
    errors.email = 'Поле обязательно'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Не верный формат почтового адреса!'
  }
  if (!values.password) {
    errors.password = 'Поле обязательно!'
  } else if (values.password > 15) {
    errors.password = 'Не более пятнадцати символов!'
  } else if (values.password < 3) {
    errors.password = 'Не менее трех символов!'
  }

  return errors
};


//rendering form input for form validation
const renderField = ({
                       input,
                       label,
                       type,
                       placeholder,
                       meta: {touched, error, warning}
                     }) => (
  <div style={{color: 'red'}}>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type}/>
      {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
    </div>
  </div>
);


class Signup extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  //handle form submit action
  submit = (formValues) => {
    this.props.signUpAction(formValues, this.props.history);
  };


  //display error message payload if it exists
  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <div style={{color: 'red', margin: '10px'}}>
          {this.props.errorMessage}
        </div>
      );
    }
  }

  //display success message payload if it exists
  successMessage() {
    if (this.props.successMessage) {
      return (
        <div
          style={
            this.props.successMessage.success ?
              {color: 'green', margin: '10px'}
              :
              {color: 'red', margin: '10px'}
          }
        >
          {this.props.successMessage.message}
        </div>
      );
    }
  }

  //create redirection to login form
  redirectToTarget = () => {
    this.context.router.history.push(`/signin`)
  };




  render() {



    const {fields: {email, password, name}, handleSubmit} = this.props;


    return (

      <div className={'popup'}>
        <form onSubmit={handleSubmit(this.submit)}>
          <h2>Создать учётную запись</h2>
          <Field name="name"
                 type="text"
                 placeholder="Имя"
                 component={renderField}
                 {...name}
          />
          <Field name="email"
                 component={renderField}
                 type="email"
                 placeholder="Почта"
                 {...email}
          />
          <Field name="password"
                 component={renderField}
                 type="password"
                 placeholder="Пароль"
                 {...password}
          />
          {this.errorMessage()}
          {this.successMessage()}
          <button onClick={this.redirectToTarget} className={'popup_button primary ripple'}>Войти</button>
          <button type="submit" className={'popup_button primary ripple'}>Зарегистрироваться</button>
        </form>
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    errorMessage: state.signup.error,
    successMessage: state.signup.success
  };
}


const reduxFormSignin = reduxForm({
  validate,
  form: 'signup',
  fields: ['email', 'password', 'name']
})(Signup);

export default connect(mapStateToProps, {signUpAction})(reduxFormSignin);