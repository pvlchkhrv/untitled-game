import { start } from '../../../core/state-manger.js';

export const StartComponent = () => {
    const element = document.createElement('div');

    render(element);

    return { element };
};

async function render(element) {
    const btn = document.createElement('button');
    btn.append('Start');
    element.addEventListener('click', () => start());
    element.append(btn);
}
