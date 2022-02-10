import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  
  return (
    <>
          <div className="header">
              <h1>Movies App</h1>
        <nav>
          <ul>
            <NavLink to={"/"} className={ (nav)=> nav.isActive ? 'nav-active': '' } >{<li>Acceuil</li>}</NavLink>
            <NavLink to={"/coup-de-coeur"} className={ (nav)=> nav.isActive ? 'nav-active': '' } >{<li>Coup de coeur</li>}</NavLink>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
