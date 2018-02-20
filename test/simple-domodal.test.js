import SimpleDomodal from '../index';
import Domodule from 'domodule';
import { once, fire, findOne } from 'domassist';
import test from 'tape-rollup';

const setup = options => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <button class="works" aria-controls="some-id">Work button</button>

    <div id="some-id"
       class="modal"
       data-module="SimpleModal"
       role="dialog"
       tabindex="-1" ${options || ''}>

    <div class="modal-content padding-md text-center" data-name="modal">
      <button class="close" data-action="close" aria-label="Close modal">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </div>`;

  document.body.appendChild(wrapper);

  return SimpleDomodal.discover();
};

const teardown = () => {
  document.body.innerHTML = '';
};

test('Class', assert => {
  assert.ok(SimpleDomodal.prototype instanceof Domodule, 'It\'s a domodule class');
  assert.equal(typeof SimpleDomodal.prototype.close, 'function', 'Close function is exposed');
  assert.end();
});

test('Open', assert => {
  const instance = setup()[0];

  assert.notOk(instance.el.classList.contains('visible'), 'Modal is not visible');

  once(instance.el, 'modal:opened', () => {
    assert.ok(instance.el.classList.contains('visible'), 'Modal is now visible');
    assert.pass('Open event fired');
    teardown();
    assert.end();
  });

  instance.open();
});

test('Auto open', assert => {
  const instance = setup('data-module-auto-open="true"')[0];

  assert.ok(instance.el.classList.contains('visible'), 'Modal opens automatically');
  teardown();
  assert.end();
});

test('Close', assert => {
  const instance = setup()[0];

  instance.open();
  assert.ok(instance.el.classList.contains('visible'), 'Modal is visible');

  once(instance.el, 'modal:closed', () => {
    assert.ok(!instance.el.classList.contains('visible'), 'Modal is not visible');
    assert.pass('Close event fired');
    teardown();
    assert.end();
  });

  instance.close();
});

test('Close on overlay click', assert => {
  const instance = setup()[0];

  instance.open();
  assert.ok(instance.el.classList.contains('visible'), 'Modal is visible');

  instance.el.click();

  assert.ok(!instance.el.classList.contains('visible'), 'Modal is not visible');
  teardown();
  assert.end();

  instance.close();
});

test('Reveal', assert => {
  const instance = setup()[0];

  assert.notOk(instance.el.classList.contains('visible'), 'Modal is not visible');

  once(instance.el, 'modal:opened', () => {
    assert.ok(instance.el.classList.contains('visible'), 'Modal is now visible');
    teardown();
    assert.end();
  });

  fire(instance.el, 'modal:reveal');
});

test('Button', assert => {
  const instance = setup()[0];
  const button = findOne('.works');

  button.focus();
  assert.notOk(instance.el.classList.contains('visible'), 'Modal is not visible');
  button.click();
  assert.ok(instance.el.classList.contains('visible'), 'Modal is visible');

  setTimeout(() => {
    assert.equal(document.activeElement, instance.el, 'Modal got focus');
    instance.close();

    setTimeout(() => {
      assert.equal(document.activeElement, button, 'Button got focus back');
      teardown();
      assert.end();
    }, 150);
  }, 150);
});

test('Resize', assert => {
  const instance = setup()[0];

  assert.notOk(instance.el.classList.contains('visible'), 'Modal is not visible');

  once(window, 'resize', () => {
    assert.ok(instance.el.classList.contains('visible'), 'Modal is now visible');
    teardown();
    assert.end();
  });

  fire(instance.el, 'modal:reveal');
});
