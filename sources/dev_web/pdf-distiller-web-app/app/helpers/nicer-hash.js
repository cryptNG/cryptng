import { helper } from '@ember/component/helper';

export default helper(function nicerHash(positional /*, named*/) {
  let first = positional.toString().slice(0, 4);
  let last = positional.toString().slice(positional.length - 5);
  let clean = first + '(...)' + last;
  return clean;
});
