export const GetImages = (array) => {
    let imageArray = [];
    array.map(name => {
        return imageArray.push(new Image(
            name,
            `${process.env.PUBLIC_URL}/Assets/${name}.png`
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