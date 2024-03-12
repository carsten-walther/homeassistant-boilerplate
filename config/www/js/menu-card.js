import { LitElement, html, css } from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module"

console.info("%c  MENU-CARD \n%c Version: 0.0.0", "color: orange; font-weight: bold; background: black", "color: white; font-weight: bold; background: dimgray")

class MenuCard extends LitElement {
  
  static get properties() {
    return {
      hass: undefined,
      config: undefined,
      stateObj: undefined,
    }
  }

  setConfig(config) {
    if (!config.items) {
      throw new Error("You need to define one ore more items.")
    }
    this.config = config
  }

  renderItems() {
    return this.config.items.map((item) => {
      let state = window.location.pathname === item.path ? 'active' : ''
      return html`
        <li class=${state}>
          <a href=${item.path} class=${state}><span>${item.name}</span> <ha-icon icon=${item.icon}></ha-icon></a>
        </li>
      `
    })
  }

  render() {
    return html`
      <ha-card header=${this.config.name ? this.config.name : ''}>
        <ul>
          ${this.renderItems()}
        </ul>
      </ha-card>
    `
  }

  static get styles() {
    return css`
      :host {
        font-size: inherit;
      }
      ul {
        padding: 0;
        margin: 0;
        list-style: none;
      }
      ul li {
        padding: 0.25rem 0.75rem;
        margin: 0;
        list-style: none;
        background: transparent;
        border-radius: calc(var(--ha-card-border-radius) / 2);
      }
      ul li.active {
        background: rgba(255, 255, 255, 0.3);
      }
      ul li a {
        color: var(--primary-text-color) !important;
        text-decoration: none !important;
        font-size: 1.5rem;
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      ul li span {
        flex-grow: 0;
        flex-shrink: 0;
        justify-content: left;
        line-height: 2rem;
      }
      ul li ha-icon {
        flex-grow: 0;
        flex-shrink: 0;
        justify-content: right;
      }
    `
  }
}

customElements.define("menu-card", MenuCard)
