import React from "react";
import { Link, Route } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * A Render Props wrapper that knows if it's "active" or not.
 */
function NavLink({
  exact,
  isActive: isActiveProp,
  location,
  strict,
  to,
  ...rest
}) {
  const path = typeof to === "object" ? to.pathname : to;

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

  return (
    <Route
      path={escapedPath}
      exact={exact}
      strict={strict}
      location={location}
      children={({ location, match }) => {
        const isActive = !!(isActiveProp
          ? isActiveProp(match, location)
          : match);

        return (
          this.children({
            isActive,
            to,
            ...rest
          })
        );
      }}
    />
  );
}

export default NavLink;
