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
