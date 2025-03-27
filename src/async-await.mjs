import {stdin, stdout} from 'node:process';
import {createInterface } from 'node:readline/promises';

(async()=>{
  const rl = createInterface(stdin,stdout);

  const name = await rl.question('input yr name : ');

  console.log(`hi ${name}`);
  const age = await rl.question('input yr age : ');
  console.log(`hi  ${name} and my yr  age ${age}`);
})();

console.log('finish')

