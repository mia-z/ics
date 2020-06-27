import Worker from "./Worker";

export default class User {
    constructor(name = "Worker Dude") {
        this.username = name;
        this.ores = {
            Coal: 0,
            Copper: 0,
            Tin: 0,
            Iron: 0,
            Silver: 0,
            Gold: 0
        };
        this.money = 0;
        this.workers = [];
        this.wood = 0;
    }

    AddWorker = (worker = new Worker()) => this.workers.push(worker);
    AddMoney = (money = 1) => this.money += money;
    AddWood = (wood = 1) => this.wood += wood;
    AddOre = (ore, amount = 1) => {
        switch(ore) {
            case "Coal": this.ores.Coal += amount; return;
            case "Copper": this.ores.Copper += amount; return;
            case "Tin": this.ores.Tin += amount; return;
            case "Iron": this.ores.Iron += amount; return;
            case "Silver": this.ores.Silver += amount; return;
            case "Gold": this.ores.Gold += amount; return;
            default: throw "NOTHING PASSED: ERROR AT ADD ORE";
        }
    }
}