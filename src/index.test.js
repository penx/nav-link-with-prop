import React from 'react';
import NavLinkWithProp from '.';
import styled from 'styled-components';
import { MemoryRouter as Router, Link } from 'react-router-dom';
import renderer from 'react-test-renderer'
import 'jest-styled-components'

describe('NavLinkWithProp', () => {
  it(`renders a styled-component with an active prop`, () => {
    const MyAnchor = styled(({
      as: T = 'a',
      ...props
    }) => <T {...props}/>)({
      textDecoration: 'blink',
      color: 'blue',
    }, ({isActive}) => ({
      color: 'red'
    }));

    const MyLink = (props) => <NavLinkWithProp {...props}>
      {(props) => <MyAnchor as={Link} {...props} />}
    </NavLinkWithProp>

    const MyTest = () => <Router><MyLink to="/somewhere" /></Router>

    const tree = renderer.create(<MyTest />).toJSON()

    // expect a Link tag to be rendered with a styled-component wrapper that has color red
    expect(tree).toHaveStyleRule('color', 'red')

    // TODO: expect Link tag to be rendered with correct url

  });
});
