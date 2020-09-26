import { TreeNodes, MiningNodes } from "../GameNodes";

export class Tile {
    constructor(x, y, state = TileStates.UNAVAILABLE, selected = false) {
        this.selected = selected;
        this.state = state;
        this.x = x;
        this.y = y;
        this.biome = SetBiome();
        this.gatheringNodes = GenerateNodes(this.biome);
    }
}

const SetBiome = (rand = random()) => {
        if (rand > 50) return "Grassland";
        else if (rand <= 50 && rand > 25) return "Woodland";
        else if (rand <= 25 && rand > 15) return "Tundra";
        else if (rand <= 15 && rand > 1) return "Desert";
        else return "Celestial";
}

const GenerateNodes = (biome, r = random()) => {
    let treesToUse;
    let oresToUse;

    let returnList = [];

    let rand = r;

    switch (biome) {
        case "Grassland":
            if (rand > 50) {
                treesToUse = [{tree: "Oak", amount: randomBounds(2, 8)}];
                break;
            }
            else if (rand <= 50 && rand > 25) {
                treesToUse = [{tree: "Oak", amount: randomBounds(10, 15)}];
                break;
            }
            else {
                treesToUse = [{tree: "Oak", amount: randomBounds(2, 8)}, {tree: "Willow", amount: randomBounds(1, 4)}];
                break;
            }
        case "Woodland":
            if (rand > 40) {
                treesToUse = [{tree: "Oak", amount: randomBounds(5, 15)}, {tree: "Willow", amount: randomBounds(4, 8)}];
                break;
            }
            else if (rand <= 40 && rand > 10) {
                treesToUse = [{tree: "Willow", amount: randomBounds(10, 15)}];
                break;
            }
            else {
                treesToUse = [{tree: "Willow", amount: randomBounds(15, 20)}, {tree: "Ash", amount: randomBounds(3, 5) }];
                break;
            }
        case "Tundra":
            if (rand > 60) {
                treesToUse = [{tree: "Ash", amount: randomBounds(5, 10)}];
                break;
            }
            else if (rand <= 60 && rand > 25) {
                treesToUse = [{tree: "Ash", amount: randomBounds(10, 15)}];
                break;
            }
            else {
                treesToUse = [{tree: "Ash", amount: randomBounds(20, 25)}];
                break;
            }
        case "Desert": {
            treesToUse = [];
            break;
        }
        case "Celestial": {
            treesToUse = [{tree: "Ebony", amount: randomBounds(1, 3)}];
            break;
        }
        default: return ":thinking emoji: aka u shouldnt be seeing this ";
    }

    treesToUse.forEach(item => {
        let tree = TreeNodes.find(x => x.name === item.tree);
        let collection = [];
        for (let x = 0; x < item.amount; x++) {
            collection.push(tree);
        }
        returnList.push(collection);
    });

    switch (biome) {
        case "Grassland":
            if (rand > 30) {
                oresToUse = [{ore: "Copper", amount: randomBounds(2, 8)}];
                break;
            }
            else if (rand <= 30 && rand > 10) {
                oresToUse = [{ore: "Copper", amount: randomBounds(10, 15)}, {ore: "Tin", amount: randomBounds(5, 15)}];
                break;
            }
            else {
                oresToUse = [{ore: "Copper", amount: randomBounds(15, 25)}, {ore: "Tin", amount: randomBounds(15, 20)}];
                break;
            }
        case "Woodland":
            if (rand > 50) {
                oresToUse = [{ore: "Copper", amount: randomBounds(10, 15)}, {ore: "Tin", amount: randomBounds(10, 15)}];
                break;
            }
            else if (rand <= 50 && rand > 10) {
                oresToUse = [{ore: "Coal", amount: randomBounds(5, 25)}];
                break;
            }
            else {
                oresToUse = [{ore: "Coal", amount: randomBounds(25, 30)}];
                break;
            }
        case "Tundra":
            if (rand > 20) {
                oresToUse = [{ore: "Coal", amount: randomBounds(10, 15)}, {ore: "Iron", amount: randomBounds(20, 25)}];
                break;
            }
            else {
                oresToUse = [{ore: "Gold", amount: randomBounds(3, 5)}];
                break;
            }
        case "Desert":
            if (rand > 50) {
                oresToUse = [{ore: "Silver", amount: randomBounds(3, 10)}, {ore: "Gold", amount: randomBounds(1, 5)}];
                break;
            }
            else if (rand <= 50 && rand > 10) {
                oresToUse = [{ore: "Silver", amount: randomBounds(10, 25)}];
                break;
            }
            else {
                oresToUse = [{ore: "Gold", amount: randomBounds(5, 15)}];
                break;
            }
        case "Celestial": {
            oresToUse = [{ore: "Gold", amount: randomBounds(10, 15)}];
            break;
        }
        default: return ":thinking emoji: aka u shouldnt be seeing this ";
    }

    oresToUse.forEach(item => {
        let ore = MiningNodes.find(x => x.name === item.ore);
        let collection = [];
        for (let x = 0; x < item.amount; x++) {
            collection.push(ore);
        }
        returnList.push(collection);
    });

    return returnList;
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
    grid[0][0].state = TileStates.EXPLORED;
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

const randomBounds = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const TileStates = {
    UNAVAILABLE: "UNAVAILABLE",
    EXPLORED: "EXPLORED",
    UNEXPLORED: "UNEXPLORED",
}

export default Tile;