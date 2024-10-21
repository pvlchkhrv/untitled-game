import { SettingsComponent } from './settings/settings.component.js';
import { ResultPanelComponent } from './result-panel/result-panel.component.js';
import { GridComponent } from './grid/grid.component.js';
import { LoseComponent } from './lose/lose.component.js';
import { getGameStatus, subscribe } from '../../core/state-manger.js';
import { GAME_STATUS } from '../../core/constants.js';
import { StartComponent } from './start/start.component.js';

export const AppComponent = () => {
    const localState = { prevStatus: null }
    console.log('app created');
    const element = document.createElement('div');

    subscribe(() => render(element, localState));
    render(element, localState);


    return { element };
};

async function render(element, localState) {
    const status = await getGameStatus();

    if (localState.prevStatus === status) return;
    localState.prevStatus = status;

    console.log('AppComponent render')
    element.innerHTML = '';

    switch (status) {
        case GAME_STATUS.SETTINGS:
            const settingsComponent = SettingsComponent();
            const startComponent = StartComponent();
            element.append(settingsComponent.element, startComponent.element);
            break;
        case GAME_STATUS.IN_PROGRESS:
            const gridComponent = GridComponent();
            const resultPanelComponent = ResultPanelComponent();
            element.append(resultPanelComponent.element, gridComponent.element);
            break;
        case GAME_STATUS.LOSE:
            const loseComponent = LoseComponent();
            element.append(loseComponent.element);
            break;
        case GAME_STATUS.WIN:
            break;
        default:
            throw new Error(`Unknown game status: ${status}`);
    }
}
