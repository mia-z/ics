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
        this.wood = {
            Oak: 0,
            Willow: 0,
            Ash: 0,
            Ebony: 0
        };
        this.money = 0;
    }

    //AddWorker = (worker = new Worker()) => this.workers.push(worker);

    AddMoney = (money = 1) => this.money += money;
    AddOre = (ore, amount = 1) => {
        switch(ore) {
            case "Coal": this.ores.Coal += amount; return;
            case "Copper": this.ores.Copper += amount; return;
            case "Tin": this.ores.Tin += amount; return;
            case "Iron": this.ores.Iron += amount; return;
            case "Silver": this.ores.Silver += amount; return;
            case "Gold": this.ores.Gold += amount; return;
            default: return console.log("NOTHING PASSED: ERROR AT ADDORE FUNCTION IN USER OBJECT");
        }
    };
    AddWood = (wood, amount = 1) => {
        switch(wood) {
            case "Oak": this.wood.Oak += amount; return;
            case "Ash": this.wood.Ash += amount; return;
            case "Willow": this.wood.Willow += amount; return;
            case "Ebony": this.wood.Ebony += amount; return;
            default: return console.log("NOTHING PASSED: ERROR AT ADDWOOD FUNCTION IN USER OBJECT");
        }
    };
}