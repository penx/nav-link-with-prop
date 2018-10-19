import React from 'react';
import styled from 'styled-components';
import { MemoryRouter as Router, Link } from 'react-router-dom';
import renderer from 'react-test-renderer';
import NavLinkWithProp from '.';
import 'jest-styled-components';

describe('NavLinkWithProp', () => {
  it('renders a styled-component without an active prop', () => {
    const MyAnchor = styled(({
      as: T = 'a',
      ...props
    }) => <T {...props} />)({
      textDecoration: 'blink',
      color: 'blue',
    }, ({ isActive }) => (isActive && {
      color: 'red',
    }));
    const MyLink = props => (
      <NavLinkWithProp {...props}>
        {innerProps => <MyAnchor as={Link} {...innerProps} />}
      </NavLinkWithProp>
    );

    const MyTest = () => <Router><MyLink to="/somewhere">My Link</MyLink></Router>;
    const tree = renderer.create(<MyTest />).toJSON();
    expect(tree).toHaveStyleRule('color', 'blue');
    expect(tree.props.href === '/somewhere');
    expect(tree.props.isActive === false);
  });

  it('renders a styled-component with an active prop', () => {
    const MyAnchor = styled(({
      as: T = 'a',
      ...props
    }) => <T {...props} />)({
      textDecoration: 'blink',
      color: 'blue',
    }, ({ isActive }) => (isActive && {
      color: 'red',
    }));
    const MyLink = props => (
      <NavLinkWithProp {...props}>
        {innerProps => <MyAnchor as={Link} {...innerProps} />}
      </NavLinkWithProp>
    );

    const MyTest = () => <Router><MyLink to="/">My Link</MyLink></Router>;
    const tree = renderer.create(<MyTest />).toJSON();
    expect(tree).toHaveStyleRule('color', 'red');
    expect(tree.props.href === '/');
    expect(tree.props.isActive === true);
  });
});
