import "./style/index.scss";
import { App } from "./components/app";
import { render, h } from "preact";

if (typeof window !== "undefined")
  render(h(App, ""), document.querySelector("#ifs-gallery") as HTMLElement);
