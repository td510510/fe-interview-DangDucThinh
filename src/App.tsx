// @ts-nocheck
import { Canvas, useLoader } from '@react-three/fiber'
import './App.css'
import { useState } from 'react'
import { Html, OrbitControls } from '@react-three/drei';
import { BackSide, TextureLoader } from 'three';
import { scene1Img, scene2Img, scene3Img, scene4Img } from './assets/360images';
import logo from './assets/logo/logo.png';
import footstep from './assets/footstep.png'

const scenesData = [
  { name: "scene1", position: [-50, -100, 50], url: scene1Img, link: 1 },
  { name: "scene2", position: [5, -3, 1], url: scene2Img, link: 2 },
  { name: "scene3", position: [-1, -3, -5], url: scene3Img, link: 3 },
  { name: "scene4", position: [1, -7, -10], url: scene4Img, link: 0 },
]

function App() {
  const [currentLink, setCurrentLink] = useState(0);
  const maps = useLoader(TextureLoader, scenesData.map(item => item.url));
  return (
    <>
      <Canvas id="canvas" camera={{ position: [0, 0, 0.1] }}>
        <OrbitControls enableZoom={false} />
        <group>
          <mesh>
            <sphereGeometry />
            <meshBasicMaterial map={maps[currentLink]} side={BackSide} />
          </mesh>
          <mesh position={scenesData[currentLink].position}>
            <sphereGeometry args={[20, 32, 32]} />
            <meshBasicMaterial color="black" />
            <Html style={{
              width: 75,
              height: 75,
            }} className="footstep" >
              <img src={footstep} alt="footstep" onClick={() => setCurrentLink(scenesData[currentLink].link)} />
            </Html>
          </mesh>
        </group>
      </Canvas>
      <a className='logo' href="https://vizion.space" target='_blank' rel='noopener' >
        <img src={logo} alt="logo" />
      </a>
    </>
  )
}

export default App
