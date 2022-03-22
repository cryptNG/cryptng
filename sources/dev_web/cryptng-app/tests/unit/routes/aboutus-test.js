import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | aboutus', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:aboutus');
    assert.ok(route);
  });
});
