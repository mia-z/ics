export class Tile {
    constructor(x, y, state = "UNAVAILABLE", selected = false) {
        this.selected = selected;
        this.state = state;
        this.x = x;
        this.y = y;
    }

    purchase()  {
        this.state = "PURCHASED";
    }

    setUnpurchased() {
        this.state = "UNPURCHASED";
    }

    unselect() {
        this.selected = false;
    }

    select() {
        this.selected = true;
    }
}

export const InitGrid = () => {
    let grid = [];
    let rows = 11;
    for (let y = 0; y < rows; y++) {
        let rowToAdd = [];
        for (let x = 0; x < rows; x++) {
            rowToAdd.push(new Tile(x, y));
        }
        grid.push(rowToAdd);
    }
    grid[0][0].state = "PURCHASED";
    grid[0][1].state = "UNPURCHASED";
    grid[1][0].state = "UNPURCHASED";
    return grid;
}

export const RefreshGrid = (old) => {
    let newGrid = [];
    for (let c = 0; c < old.length; c++) {
        newGrid.push([...old[c]]);
    }
    return newGrid;
}

export default Tile;