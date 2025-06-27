import { LitElement, html, css } from 'https://unpkg.com/lit@latest?module';

/**
 * A simple, accessible flip card component.
 *
 * @element flip-card
 * @slot front - Content for the front of the card.
 * @slot back - Content for the back of the card.
 * @attr {String} aspect-ratio - The aspect ratio of the card (width/height), default is "2/3"
 */
export class FlipCard extends LitElement {
  static properties = {
    flipped: { type: Boolean, reflect: true },
    aspectRatio: { type: String, attribute: 'aspect-ratio', reflect: true }
  };

  constructor() {
    super();
    this.flipped = false;
    this.aspectRatio = '2/3'; // Default aspect ratio
  }

  updated(changedProperties) {
    if (changedProperties.has('aspectRatio')) {
      this.style.setProperty('--aspect-ratio', this.aspectRatio);
    }
  }

  static styles = css`
    :host {
      display: block;
      perspective: 1000px;
      width: 100%;
      aspect-ratio: var(--aspect-ratio, 2/3);
      min-width: 150px;
      
    }

    .card {
      width: 100%;
      height: 100%;
      transition: transform 0.6s;
      transform-style: preserve-3d;
      position: relative;
      cursor: pointer;
       
    }

    :host([flipped]) .card {
      transform: rotateY(180deg);
    }

    .face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border: 1px solid #ccc;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2em;
      background: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      box-sizing: border-box;
      overflow: hidden;
    }

    .back {
      transform: rotateY(180deg);
      background: #f0f0f0;
    }

    @media (prefers-reduced-motion: reduce) {
      .card {
        transition: none;
      }
    }
  `;

  toggleFlip() {
    this.flipped = !this.flipped;
  }

  _handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggleFlip();
    }
  }

  render() {
    return html`
      <div 
        class="card" 
        @click="${this.toggleFlip}"
        @keydown="${this._handleKeydown}"
        role="button" 
        tabindex="0" 
        aria-label="Flip card"
        aria-pressed="${this.flipped}"
      >
        <div class="face front">
          <slot name="front">Front</slot>
        </div>
        <div class="face back">
          <slot name="back">Back</slot>
        </div>
      </div>
    `;
  }
}

customElements.define('flip-card', FlipCard);

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

