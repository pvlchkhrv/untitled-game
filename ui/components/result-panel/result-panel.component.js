import { getGooglePoints, getPlayerPoints, subscribe, unsubscribe } from '../../../core/state-manger.js';
import { EVENTS } from '../../../core/constants.js';

export const ResultPanelComponent = () => {
    const element = document.createElement('div');
    const observer = (e) => {
        if (e.name === EVENTS.POINTS_CHANGED) {
            render(element)
        }
    };

    element.classList.add('result-panel');

    subscribe(observer);
    render(element);

    return { element, cleanUp: () => unsubscribe(observer) };
};

async function render(element) {
    element.innerHTML = '';
    const googlePoints = await getGooglePoints();
    const player1Points = await getPlayerPoints(1);
    const player2Points = await getPlayerPoints(2);

    element.append(`Player 1: ${player1Points}, Player 2: ${player2Points}, Google: ${googlePoints}`);
}
