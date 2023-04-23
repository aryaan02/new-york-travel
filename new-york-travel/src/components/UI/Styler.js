import React from "react";
import NavBar from "../header/NavBar";

const Styler = (props) => {
  return (
    <div
      style={{
        backgroundImage: `url("https://unsplash.com/photos/qK6898jepEU/download?force=true")`,
        backgroundRepeat: "no-repeat",
        position: "sticky",
        height: "100vh",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        paddingTop: "13vh",
        paddingBottom: "10vh",
        overflowY: "scroll",
      }}
    >
      {props.includeNavBar && <NavBar setloggedin={props.setloggedin}></NavBar>}

      <div
        style={{
          borderRadius: "30px",
          outline: "solid 5px #243A60",
          padding: "7vh",
          background: "#243A60DD",
          color: "#FCFCDD",
          width: "40vw",
          height: `${props.innerHeight}`,
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Styler;
