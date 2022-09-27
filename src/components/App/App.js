import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  postOrder = (newOrder) => {
    fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({name: newOrder.name, ingredients: newOrder.ingredients})
    })
    .then(response => response.json())
    .then(data => this.setState({orders: [...this.state.orders, data]}))
  }

  componentDidMount = () => {
    getOrders()
    .then(data => this.setState({orders: data.orders}))
    .catch(err => console.error('Error fetching:', err));
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm postOrder={this.postOrder}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
