

export const directions = {
    RIGHT: 0,
    RIGHT_DOWN: 45,
    DOWN: 90,
    LEFT_DOWN: 135,
    LEFT: 180,
    LEFT_UP: 225,
    UP: 270,
    RIGHT_UP: 315
};

export function getAngle(input) {
    if (input.left) {
        if (input.up) {
            return directions.LEFT_UP;
        } else if (input.down) {
            return directions.LEFT_DOWN;
        } else {
            return directions.LEFT;
        }
    } else if (input.right) {
        if (input.up) {
            return directions.RIGHT_UP;
        } else if (input.down) {
            return directions.RIGHT_DOWN;
        } else {
            return directions.RIGHT;
        }
    }

    if (input.up) {
        return directions.UP;
    } else if (input.down) {
        return directions.DOWN;
    }

    return null;
}