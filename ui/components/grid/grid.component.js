import { getGridSize } from '../../../core/state-manger.js';
import { CellComponent } from './cell/cell.component.js';

export const GridComponent = () => {
    const localState = { cleanUps: [] }
    const element = document.createElement('table');

    element.classList.add('grid');

    render(element, localState);

    return { element, cleanUp: () => localState.cleanUps.forEach(cleanUp => cleanUp()) };
};

async function render(element, localState) {
    localState.cleanUps.forEach(cleanUp => cleanUp());
    localState.cleanUps = [];

    element.innerHTML = '';
    const gridSize = await getGridSize(element);

    for (let y = 0; y < gridSize.rowsCount; y++) {
        const rowElement = document.createElement('tr');

        for (let x = 0; x < gridSize.columnsCount; x++) {
            const cellComponent = CellComponent(x, y);
            localState.cleanUps.push(cellComponent.cleanUp);
            rowElement.append(cellComponent.element);
        }

        element.append(rowElement);
    }
}
