import React, { Component } from 'react';
import { api } from '../api/init';
import '../App.css';
import { Notification } from 'reactbulma';
import CreateProduct from './CreateProduct'

class Products extends Component {
  constructor(props){
    super(props)
    this.state = {
    	products: []
    }
  }

  handleCreateResponse = (response) => {
    console.log(response.data)
    this.setState({
      products: [...this.state.products, response.data]
    })
  }

  render() {
    return (
      <div>
      {this.state.products.map((product) => <Notification primary key={product._id}>
      																				<p>{product.name} {product.brandName}</p>
      																			</Notification>)}
      <CreateProduct handleCreateResponse={this.handleCreateResponse}/>
      </div>
    )
  }

  componentDidMount(){
  	api.get('/products')
  		.then((response) => {
  			this.setState({
  				products: response.data
  			})
  		})
  		.catch((error) => {
  			console.log('An error occured retrieving products.', error)
  		})
  }
}

export default Products;
