import CompXssListCatalogNew from './comp_xsslist_catalog_new'

export default {
  name: 'xss_list_index',
  data: () => ({}),
  methods: {},
  render (h) {
    return h('div', {}, [
      h(CompXssListCatalogNew,{
        ref:'CompXssListCatalog'
      })
    ])
  }
}
