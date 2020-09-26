export const GetImages = (nodes) => {
    switch(nodes) {
        case "Gathering": return NodeNames.map(name => {
            return new Image(
                name,
                `${process.env.PUBLIC_URL}/Assets/${name}.png`
            );
        });

        default: return nodes.map(name => {
            return new Image(
                name,
                `${process.env.PUBLIC_URL}/Assets/${name}.png`
            )
        });
    }
}

export const GetSvg = (array) => {
    let imageArray = [];
    array.map(name => {
        return imageArray.push(new Image(
            name,
            `${process.env.PUBLIC_URL}/Assets/${name}.svg`
        ));
    });
    return imageArray;
}

class Image {
    constructor(name, url) {
        this.ImageName = name;
        this.ImageUrl = url;
    }
}
const NodeNames = [
    "Oak", "Ash", "Willow", "Ebony",
    "Copper", "Tin", "Coal", "Silver", "Gold", "Iron"
]