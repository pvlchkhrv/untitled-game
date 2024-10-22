import { getGridSize, subscribe, unsubscribe } from '../../../core/state-manger.js';
import { CellComponent } from './cell/cell.component.js';

export const GridComponent = () => {
    console.log('GridComponent create');
    const element = document.createElement('table');
    const observer = () => render(element);

    element.classList.add('grid');

    subscribe(observer);
    render(element);

    return { element, cleanUp: () => unsubscribe(observer) };
};

async function render(element) {
    console.log('GridComponent rendering');
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
