import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import useStore from '../hooks/useGameState'

const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

export default function Ground() {
  // const ground = useRef()
  // const setGroundPosition = useStore(state => state.setGroundPosition)
  // const speed = useStore(state => state.speedFactor)
  // const increaseSpeed = useStore(state => state.increaseSpeed)

  // const [color, setColor] = useState(randomColor)

  // useFrame(() => {
  //   ground.current.position.z += speed

  //   if (ground.current.position.z >= 5000) {
  //     ground.current.position.z = 0
  //     increaseSpeed()
  //     setColor(randomColor)
  //   }
  //   setGroundPosition(ground.current.position.z)
  // })
  // Returns a mesh at GROUND_HEIGHT below the player. Scaled to 5000, 5000 with 128 segments.
  // X Rotation is -Math.PI / 2 which is 90 degrees in radians.
  // return (
  //   <mesh
  //     visible
  //     position={[0, -50, 0]}
  //     rotation={[-Math.PI / 2, 0, 0]}
  //     ref={ground}
  //   >
  //     <planeBufferGeometry attach="geometry" args={[20000, 20000, 256, 256]} />
  //     <meshStandardMaterial
  //       attach="material"
  //       color={`#${color}`}
  //       roughness={1}
  //       metalness={0}
  //       wireframe={true}
  //       roughness={1}
  //     />
  //   </mesh>
  // )

  const ground = useRef()
  const setGroundPosition = useStore(state => state.setGroundPosition)
  const speed = useStore(state => state.speedFactor)
  const increaseSpeed = useStore(state => state.increaseSpeed)

  const [color, setColor] = useState(randomColor)

  useFrame(() => {
    ground.current.position.z += speed

    if (ground.current.position.z >= 5000) {
      ground.current.position.z = 0
      increaseSpeed()
      setColor(randomColor)
    }

    setGroundPosition(ground.current.position.z)
  })

  return (
    <gridHelper ref={ground} rotation={[0, 0, 0]} position={[0, -20, 0]} args={[20000, 400, `#${color}`, `#${color}`]} />
  )
}