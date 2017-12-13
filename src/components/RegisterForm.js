import React, { Component} from 'react';
import { Control, Level, Button, Input} from 'reactbulma';
import { api, setJwt } from '../api/init';
import '../App.css';

class RegisterForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstNameValue: '',
      lastNameValue: '',
      emailValue: '',
      passwordValue: '',
      passwordConfirmValue: ''
    }
  }

  handleRegisterChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRegisterSubmit = (event) => {
    event.preventDefault();
    if (this.state.passwordValue === this.state.passwordConfirmValue) {
      api.post('/auth/register', {
        firstName: this.state.firstNameValue,
        lastName: this.state.lastNameValue,
        email: this.state.emailValue,
        password: this.state.passwordValue,
      })
      .then((response) => {
        setJwt(response.data.token)
        this.props.handleLoginResponse(response)
      })
      .catch((error) => {
        console.log('An error occured when trying to register.', error)
      })
    } else {
      alert('Password fields are not the same')
    }

  }

  render() {
    return (
      <Level>
        <Control>
          <form onSubmit={this.handleRegisterSubmit}>
            <Input name="firstNameValue"
                  value={this.state.firstNameValue}
                  onChange={this.handleRegisterChange}
                  type="text"
                  placeholder="First Name" />
            <Input name="lastNameValue"
                  value={this.state.lastNameValue}
                  onChange={this.handleRegisterChange}
                  type="text"
                  placeholder="Last Name" />
            <Input name="emailValue"
                  value={this.state.emailValue}
                  onChange={this.handleRegisterChange}
                  type="text"
                  placeholder="Email" />
            <Input name="passwordValue"
                  value={this.state.passwordNameValue}
                  onChange={this.handleRegisterChange}
                  type="password"
                  placeholder="Password" />
            <Input name="passwordConfirmValue"
                  value={this.state.passwordConfirmValue}
                  onChange={this.handleRegisterChange}
                  type="password"
                  placeholder="Password" />
            <Button>Register</Button>
          </form>
        </Control>
      </Level>
    )
  }
}

export default RegisterForm;
