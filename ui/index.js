import { AppComponent } from './components/app.component.js';

const rootElement = document.getElementById('root');
const appComponent = AppComponent();

rootElement.innerHTML = '';
rootElement.append(appComponent.element);
