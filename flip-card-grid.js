import { LitElement, html, css } from 'https://unpkg.com/lit@latest?module';
import './flip-card.js';

/**
 * A responsive grid component to display and manage multiple flip-cards.
 *
 * @element flip-card-grid
 * @prop {Number} maxCardsPerRow - The maximum number of cards to display per row.
 */
export class FlipCardGrid extends LitElement {
  static properties = {
    maxCardsPerRow: { type: Number, attribute: 'max-cards-per-row' },
  };

  constructor() {
    super();
    this.maxCardsPerRow = 4;
  }

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }

    .grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      max-width: 100%;
    }

    /* Responsive breakpoints */
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
    }

    @media (min-width: 1024px) {
      .grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      }
    }

    /* Limit maximum cards per row */
    .grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, calc(100% / var(--max-cards-per-row, 4) - 1rem)));
    }

    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, calc(100% / var(--max-cards-per-row, 4) - 1rem)));
      }
    }

    .controls {
      margin-bottom: 1rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    input[type="number"] {
      width: 60px;
      padding: 0.25rem;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
  `;

  updated(changedProperties) {
    if (changedProperties.has('maxCardsPerRow')) {
      this.style.setProperty('--max-cards-per-row', this.maxCardsPerRow.toString());
    }
  }

  _handleMaxCardsChange(e) {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 10) {
      this.maxCardsPerRow = value;
    }
  }

  render() {
    return html`
      <div class="controls">
        <label>
          Max per row:
          <input 
            type="number" 
            min="1" 
            max="10" 
            .value="${this.maxCardsPerRow}"
            @input="${this._handleMaxCardsChange}"
          />
        </label>
      </div>

      <div class="grid">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('flip-card-grid', FlipCardGrid);
