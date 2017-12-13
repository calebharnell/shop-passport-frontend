import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import Products from './components/Products';
import RegisterForm from './components/RegisterForm';
import Header from './components/Header'
import { setJwt } from './api/init';
import { Button } from 'reactbulma';
import './App.css';

class App extends Component {
  state = {
    loggedIn: null,
    register: false
  }

  toggleRegister = () => {
    this.setState({
      register: !this.state.register
    })
  }

  handleLoginResponse = (response) => {
    this.setState({
      loggedIn: response.data.token
    })
  }

  render() {

    let appDisplay = null
    if (!this.state.loggedIn && !this.state.register) {
      appDisplay =  <div>
                      <Header value='Log In'/>
                      <LoginForm handleLoginResponse={this.handleLoginResponse} />
                      <Button onClick={this.toggleRegister}>Register</Button>
                    </div>
    } else if (this.state.register) {
      appDisplay =  <div>
                      <Header value='Register'/>
                      <RegisterForm handleLoginResponse={this.handleLoginResponse}/>
                      <Button onClick={this.toggleRegister}>Log In</Button>
                    </div>
    } else {
      appDisplay =  <div>
                      <Header value='Products'/>
                      <Products token={this.state.loggedIn}/>
                    </div>
    }

    return (
      <div className="App">
        {appDisplay}
      </div>
    );
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    token && setJwt(token)
    this.setState({
      loggedIn: token
    })
  }
}

export default App;
