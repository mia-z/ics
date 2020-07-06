import React, {useEffect} from "react";
import Styled from "styled-components";
import Parallax from "parallax-js";

const layers = [
    {
        name: "cloudsOne",
        image: `${process.env.PUBLIC_URL}/Assets/Parallax/clouds_1.png`,
        dataDepth: "-0.05"
    },
    {
        name: "cloudsTwo",
        image: `${process.env.PUBLIC_URL}/Assets/Parallax/clouds_2.png`,
        dataDepth: "0.1"
    },
    {
        name: "cloudsThree",
        image: `${process.env.PUBLIC_URL}/Assets/Parallax/clouds_3.png`,
        dataDepth: "-0.05"
    },
    {
        name: "cloudsFour",
        image: `${process.env.PUBLIC_URL}/Assets/Parallax/clouds_4.png`,
        dataDepth: "0.1"
    },
    {
        name: "rocksOne",
        image: `${process.env.PUBLIC_URL}/Assets/Parallax/rocks_1.png`,
        dataDepth: "0"
    },
    {
        name: "rocksTwo",
        image: `${process.env.PUBLIC_URL}/Assets/Parallax/rocks_2.png`,
        dataDepth: "0"
    },
]

const Container = Styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: url(${process.env.PUBLIC_URL}/Assets/Parallax/sky.png);
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -5;
`;

export const ParallaxBg = () => {
    useEffect(() => {
        const scene = document.getElementById("scene");
        new Parallax(scene);
    });

    return(
        <Container>
            <div id="scene">
                {layers.map((layer, index) => (
                    <img
                        key={index}
                        data-depth={layer.dataDepth}
                        src={layer.image}
                        alt={layer.name}
                    />
                ))}
            </div>
        </Container>
    );
}

export default ParallaxBg;