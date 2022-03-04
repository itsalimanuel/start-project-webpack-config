import Page from 'classes/Page'

export default class Detail extends Page {
  constructor () {
    super({
      id: 'detail',

      element: '.detail',
      elements: {
        button: '.detail_title'
      }
    })
    this.create()
  }
}
