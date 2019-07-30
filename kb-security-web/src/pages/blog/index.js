import CompLeftCataLog from './comp_left_catalog'
import CompRightDetail from './comp_right_detail'
export default {
  name: 'blog_index',
  data: () => ({}),
  methods: {},
  render (h) {
    return h('div', {
      staticClass:'row col-12 q-mt-md'
    }, [
      h('div',{
        staticClass: 'col-2 pp-border-5 fixed',
        style:{
          borderLeft:'0px solid #FFF',
          height:'100vh',
        }
      },[
        h(CompLeftCataLog,{
          ref:'CompLeftCataLog',
          on:{
            select:(v)=>this.$refs.CompRightDetail.refresh_content(v.content)
          }
        })
      ]),
      h('div',{
        staticClass:'col-10 q-pl-md',
        style:{
          marginLeft:'17%',
        }

      },[
        h(CompRightDetail,{
          ref:'CompRightDetail'
        })
      ])
    ])
  }
}
