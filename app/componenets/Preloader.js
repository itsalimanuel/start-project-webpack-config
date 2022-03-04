import gsap from 'gsap'
import eatch from 'lodash/each'
import Component from '../classes/Component'

export default class Preloader extends Component {
  constructor () {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader_text',
        number: '.preloader_number',
        images: document.querySelectorAll('img')
      }
    })

    this.length = 0

    this.createLoader()
  }

  createLoader () {
    eatch(this.elements.images, element => {
      element.onload = _ => this.onAssetsLoaded(element)
      element.src = element.getAttribute('data-src')
    })
  }

  onAssetsLoaded (image) {
    this.length += 1
    const precent = this.length / this.elements.images.length

    this.elements.number.innerHTML = `${Math.round(precent * 100)}%`

    if (precent === 1) {
      this.onLoaded()
    }
  }

  onLoaded () {
    return new Promise(resolve => {
      this.animteOut = gsap.timeline({
        delay: 1
      })
      this.animteOut.to(this.element, {
        autoAlpha: 0
      })
      this.animteOut.call(_ => {
        this.emit('completed')
      })
    })
  }

  destroy () {
    this.element.parentNode.removeChild(this.element)
  }
}
