import React from 'react';
import PropTypes from 'prop-types';
import Type1 from '../components/Type1';
import Type2 from '../components/Type2';
import Type3 from '../components/Type3';
import Type4 from '../components/Type4';
import Type5 from '../components/Type5';
import Small from '../components/Small';
import Base from '../components/Base';
import Button from '../components/Button';
import Image from '../components/Image';
import List from '../components/List';
import FlatList from '../components/FlatList';
import Blockquote from '../components/Blockquote';
import Input from '../components/Input';
import Select from '../components/Select';
import Textarea from '../components/Textarea';

const StyleGuide = ({ data }) => (
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

    <Type4 tag={Blockquote}>
      <p>
        From their professional conduct in an office setting to their diligent experts in the field,
        Priority Construction makes working with them easy...
      </p>
    </Type4>

    <hr />

    <Button>Button</Button>

    <hr />

    <List>
      {data.images.edges.map(edge => (
        <List.Item key={edge.node.id}>
          <Image src={edge.node.sizes.src} />
        </List.Item>
      ))}
    </List>

    <hr />

    <List>
      <List.Item>
        Foo
      </List.Item>
      <List.Item>
        Bar
      </List.Item>
      <List.Item>
        Baz
      </List.Item>
    </List>

    <FlatList>
      <FlatList.Item>
        Foo
      </FlatList.Item>
      <FlatList.Item>
        Bar
      </FlatList.Item>
      <FlatList.Item>
        Baz
      </FlatList.Item>
    </FlatList>

    <hr />

    <form>
      <div>
        <Input />
      </div>
      <div>
        <Select>
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
      </div>
      <div>
        <Textarea />
      </div>
    </form>

  </div>
);

StyleGuide.displayName = 'StyleGuide';

StyleGuide.propTypes = {
  data: PropTypes.shape({
    images: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string.isRequired,
          sizes: PropTypes.shape({}),
        }),
      })),
    }),
  }).isRequired,
};

export default StyleGuide;

export const query = graphql`
  query StyleGuide {
    images: allImageSharp(limit: 20, filter:{
      id: {
        regex: "/src/images/bg.jpeg/"
      }
    }) {
      edges {
        node {
          id
          sizes {
            ...GatsbyImageSharpSizes
          }
        }
      }
    }
  }
`;
