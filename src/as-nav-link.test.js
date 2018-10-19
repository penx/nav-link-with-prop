import React from 'react';
import styled from 'styled-components';
import { MemoryRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import asNavLink from './as-nav-link';
import 'jest-styled-components';

describe('asNavLink', () => {
  it('renders a styled-component without an active prop', () => {
    const MyAnchor = styled(({
      as: T = 'a',
      ...props
    }) => <T {...props} />)({
      textDecoration: 'blink',
      color: 'blue',
    }, ({ active }) => (active && {
      color: 'red',
    }));
    const MyLink = asNavLink()(MyAnchor);

    const MyTest = () => <Router><MyLink to="/somewhere">My Link</MyLink></Router>;
    const tree = renderer.create(<MyTest />).toJSON();
    expect(tree).toHaveStyleRule('color', 'blue');
    expect(tree.props.href === '/somewhere');
    expect(tree.props.active === false);
    expect(tree.props.children === 'My Link');
  });

  it('renders a styled-component with an active prop', () => {
    const MyAnchor = styled(({
      as: T = 'a', // TODO: refactor, styled-components supports as prop already
      ...props
    }) => <T {...props} />)({
      textDecoration: 'blink',
      color: 'blue',
    }, ({ active }) => (active && {
      color: 'red',
    }));
    const MyLink = asNavLink()(MyAnchor);

    const MyTest = () => <Router><MyLink to="/">My Link</MyLink></Router>;
    const tree = renderer.create(<MyTest />).toJSON();
    expect(tree).toHaveStyleRule('color', 'red');
    expect(tree.props.href === '/');
    expect(tree.props.active === true);
    expect(tree.props.children === 'My Link');
  });
});

// TODO:
// - test for exact prop
// - test for both emotion and styled-components
// - asNavLink hof hoc, here to begin with then separate repo
// - test for custom activeProp
