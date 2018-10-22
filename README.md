# Nav Link with Prop

React Router NavLink that uses an active prop rather than css class.

see https://github.com/UKHomeOffice/govuk-react/issues/423

e.g. when you want to use a CSSinJS library that expects an active prop but you're using React Router 😢

## Usage

`npm install nav-link-with-prop --save`

### Your Dumb Component

Say you have a dumb/UI/styled component, such as:

```jsx
const MyNavAnchor = styled(({
  as: T = 'a',
  ...props
}) => <T {...props} />)({
  textDecoration: 'blink',
  color: 'blue',
}, ({ active }) => (active && {
  color: 'red',
}));
```

Note that you need to provide the 'as' prop. This is provided by styled-components by default but needs to be done manually (as per code sample above) for emotion.

You can then use one of the following approaches:

### Higher order component

See [as-nav-link](https://github.com/penx/as-nav-link).

### Render Props
A bit uglier:

```jsx
import NavLinkWithProp from 'nav-link-with-prop';

const MyNavLink = ({ children, ...props }) => (
  <NavLinkWithProp {...props}>
    {innerProps => <MyNavAnchor as={Link} {...innerProps}>{children}</MyNavAnchor>}
  </NavLinkWithProp>
);
```
