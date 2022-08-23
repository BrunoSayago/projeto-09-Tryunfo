import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: '',
    cardTrunfo: false,
  };

  handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  verificaAttr = (attr1, attr2, attr3) => {
    const a1 = parseInt(attr1, 10);
    const a2 = parseInt(attr2, 10);
    const a3 = parseInt(attr3, 10);
    const limitInd = 90;
    const condA1 = (limitInd >= a1 && a1 >= 0);
    const condA2 = (limitInd >= a2 && a2 >= 0);
    const condA3 = (limitInd >= a3 && a3 >= 0);
    const limitTot = 210;
    return (condA1
      && condA2 && condA3 && (a1 + a2 + a3) <= limitTot);
  };

  verificaStrings = (name, description, image, rarity) => (name !== ''
    && description !== '' && image !== '' && rarity !== '');

  verificaBotaoSalvar = (bool1, bool2) => bool1 && bool2;

  vaidom = () => 2;

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const bool1 = this.verificaStrings(cardName, cardDescription, cardImage, cardRare);

    const bool2 = this.verificaAttr(cardAttr1, cardAttr2, cardAttr3);

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          //   hasTrunfo,
          isSaveButtonDisabled={ !this.verificaBotaoSalvar(bool1, bool2) }
          onInputChange={ this.handleChange }
          onSaveButtonClick={ this.vaidom }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
      </div>
    );
  }
}

export default App;
