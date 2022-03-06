import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import fragment from './webgl/homepage/shader/fragment.glsl'
import vertex from './webgl/homepage/shader/vertex.glsl'

import * as dat from 'dat.gui'

// import img1 from './webgl/homepage/img/1.jpg'
// import img2 from './webgl/homepage/img/2.jpg'
// import img3 from './webgl/homepage/img/3.jpg'
// import img4 from './webgl/homepage/img/4.jpg'

export default class Sketch {
  constructor (options) {
    this.scene = new THREE.Scene()

    this.container = options.dom
    this.width = this.container.offsetWidth
    this.hegiht = this.container.offsetHeight
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.window, this.hegiht)
    this.renderer.setClearColor(0xeeeeee, 1)
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding

    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    )

    this.camera.position.set(0, 0, 2)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.time = 0

    this.isPlaying = true

    this.addObjects()
    this.resize()
    this.render()
    this.setupResize()
  }

  settings () {
    // eslint-disable-next-line no-unused-vars
    const that = this
    this.settings = {
      progress: 0
    }
    this.gui = new dat.GUI()
    this.gui.add(this.settings, 'progress', 0, 1, 0.01)
  }

  setupResize () {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize () {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  addObjects () {
    // eslint-disable-next-line no-unused-vars
    const that = this
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable'
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() }
      },

      vertexShader: vertex,
      fragmentShader: fragment
    })

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)

    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.plane)
  }

  stop () {
    this.isPlaying = false
  }

  play () {
    if (!this.isPlaying) {
      this.render()
      this.isPlaying = true
    }
  }

  render () {
    if (!this.isPlaying) return
    this.time += 0.05
    this.material.uniforms.time.value = this.time
    // eslint-disable-next-line no-undef
    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

new Sketch({
  dom: document.getElementById('webgl')
})
