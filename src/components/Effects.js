import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { extend, useThree, useFrame } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'

import { mutation } from '../hooks/useStore'

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, SSAOPass })


export default function Effects() {
  const composer = useRef()
  const { scene, gl, size, camera, clock } = useThree()

  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame((state, delta) => {
    // const bloom = composer.current.passes[1]

    // if (mutation.gameOver) {
    //   bloom.strength = Math.max(1, 1 + Math.sin(clock.getElapsedTime() * 15))
    // }

    composer.current.render()
  }, 1)


  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[size.width, 1, 1, 0.4]} />
      <shaderPass attachArray="passes" args={[FXAAShader]} material-uniforms-resolution-value={[1 / size.width, 1 / size.height]} />
    </effectComposer>
  )
}