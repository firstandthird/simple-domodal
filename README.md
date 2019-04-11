# Simple Domodal

Simple modal using Domodule

## Installation

```sh
npm install simple-domodal
```

## Usage

### JavaScript

```js
import 'simple-domodal';
// or
import SimpleModal from 'simple-domodal';
```

### HTML

```html
...

<body>
  <button aria-controls="some-id">This aria-controls will open the modal</button>

  <div id="some-id"
       class="modal"
       data-module="SimpleModal"
       data-module-auto-open="false"
       data-module-closable="true"
       role="dialog"
       tabindex="-1">

    <div class="modal-content padding-md text-center" data-name="modal">
      <button class="modal-close" data-action="close" aria-label="Close modal">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </div>

  <script src="simple-domodal.js"></script>
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
| `closable` | `true`        | If `true` modal won't disappear on close.              |
| `focus`    | Modal Element | Element that will gain focus once the modal is opened. |
