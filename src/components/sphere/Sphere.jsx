import React, { useState } from 'react';
import { useFrame, useThree } from "@react-three/fiber";
import { LinearMipmapLinearFilter, WebGLCubeRenderTarget, RGBFormat, CubeCamera } from 'three';

function Sphere({ color }) {
    const { gl, scene } = useThree();

    const cubeRenderTarget = new WebGLCubeRenderTarget(512, {
        format: RGBFormat,
        generateMipmaps: true,
        minFilter: LinearMipmapLinearFilter
    })
    const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget)
    cubeCamera.position.set(0, 0, 0);
    scene.add(cubeCamera);

    useFrame(() => cubeCamera.update(gl, scene))

    return (
        <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow>
            <sphereGeometry attach="geometry" args={[2, 256, 256]} />
            <meshBasicMaterial
                attach="material"
                envMap={cubeCamera.renderTarget.texture}
                color={color}
                roughness={.1}
                metalness={1}
            />
        </mesh>
    )
}

export default Sphere