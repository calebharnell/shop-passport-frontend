import React, { Component } from 'react';
import { Control, Level, Button, Input} from 'reactbulma';
import { api } from '../api/init';
import '../App.css';

class CreateProduct extends Component {
  constructor(props){
    super(props)
    this.state = {
      brandNameValue: '',
      nameValue: ''
    }
  }

  handleProductInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleProductSubmit = (event) => {
    event.preventDefault();
      api.post('/products', {
        brandName: this.state.brandNameValue,
        name: this.state.nameValue
      })
      .then((response) => {
        this.props.handleCreateResponse(response)
        this.setState({
          brandNameValue: '',
          nameValue: ''
        })
        // setJwt(response.data.token)
        // this.props.handleLoginResponse(response)
      })
      .catch((error) => {
        console.log('An error occured when trying to create a new product', error)
      })
  }

  render() {
    return (
      <Level>
        <Control>
          <form onSubmit={this.handleProductSubmit}>
            <Input type="text"
              placeholder="Product Brand Name"
              name="brandNameValue"
              onChange={this.handleProductInputChange}
              value={this.state.emailValue} />
            <Input type="text"
              placeholder="Product Name"
              name="nameValue"
              onChange={this.handleProductInputChange}
              value={this.state.passwordValue} />
            <Button>Create Product</Button>
          </form>
        </Control>
      </Level>
    )
  }
}

export default CreateProduct;
