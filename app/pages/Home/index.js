import Page from 'classes/Page'

export default class Home extends Page {
  constructor () {
    super({
      id: 'home',

      element: '.home',
      elements: {
        title: '.home_title',
        link: '.home_button'
      }
    })
  }

  create () {
    super.create()
    this.elements.link.addEventListener('click', _ => console.log('you clicked me'))
  }
}
