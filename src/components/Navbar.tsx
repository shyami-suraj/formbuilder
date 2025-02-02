import React, { FunctionComponent } from "react";
import {
  isMobile as libIsMobile,
  isTablet as libIsTablet,
} from "react-device-detect";
let isMobile: Boolean;
if (process.env.NODE_ENV === "localhost") {
  isMobile = window.innerWidth < 1024;
} else {
  isMobile = libIsMobile || libIsTablet || window.innerWidth < 1024;
}
interface NavbarProps {
  window?: () => Window;
}
import logo from "../assets/logo.png";

const Navbar: FunctionComponent<NavbarProps> = (props) => {
  return (
    <>
      <header
        id="header"
        className="header-sticky sticky-active"
        data-fullwidth="true"
      >
        <div className="header-inner">
          <div className="container">
            <div id="logo">
              <a
                href="/"
                className="logo vcenter"
                style={{ fontFamily: "Cassannet", fontSize: "16px" }}
              >
                <img src={logo} alt="Form Builder" style={{ height: "75px" }} />
                          </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
