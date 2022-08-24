import React from 'react';
import './App.css';
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
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    cardsSaved: [],
    inputFilter: '',
    selectFilter: 'todas',
    trunfoFilter: false,
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

  resetInfo = () => {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
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
      selectFilter,
      trunfoFilter,
    } = this.state;

    const bool1 = this.verificaStrings(cardName, cardDescription, cardImage, cardRare);

    const bool2 = this.verificaAttr(cardAttr1, cardAttr2, cardAttr3);

    return (
      <div>
        <section className="first-section">
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
        </section>

        <label htmlFor="filtro-input">
          Filtro por nome:
          <input
            type="text"
            name="inputFilter"
            id="filtro-input"
            data-testid="name-filter"
            disabled={ trunfoFilter }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="rare-filter">
          Filtro por raridade:
          <select
            name="selectFilter"
            data-testid="rare-filter"
            id="rare-filter"
            disabled={ trunfoFilter }
            onChange={ this.handleChange }
          >
            <option>todas</option>
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>

        <label htmlFor="trunfo-filter">
          Filtro por Trunfo:
          <input
            type="checkbox"
            name="trunfoFilter"
            data-testid="trunfo-filter"
            id="trunfo-filter"
            onChange={ this.handleChange }
          />
        </label>

        <ul id="cards-salvos">
          {
            cardsSaved
              .filter((card) => card.cardName.includes(inputFilter))
              .filter((card) => {
                if (selectFilter !== 'todas') {
                  return (card.cardRare === selectFilter);
                }
                return true;
              })
              .filter((card) => {
                if (trunfoFilter) {
                  return card.cardTrunfo === trunfoFilter;
                }
                return true;
              })
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
