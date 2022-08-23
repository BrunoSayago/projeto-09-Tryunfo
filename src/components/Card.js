import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      cardOnList,
      excluiCarta,
    } = this.props;

    const imprimeTrunfo = (trunfo) => {
      if (trunfo === true) {
        return (
          <p data-testid="trunfo-card" className="temTrunfo">Super Trunfo</p>
        );
      }
    };

    const buttonExluir = (
      <button
        type="button"
        onClick={ excluiCarta }
        data-testid="delete-button"
      >
        Exluir
      </button>
    );

    return (
      <div>
        <h2 data-testid="name-card">{cardName}</h2>
        <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        <p data-testid="description-card">{cardDescription}</p>
        <p data-testid="attr1-card">{cardAttr1}</p>
        <p data-testid="attr2-card">{cardAttr2}</p>
        <p data-testid="attr3-card">{cardAttr3}</p>
        <p data-testid="rare-card">{cardRare}</p>
        {imprimeTrunfo(cardTrunfo)}
        { cardOnList ? buttonExluir : <p className="previa">Prévia</p> }
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  cardOnList: PropTypes.bool.isRequired,
  excluiCarta: PropTypes.func.isRequired,
};

export default Card;
