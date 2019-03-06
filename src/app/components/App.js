import React from "react";
import Layout from "./Layout";
import "../assets/styles/app.scss";

export default class App extends React.Component {
  componentDidMount() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // We listen to the resize event
    window.addEventListener("resize", () => {
      // We execute the same script as before
      const newVh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${newVh}px`);
    });
  }

  render() {
    return (
      <div className="app-container">
        <Layout />
      </div>
    );
  }
}
