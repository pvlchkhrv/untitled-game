import { EVENTS, GAME_STATUS } from './constants.js';

// <STATE>
const _state = {
    gameState: GAME_STATUS.SETTINGS,
    settings: {
        googleJumpIntervalInMs: 2000,
        gridSize: {
            rowsCount: 4,
            columnsCount: 5,
        },
        pointsToLose: 3,
        pointsToWin: 3,
    },
    positions: {
        google: { x: 2, y: 3 },
        players: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
    },
    points: {
        google: 0,
        players: [0, 0],
    },
};
// </STATE>

// <PATTERN OBSERVER>
let _observers = [];
export const subscribe = (observer) => {
    _observers.push(observer);
};
export const unsubscribe = (observer) => {
    _observers = _observers.filter(o => observer !== o);
};
const _notifyObservers = (name, payload = {}) => {
    const event = {
        name,
        payload,
    };

    _observers.forEach(o => {
        try {
            o(event);
        } catch (e) {
            console.error(e)
        }
    });
};
// </PATTERN OBSERVER>

let googleJumpInterval;

// <INTERFACE>
export const getGooglePoints = async () => _state.points.google;

export const getPlayerPoints = async (playerNumber) => {
    const playerIndex = _getPlayerIndexByNumber(playerNumber, _state.points.players.length);

    return _state.points.players[playerIndex];
};

export const getGridSize = async () => {
    return { ..._state.settings.gridSize };
};

export const getGooglePosition = async () => ({ ..._state.positions.google });

export const getPlayerPosition = async (playerNumber) => {
    const playerIndex = _getPlayerIndexByNumber(playerNumber, _state.positions.players.length);
    return _state.positions.players[playerIndex];
}

export const getGameStatus = async () => {
    return _state.gameState;
};

export const start = () => {
    if (_state.gameState !== GAME_STATUS.SETTINGS) {
        throw new Error(`Invalid transition from ${_state.gameState}`);
    }

    _state.positions.players[0] = { x: 0, y: 0 };
    _state.positions.players[1] = {
        x: _state.settings.gridSize.columnsCount - 1,
        y: _state.settings.gridSize.rowsCount - 1
    };
    _jumpGoogleToNewPosition();

    _state.points = { google: 0, players: [0, 0] };

    googleJumpInterval = setInterval(() => {
        const prevPosition = { ..._state.positions.google };
        _jumpGoogleToNewPosition();
        _notifyObservers(EVENTS.GOOGLE_JUMPED, {
            prevPosition,
            currentPosition: { ..._state.positions.google },
        });

        _state.points.google++;
        _notifyObservers(EVENTS.POINTS_CHANGED);

        if (_state.points.google === _state.settings.pointsToLose) {
            clearInterval(googleJumpInterval);
            _state.gameState = GAME_STATUS.LOSE;
        }
        _notifyObservers(EVENTS.STATUS_CHANGED);
    }, _state.settings.googleJumpIntervalInMs);

    _state.gameState = GAME_STATUS.IN_PROGRESS;
    _notifyObservers(EVENTS.STATUS_CHANGED);
};

export const playAgain = () => {
    if (_state.gameState !== GAME_STATUS.WIN && _state.gameState !== GAME_STATUS.LOSE) {
        throw new Error(`Invalid transition from ${_state.gameState}`);
    }

    _state.gameState = GAME_STATUS.SETTINGS;
    _notifyObservers(EVENTS.STATUS_CHANGED);
};
// </INTERFACE>

const _generateIntegerNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const _jumpGoogleToNewPosition = () => {
    const newPosition = { ..._state.positions.google };

    do {
        newPosition.x = _generateIntegerNumber(0, _state.settings.gridSize.columnsCount - 1);
        newPosition.y = _generateIntegerNumber(0, _state.settings.gridSize.rowsCount - 1);

        var isNewPositionMatchesCurrentGooglePosition =
            newPosition.x === _state.positions.google.x &&
            newPosition.y === _state.positions.google.y;
        var isNewPositionMatchesCurrentPlayer1Position =
            newPosition.x === _state.positions.players[0].x &&
            newPosition.y === _state.positions.players[0].y;
        var isNewPositionMatchesCurrentPlayer2Position =
            newPosition.x === _state.positions.players[1].x &&
            newPosition.y === _state.positions.players[1].y;
    } while (
        isNewPositionMatchesCurrentGooglePosition ||
        isNewPositionMatchesCurrentPlayer1Position ||
        isNewPositionMatchesCurrentPlayer2Position
        );

    _state.positions.google = newPosition;
};

const _getPlayerIndexByNumber = (playerNumber, targetArrLength) => {
    const playerIndex = playerNumber - 1;

    if (playerIndex < 0 || playerIndex > targetArrLength - 1) {
        throw new Error('Invalid player number');
    }

    return playerIndex;
}
