import { getGridSize, subscribe } from '../../../core/state-manger.js';
import { CellComponent } from './cell/cell.component.js';

export const GridComponent = () => {
    const element = document.createElement('table');

    element.classList.add('grid');

    subscribe(() => render(element));
    render(element);

    return { element };
};

async function render(element) {
    element.innerHTML = '';
    const gridSize = await getGridSize(element);

    for (let y = 0; y < gridSize.rowsCount; y++) {
        const rowElement = document.createElement('tr');

        for (let x = 0; x < gridSize.columnsCount; x++) {
            const cellComponent = CellComponent(x, y);
            rowElement.append(cellComponent.element);
        }

        element.append(rowElement);
    }
}
