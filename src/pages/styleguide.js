import React from 'react';
import Type1 from '../components/Type1';
import Type2 from '../components/Type2';
import Type3 from '../components/Type3';
import Type4 from '../components/Type4';
import Type5 from '../components/Type5';
import Small from '../components/Small';
import Base from '../components/Base';
import Button from '../components/Button';

const StyleGuide = () => (
  <div>
    <Type1>Style Guide</Type1>
    <hr />

    <Type1>Type1</Type1>
    <Type2>Type2</Type2>
    <Type3>Type3</Type3>
    <Type4>Type4</Type4>
    <Type5>Type5</Type5>

    <Base tag="p">
      Beard roof party cardigan <a href="#">locavore you probably haven&apos;t heard</a> of them squid artisan
      edison bulb whatever normcore jianbing succulents. Bitters kickstarter before they sold out
      8-bit, af blue bottle DIY paleo iceland microdosing brooklyn vinyl fingerstache. Gentrify
      adaptogen raw denim heirloom. XOXO distillery try-hard, deep v gluten-free fanny pack
      adaptogen everyday carry VHS trust fund green juice twee cold-pressed jianbing. Readymade
      migas pitchfork pinterest cliche, keffiyeh asymmetrical hoodie lumbersexual subway tile man
      bun four loko drinking vinegar tofu. YOLO pinterest try-hard pok pok echo park tacos.
    </Base>

    <Small>
      Beard roof party cardigan locavore you probably haven&apos;t heard of them squid artisan.
    </Small>

    <hr />

    <Button>Button</Button>
  </div>
);

export default StyleGuide;
