import Page from '../../classes/Page'

export default class Cases extends Page {
  constructor () {
    super({
      id: 'cases',

      element: '.cases',
      elements: {
        title: '.cases_title'
      }
    })
    this.create()
  }
}
