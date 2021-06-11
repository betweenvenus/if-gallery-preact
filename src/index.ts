import './style/index.scss';
import { App } from './components/app';
import { render, h } from 'preact';

if (typeof window !== "undefined") {
	console.log("RENDERING?")
	console.log(document.body);
	console.log(App);
	render(h(App, ""), document.querySelector("#ifs-gallery") as HTMLElement);
}

// export default App;