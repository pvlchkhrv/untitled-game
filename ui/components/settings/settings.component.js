export const SettingsComponent = () => {
    const element = document.createElement('div');

    render(element);

    return { element, cleanUp: () => {} };
};

async function render(element) {
    element.innerHTML = 'settings component';
}
