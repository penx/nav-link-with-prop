import React from 'react';
import styled from 'styled-components';
import { MemoryRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import asNavLink from './as-nav-link';
import 'jest-styled-components';

const MyNavAnchor = styled(({
  as: T = 'a',
  ...props
}) => <T {...props} />)({
  textDecoration: 'blink',
  color: 'blue',
}, ({ active }) => (active && {
  color: 'red',
}));

describe('asNavLink', () => {
  it('renders a styled-component without an active prop', () => {
    const MyNavLink = asNavLink()(MyNavAnchor);

    const MyTest = () => <Router><MyNavLink to="/somewhere">My Link</MyNavLink></Router>;
    const tree = renderer.create(<MyTest />).toJSON();
    expect(tree).toHaveStyleRule('color', 'blue');
    expect(tree.props.href === '/somewhere');
    expect(tree.props.active === false);
    expect(tree.props.children === 'My Link');
  });

  it('renders a styled-component with an active prop', () => {
    const MyNavLink = asNavLink()(MyNavAnchor);

    const MyTest = () => <Router><MyNavLink to="/">My Link</MyNavLink></Router>;
    const tree = renderer.create(<MyTest />).toJSON();
    expect(tree).toHaveStyleRule('color', 'red');
    expect(tree.props.href === '/');
    expect(tree.props.active === true);
    expect(tree.props.children === 'My Link');
  });
});

it('renders a styled-component with a custom active prop', () => {
  const MyCustomNavAnchor = styled(({
    as: T = 'a',
    ...props
  }) => <T {...props} />)({
    textDecoration: 'blink',
    color: 'blue',
  }, ({ custom }) => (custom && {
    color: 'red',
  }));

  const MyNavLink = asNavLink({ activeProp: 'custom' })(MyCustomNavAnchor);

  const MyTest = () => <Router><MyNavLink to="/">My Link</MyNavLink></Router>;
  const tree = renderer.create(<MyTest />).toJSON();
  expect(tree).toHaveStyleRule('color', 'red');
  expect(tree.props.href === '/');
  expect(tree.props.custom === true);
  expect(tree.props.children === 'My Link');
});

// TODO:
// - test for exact prop
// - test for both emotion and styled-components
// - asNavLink hof hoc, here to begin with then separate repo
