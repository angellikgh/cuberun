import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

import { CUBE_AMOUNT, PLANE_SIZE, COLORS, WALL_RADIUS } from '../constants'
import { useStore, mutation } from '../state/useStore'

import randomInRange from '../util/randomInRange'
import distance2D from '../util/distance2D'

const negativeBound = -(PLANE_SIZE / 2) + WALL_RADIUS / 2
const positiveBound = (PLANE_SIZE / 2) - WALL_RADIUS / 2

export default function InstancedCubes() {
  const mesh = useRef()
  const material = useRef()

  const ship = useStore(s => s.ship)

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const cubes = useMemo(() => {
    // Setup initial cube positions
    const temp = []
    for (let i = 0; i < CUBE_AMOUNT; i++) {
      const x = randomInRange(negativeBound, positiveBound)
      const y = 10
      const z = -800 + randomInRange(-400, 400)

      temp.push({ x, y, z })
    }
    return temp
  }, [])

  useFrame((state, delta) => {
    cubes.forEach((cube, i) => {
      if (ship.current) {
        const distanceToShip = distance2D(ship.current.position.x, ship.current.position.z, cube.x, cube.z)

        if (distanceToShip < 12) {
          mutation.gameSpeed = 0
          mutation.gameOver = true
        }

        if (cube.z - ship.current.position.z > 15) {
          cube.z = ship.current.position.z - 800 // + randomInRange(-400, 400)
          cube.x = randomInRange(negativeBound, positiveBound)
        }
      }

      material.current.color = mutation.globalColor

      dummy.position.set(
        cube.x,
        cube.y,
        cube.z
      )

      // apply changes to dummy and to the instanced matrix
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })

    // Tells THREE to draw the updated matrix, I guess?
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, CUBE_AMOUNT]}>
      <boxBufferGeometry args={[20, 20, 20]} />
      <meshBasicMaterial ref={material} color={COLORS[0].three} />
    </instancedMesh>
  )
}