import { SettingsComponent } from './settings/settings.component.js';
import { ResultPanelComponent } from './result-panel/result-panel.component.js';
import { GridComponent } from './grid/grid.component.js';
import { LoseComponent } from './lose/lose.component.js';
import { getGameStatus } from '../../core/state-manger.js';
import { GAME_STATUS } from '../../core/constants.js';
import { StartComponent } from './start/start.component.js';

export const AppComponent = () => {
    const element = document.createElement('div');

    render(element);

    return { element };
};


async function render(element) {
    const status = await getGameStatus();
    switch (status) {
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
        case GAME_STATUS.SETTINGS:
            const settingsComponent = SettingsComponent();
            const startComponent = StartComponent();
            element.append(settingsComponent.element, startComponent.element);
            break;
        default:
            throw new Error(`Unknown game status: ${status}`);
    }





}
