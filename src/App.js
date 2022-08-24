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
    hasTrunfo: false,
    cardsSaved: [],
    inputFilter: '',
  };

  // verificaHasTrunfo = () => {
  //   const { cardsSaved } = this.state;
  //   return (cardsSaved.some((elemento) => elemento.cardTrunfo === true));
  // };

  // setHasTrunfo = () => {
  //   const { cardsSaved } = this.state;
  //   if (cardsSaved.length > 0 && this.verificaHasTrunfo()) {
  //     this.setState({ hasTrunfo: true });
  //   }
  // };

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

  resetInfo = () => {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
    });
  };

  excluiCarta = (event) => {
    const { target } = event;
    const carta = target.parentElement;
    const filhos = carta.children;
    if (filhos[7].className === 'temTrunfo') {
      this.setState({ hasTrunfo: false });
    }
    carta.remove();
  };

  salvaCarta = (objCarta) => {
    const { cardsSaved: cartasSalvas } = this.state;
    this.setState({ cardsSaved: [...cartasSalvas, objCarta] });
    if (objCarta.cardTrunfo === true) {
      this.setState({ hasTrunfo: true });
    }
    this.resetInfo();
  };

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
      hasTrunfo,
      cardsSaved,
      inputFilter,
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
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ !this.verificaBotaoSalvar(bool1, bool2) }
          onInputChange={ this.handleChange }
          onSaveButtonClick={ this.salvaCarta }
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
        <label htmlFor="filtro-input">
          Filtro por nome:
          <input
            type="text"
            name="inputFilter"
            id="filtro-input"
            data-testid="name-filter"
            onChange={ this.handleChange }
          />
        </label>
        <ul id="cards-salvos">
          {
            cardsSaved
              .filter((card) => card.cardName.includes(inputFilter))
              .map((card) => (
                <li key={ card.cardName }>
                  <h2>{card.cardName}</h2>
                  <img src={ card.cardImage } alt={ card.cardName } />
                  <p>{card.cardDescription}</p>
                  <p>{card.cardAttr1}</p>
                  <p>{card.cardAttr2}</p>
                  <p>{card.cardAttr3}</p>
                  <p>{card.cardRare}</p>
                  {
                    card.cardTrunfo && <p className="temTrunfo">Super Trunfo</p>
                  }
                  <button
                    type="button"
                    onClick={ this.excluiCarta }
                    data-testid="delete-button"
                  >
                    Exluir
                  </button>
                </li>
              ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
