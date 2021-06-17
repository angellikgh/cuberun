import * as THREE from 'three'

export const PLANE_SIZE = 1000

export const CUBE_AMOUNT = 100

export const INITIAL_GAME_SPEED = 0.6

export const GAME_SPEED_MULTIPLIER = 0.3

export const WALL_RADIUS = 40

export const COLORS = [
  {
    name: 'red',
    hex: '#ff2919',
    three: new THREE.Color(0xff2919) //  0xff3021 #ff1e0d
  },
  {
    name: 'orange',
    hex: '#bd4902',
    three: new THREE.Color(0xbd4902) //0xcc4e00
  },
  {
    name: 'green',
    hex: '#26a300',
    three: new THREE.Color(0x26a300) // 0x2ec200
  },
  {
    name: 'blue',
    hex: '#217aff',
    three: new THREE.Color(0x217aff)
  },
  {
    name: 'purple',
    hex: '#9370D8',
    three: new THREE.Color(0x6942b8)
  },
  {
    name: 'pink',
    hex: '#ff69b4',
    three: new THREE.Color(0xff2190)
  },
  {
    name: 'white',
    hex: '#ffffff',
    three: new THREE.Color(0x6b6b6b) // 0x828282
  },
  {
    name: 'black',
    hex: '#000000',
    three: new THREE.Color(0xCCCCCC)
  }
]
