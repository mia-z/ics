export class Tile {
    constructor(x, y, state = TileStates.UNAVAILABLE, selected = false) {
        this.selected = selected;
        this.state = state;
        this.x = x;
        this.y = y;
        this.biome = SetBiome(random());
        this.maxPlots = SetPlotAmt(this.biome);
        this.plotsInUse = 0;
        this.houses = 0;
        this.availableLivingSpots = 0;
        this.treeNodes = [];
    }

    explore()  {
        this.state = TileStates.EXPLORED;
    }

    control() {
        this.state = TileStates.CONTROLLED;
    }

    setUnexplored() {
        this.state = TileStates.UNEXPLORED;
    }

    unselect() {
        this.selected = false;
    }

    select() {
        this.selected = true;
    }

    buildHouseOnPlot() {
        this.plotsInUse += 1;
        this.houses += 1;
        this.availableLivingSpots += 5;
    }

    assignWorkerToHouse() {
        this.availableLivingSpots -= 1;
    }

    canBuild = () => 
        this.plotsInUse < this.maxPlots;

    canAssignWorker = () => 
        this.availableLivingSpots <= this.houses * 5 && this.availableLivingSpots > 0;
    
}

const SetBiome = (rand) => {
        if (rand > 50) return "Grassland";
        else if (rand <= 50 && rand > 25) return "Woodland";
        else if (rand <= 25 && rand > 10) return "Tundra";
        else if (rand <= 10 && rand > 1) return "Desert";
        else return "Celestial";
}

const SetPlotAmt = (biome) => {
    switch(biome) {
        case "Grassland": return 5;
        case "Woodland": return 6;
        case "Tundra": return 8;
        case "Desert": return 10;
        case "Celestial": return 15;
        default: return ":thinking emoji: aka u shouldnt be seeing this ";
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
    grid[0][0].state = TileStates.CONTROLLED;
    grid[0][1].state = TileStates.UNEXPLORED;
    grid[1][0].state = TileStates.UNEXPLORED;
    return grid;
}

export const RefreshGrid = (old) => {
    let newGrid = [];
    for (let c = 0; c < old.length; c++) {
        newGrid.push([...old[c]]);
    }
    return newGrid;
}

const random = () => Math.round(Math.random() * 100);

export const TileStates = {
    UNAVAILABLE: "UNAVAILABLE",
    EXPLORED: "EXPLORED",
    UNEXPLORED: "UNEXPLORED",
    CONTROLLED: "CONTROLLED"
}

export default Tile;