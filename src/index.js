import React from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * A Render Props wrapper that knows if it's "active" or not.
 */
function NavLink({
  exact,
  isActive: isActiveProp,
  location,
  strict,
  to,
  children,
  ...rest
}) {
  const path = typeof to === 'object' ? to.pathname : to;

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');

  return (
    <Route
      path={escapedPath}
      exact={exact}
      strict={strict}
      location={location}
    >
      {({ location: loc, match }) => {
        const isActive = !!(isActiveProp
          ? isActiveProp(match, loc)
          : match);

        return (
          children({
            isActive,
            to,
            ...rest,
          })
        );
      }}
    </Route>
  );
}

NavLink.propTypes = {
  exact: Route.propTypes.exact,
  isActive: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object,
  strict: Route.propTypes.strict,
  to: Link.propTypes.to,
  children: PropTypes.func,
};

NavLink.defaultProps = {
  exact: undefined,
  isActive: undefined,
  location: undefined,
  strict: undefined,
  to: undefined,
  children: undefined,
};

export default NavLink;
