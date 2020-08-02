export const GetItemByName = (name) => {
    return Items.find(x => x.Name === name);
}

export const GetItemFromNode = (name) => {
    return Items.find(x => x.From === name);
}

export const GetItemById = (id) => {
    return Items.find(x => x.Id === id);
}

const Items = [
    { Id: 0, Name: "Oak Log", Value: 5, ImageUrl: "", From: "Oak"},
    { Id: 1, Name: "Willow Log", Value: 5, ImageUrl: "", From: "Willow"},
    { Id: 2, Name: "Ash Log", Value: 5, ImageUrl: "", From: "Ash"},
    { Id: 3, Name: "Ebony Log", Value: 5, ImageUrl: "", From: "Ebony"},
    { Id: 4, Name: "Copper ore", Value: 5, ImageUrl: "", From: "Copper"},
    { Id: 5, Name: "Tin Ore", Value: 5, ImageUrl: "", From: "Tin"},
    { Id: 6, Name: "Iron Ore", Value: 5, ImageUrl: "", From: "Iron"},
    { Id: 7, Name: "Coal", Value: 5, ImageUrl: "", From: "Coal"},
    { Id: 8, Name: "Silver Ore", Value: 5, ImageUrl: "", From: "Silver"},
    { Id: 9, Name: "Gold Ore", Value: 5, ImageUrl: "", From: "Gold"},
    { Id: 10, Name: "Oak Log", Value: 5, ImageUrl: ""},
    { Id: 11, Name: "Oak Log", Value: 5, ImageUrl: ""},
    { Id: 12, Name: "Oak Log", Value: 5, ImageUrl: ""},
    { Id: 13, Name: "Oak Log", Value: 5, ImageUrl: ""},
    { Id: 14, Name: "Oak Log", Value: 5, ImageUrl: ""},
    { Id: 15, Name: "Oak Log", Value: 5, ImageUrl: ""},
    { Id: 16, Name: "Oak Log", Value: 5, ImageUrl: ""},
    { Id: 17, Name: "Oak Log", Value: 5, ImageUrl: "" },
]