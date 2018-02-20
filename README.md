# Simple Domodal

Simple modal using Domodule

## Installation

```sh
npm install simple-domodal
```

## Usage

```html
<body>
  <button aria-controls="some-id">This aria-controls will open the modal</button>

  <div id="some-id"
       class="modal"
       data-module="SimpleModal"
       role="dialog"
       tabindex="-1">

    <div class="modal-content padding-md text-center" data-name="modal">
      <button class="modal-close" data-action="close" aria-label="Close modal">
        <span aria-hidden="true">×</span>
      </button>

      ...content
    </div>
  </div>
</body>
```

## Events

Custom events are fired on open/close and you can fire an event to open the modal.

| Event          | Where                                       | When            |
|----------------|---------------------------------------------|-----------------|
| `modal:reveal` | If fired on the modal, the modal will open. |                 |
| `modal:opened` | On the modal.                               | On modal open.  |
| `modal:closed` | On the modal.                               | On modal close. |

## Options

| Option     | Default       | Action                                                 |
|------------|---------------|--------------------------------------------------------|
| `autoOpen` | `false`       | If `true` the modal will open on pageload.             |
| `focus`    | Modal Element | Element that will gain focus once the modal is opened. |
