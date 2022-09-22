//统一加了后缀 目的是更好辨识,
import { sum, sub } from '@/js/math.js';
import { a, nnumber } from './js/hello-ts.ts';
import './react/index.js';
import './vue/index.js';
import './css/hello-less.less';
import './css/index.css';
const img = document.createElement('img');
img.src = require('./img/lanbitou.png').default;
document.body.appendChild(img);
console.log(a);
console.log(nnumber);
console.log(sum(10, 20));
console.log(sub(20, 10));
