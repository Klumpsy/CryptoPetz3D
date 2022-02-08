import React, { useEffect, useState } from 'react';
import { useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";

function Skybox({ petz }) {
    const [images, setImages] = useState([])
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    const texture = loader.load([
        images[0],
        images[1],
        images[2],
        images[3],
        images[4],
        images[5]
    ]);
    scene.background = texture

    useEffect(() => {
        setImages(petz)
    }, [petz])

    return null
}

export default Skybox;

