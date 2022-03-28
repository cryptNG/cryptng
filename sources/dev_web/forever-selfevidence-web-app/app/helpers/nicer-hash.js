import { helper } from '@ember/component/helper';

export default helper(function nicerHash(positional/*, named*/) {
if(positional.length < 15) return positional;
let first = positional.toString().slice(0, 6);
let last = positional.toString().slice(positional.length - 7);
  let clean =  first + '(...)' + last;
  return clean;
});
