import React, { useRef, useState }  from 'react';
import { Canvas, extend, useFrame } from "@react-three/fiber"; 
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; 

import petzList from "../src/petz/petz"; 

//Elements
import Sphere from './components/sphere/Sphere';
import Skybox from './components/sphere/skybox/Skybox';

import './App.css';

extend({ OrbitControls }); 

const CameraControls = () => { 
  const { 
    camera,
    gl: { domElement }
  } = useThree(); 

  const controls = useRef()
  useFrame(() => controls.current.update()); 

  return (
    <orbitControls
    ref={controls}
    args={[camera, domElement]}
    autoRotate
    enableZoom = {false}
    autoRotateSpeed = {.3}
    />
  )
}

function App() {
  const [color, setColor] = useState("white");
  const [input, setInput] = useState("white");
  const [petz, setPetz] = useState([petzList[0], petzList[1], petzList[2], petzList[3], petzList[4], petzList[5]])

  const colorHandler = (e) => { 
    const regex = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i
    if (input.match(regex)) { 
      setColor(input)
    } else { 
      setColor("white")
      alert("Sorry, not a valid color! Use Hex colors :)")
    }
  }

  const randomPetzHandler = () => { 
    setPetz([
    petzList[Math.floor(Math.random() * petzList.length)],
    petzList[Math.floor(Math.random() * petzList.length)],
    petzList[Math.floor(Math.random() * petzList.length)],
    petzList[Math.floor(Math.random() * petzList.length)],
    petzList[Math.floor(Math.random() * petzList.length)],
    petzList[Math.floor(Math.random() * petzList.length)]
    ])
  }

  return (
    <div className = "total-canvas">
      <div className = "buttons">
        <div>
          <input onChange = {e => setInput(e.target.value)}></input>
          <button className = "color-button" onClick={colorHandler}>Change Sphere color</button>
        </div>
        <div>
          <button className = "petz-button" onClick = {randomPetzHandler}>Randomize Petz</button>
        </div>
      </div>
      <div className = "canvas-3d">
        <Canvas>
          <Sphere color ={color}/>
          <Skybox petz={petz}/>
          <CameraControls/>
        </Canvas>
      </div>
    </div>
  )
}

export default App;
