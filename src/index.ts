/**
 * Vanilla JS instead of TypeScript because
 * JSX isn't valid in a .ts file and renaming 
 * the file to `index.tsx` causes annoying build 
 * errors!
 */
import './style/index.scss';
import { App } from './components/app';
import { h, render } from 'preact';

export default App;