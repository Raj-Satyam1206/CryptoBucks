import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav
      className="w-[40%] mt-16 flex justify-around align-middle
    border border-cyan rounded-lg
    "
    >

{/* -->In React Router, NavLink is a special type of Link component that is designed for navigation. Both Link and NavLink are used to create links to different routes in a React application, but NavLink provides additional features for styling links based on the current route.
-->The isActive prop is an alternative approach for customizing the active state of a link. Instead of relying on the automatic activation provided by NavLink, you can use the isActive prop to determine the active state based on a custom function. */}

      <NavLink
        to="/"
        end
        // The root url will always be rendered , hence when other paths such as saved or trending is rendered, then the root url/path should not be rendered. therefore we use 'end'.
        className={({ isActive }) => {
          return `w-full text-base text-center font-nunito m-2.5

${
  isActive
    ? "bg-cyan text-gray-300"
    : "bg-gray-200 text-gray-100hover:text-cyan active:bg-cyan active:text-gray-300"
}
    border-0 cursor-pointer rounded capitalize font-semibold`;
        }}
      >
        Crypto
      </NavLink>

      <NavLink
        to="/trending"
        className={({ isActive }) => {
          return `w-full text-base text-center font-nunito m-2.5

${
  isActive
    ? "bg-cyan text-gray-300"
    : "bg-gray-200 text-gray-100hover:text-cyan active:bg-cyan active:text-gray-300"
}
    border-0 cursor-pointer rounded capitalize font-semibold`;
        }}
      >
        trending
      </NavLink>

      <NavLink
        to="/saved"
        className={({ isActive }) => {
          return `w-full text-base text-center font-nunito m-2.5

${
  isActive
    ? "bg-cyan text-gray-300"
    : "bg-gray-200 text-gray-100hover:text-cyan active:bg-cyan active:text-gray-300"
}
    border-0 cursor-pointer rounded capitalize font-semibold`;
        }}
      >
        saved
      </NavLink>
    </nav>
  );
};

export default Navigation;