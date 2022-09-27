import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }


  handleNameChange = event => {
    event.preventDefault()
    this.setState( {name: event.target.value} )
  }

  handleIngredientChange = event => {
    event.preventDefault()
    this.setState({ingredients: [...this.state.ingredients, event.target.name] })
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.name && this.state.ingredients.length) {
        const newOrder = {
        ...this.state
      }
      this.props.postOrder(newOrder);
    }

    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={event => this.handleIngredientChange(event)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={event => this.handleNameChange(event)}
        />

        { ingredientButtons }

        <p className='order-update'>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button name='submit' onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
