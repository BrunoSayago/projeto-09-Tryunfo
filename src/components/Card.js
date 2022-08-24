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
    } = this.props;

    const imprimeTrunfo = (trunfo) => {
      if (trunfo === true) {
        return (
          <p
            data-testid="trunfo-card"
            className="temTrunfo card-lendario"
          >
            Super Trunfo
          </p>
        );
      }
    };

    return (
      <div className="pre-card">
        <h1 className="pre-title">Pré-Vizualização</h1>
        <section className="pre-card-section">
          <h2 data-testid="name-card" className="card-name">{cardName}</h2>
          <img
            data-testid="image-card"
            className="img-card"
            src={ cardImage }
            alt={ cardName }
          />
          <span
            className="card-description"
            data-testid="description-card"
          >
            {cardDescription}
          </span>
          <div className="attr-card-div attr-card-arcano">
            <span className="span-attr-card">Arcano:</span>
            <p data-testid="attr1-card">{cardAttr1}</p>
          </div>
          <div className="attr-card-div attr-card-forca">
            <span className="span-attr-card">Força:</span>
            <p data-testid="attr2-card">{cardAttr2}</p>
          </div>
          <div className="attr-card-div attr-card-destreza">
            <span className="span-attr-card">Destreza:</span>
            <p data-testid="attr3-card">{cardAttr3}</p>
          </div>

          <p className="card-rare" data-testid="rare-card">{cardRare}</p>
          {imprimeTrunfo(cardTrunfo)}
        </section>
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
};

export default Card;
