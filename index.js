import Domodule from 'domodule';
import { addClass, removeClass, on, fire, delegate } from 'domassist';

const Events = {
  Reveal: 'modal:reveal',
  Opened: 'modal:opened',
  Closed: 'modal:closed'
};

export default class SimpleModal extends Domodule {
  postInit() {
    this.active = false;
    this.focusElement = this.el;
    this.togglerSelector = `[aria-controls="${this.el.id}"]`;

    on(document.body, 'keydown', this.onKeyDown.bind(this));
    on(this.el, Events.Reveal, this.open.bind(this));
    on(this.el, 'click', this.onOverlayClick.bind(this));
    delegate(document.body, 'click', this.togglerSelector, this.onTogglerClick.bind(this));
    on(window, 'hashchange', this.checkHash.bind(this));

    if (this.options.focus) {
      this.focusElement = this.findOne(this.options.focus) || this.el;
    }

    if (this.options.autoOpen) {
      this.open();
    }
  }

  /**
   * Throws an error if data-name="modal" not present
   */
  get required() {
    return {
      named: ['modal']
    };
  }

  /**
   * Check whether the current hash matches the modal's id.
   * @return {boolean}
   */
  hashMatches() {
    return this.id === window.location.hash.substring(1);
  }

  /**
   * Checks the hash, if it matches, open th emodal.
   */
  checkHash() {
    if (this.hashMatches()) {
      this.open();
    }
  }

  /**
   * Fire an event on the modal.
   * @param {String} event Event name.
   */
  fire(event) {
    fire(this.el, event, { bubbles: true });
  }

  /**
   * If any toggler gets clicked, open the modal.
   * @param {MouseEvent} event
   */
  onTogglerClick(event) {
    event.preventDefault();
    this.open();
  }

  /**
   * Open the modals and focus either the modal or the one given on the option.
   */
  open() {
    this.active = true;
    this.focusedElement = document.activeElement || document.body;
    addClass(this.el, 'visible');
    this.fire(Events.Opened);
    fire(window, 'resize');

    setTimeout(() => {
      this.focusElement.focus();
    }, 100);
  }

  /**
   * Closes the modal and restores the focus to the last element that had it.
   */
  close() {
    this.active = false;
    removeClass(this.el, 'visible');
    this.fire(Events.Closed);

    setTimeout(() => {
      window.location.hash = '';
      (this.focusedElement || document.body).focus();
    });
  }

  /**
   * Closes the modal when overlay is clicked
   */
  onOverlayClick(e) {
    if (this.els.modal.contains(e.target) || !e.target.offsetParent) {
      return;
    }

    this.close();
  }

  /**
   * Closes the modal if Esc key is pressed.
   * @param {KeyboardEvent} event
   */
  onKeyDown(event) {
    if (this.active && event.keyCode === 27) {
      this.close();
    }
  }
}

Domodule.register('SimpleModal', SimpleModal);
