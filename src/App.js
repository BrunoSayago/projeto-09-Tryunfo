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
    const li = target.parentElement;
    const carta = li.firstChild;
    const filhos = carta.children;
    const limitWithTrunfo = 8;
    if (filhos.length === limitWithTrunfo
      && filhos[7].className === 'temTrunfo card-lendario') {
      this.setState({ hasTrunfo: false });
    }
    li.remove();
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

        <h2 className="saved-title">Cards Salvos</h2>
        <section className="filter-section">
          <label htmlFor="filtro-input" className="filter-column filter-lab">
            <span className="name-filter">Filtro por nome:</span>
            <input
              type="text"
              name="inputFilter"
              id="filtro-input"
              data-testid="name-filter"
              disabled={ trunfoFilter }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="rare-filter" className="filter-column filter-lab">
            <span className="rare-filter">Filtro por raridade:</span>
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

          <label htmlFor="trunfo-filter" className="filter-lab trunfo-filt-lab">
            <span className="span-trunfo-filter">Filtro por Trunfo:</span>
            <input
              type="checkbox"
              name="trunfoFilter"
              data-testid="trunfo-filter"
              id="trunfo-filter"
              className="check-trunfo-filter"
              onChange={ this.handleChange }
            />
          </label>
        </section>

        <ul id="cards-salvos" className="card-container">
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
                <li className="li-cardlist" key={ card.cardName }>
                  <section className="card-in-card-list">
                    <h2 className="card-name">{card.cardName}</h2>
                    <img
                      className="img-card"
                      src={ card.cardImage }
                      alt={ card.cardName }
                    />
                    <span className="card-description">{card.cardDescription}</span>
                    <div className="attr-card-div attr-card-arcano">
                      <span className="span-attr-card">Arcano:</span>
                      <p>{card.cardAttr1}</p>
                    </div>

                    <div className="attr-card-div attr-card-forca">
                      <span className="span-attr-card">Força:</span>
                      <p>{card.cardAttr2}</p>
                    </div>

                    <div className="attr-card-div attr-card-destreza">
                      <span className="span-attr-card">Destreza:</span>
                      <p>{card.cardAttr3}</p>
                    </div>

                    <p className="card-rare">{card.cardRare}</p>
                    {
                      card.cardTrunfo
                      && <p className="temTrunfo card-lendario">Super Trunfo</p>
                    }
                  </section>

                  <button
                    className="delete-button"
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
