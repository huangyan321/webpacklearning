import { sum, sub } from '@/js/math';
import './css/lesstest.less';
import './css/index.css';
const img = document.createElement('img');
img.src = require('./img/lanbitou.png').default;
document.body.appendChild(img);
console.log(sum(10, 20));
console.log(sub(20, 10));
