import { playAgain } from '../../../core/state-manger.js';

export const LoseComponent = () => {
    const element = document.createElement('div');

    render(element);

    return { element };
};

async function render(element) {
    const titleElement = document.createElement('h1');
    titleElement.append('You lose!');

    const btn = document.createElement('button');
    btn.append('Play again');

    btn.addEventListener('click', (event) => playAgain())

    element.append(titleElement, btn);
}
