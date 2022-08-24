import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    const checkbox = (
      <label htmlFor="trunfo-input" className="trunfo-lab">
        <span className="span-trunfo">Carta Lendária</span>
        <input
          type="checkbox"
          data-testid="trunfo-input"
          name="cardTrunfo"
          id="trunfo-input"
          checked={ cardTrunfo }
          onChange={ onInputChange }
        />
      </label>
    );

    return (
      <form className="main-form">
        <h1 className="main-form-title">Adicionar nova carta</h1>
        <label htmlFor="name-input">
          Nome
          <input
            type="text"
            data-testid="name-input"
            name="cardName"
            id="name-input"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="description-input">
          Descrição
          <textarea
            type="textarea"
            data-testid="description-input"
            name="cardDescription"
            id="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="attr1-input" className="side-lab attr">
          <span className="attr-span">Arcano</span>
          <input
            type="number"
            data-testid="attr1-input"
            name="cardAttr1"
            id="attr1-input"
            className="attr-input"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="attr2-input" className="side-lab attr">
          <span className="attr-span">Força</span>
          <input
            type="number"
            data-testid="attr2-input"
            name="cardAttr2"
            id="attr2-input"
            className="attr-input"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="attr3-input" className="side-lab attr">
          <span className="attr-span">Destreza</span>
          <input
            type="number"
            data-testid="attr3-input"
            name="cardAttr3"
            id="attr3-input"
            className="attr-input"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="image-input">
          Imagem
          <input
            type="text"
            data-testid="image-input"
            name="cardImage"
            id="image-input"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="rare-input" className="side-lab">
          <span className="span-rare">Raridade</span>
          <select
            data-testid="rare-input"
            name="cardRare"
            id="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>
        {
          hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p> : checkbox
        }

        <button
          data-testid="save-button"
          name="isSaveButtonDisabled"
          type="button"
          disabled={ isSaveButtonDisabled }
          onClick={ () => onSaveButtonClick({
            cardName,
            cardDescription,
            cardAttr1,
            cardAttr2,
            cardAttr3,
            cardImage,
            cardRare,
            cardTrunfo,
          }) }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
