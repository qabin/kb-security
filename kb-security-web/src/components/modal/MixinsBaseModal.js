export default {
  data: () => ({
    opened: false,
    loading: false,
    minWidth: '500px',
    maxWidth: '500px',
    minHeight: '80vh',
    noBackdropDismiss: true
  }),
  methods: {
    /* abstract methods start */
    title(h) {
      return 'title'
    },
    init(model) {
    },
    submit({done, close}) {
    },
    cancel() {
    },
    render_contents(h) {
      return []
    },
    /* abstract methods end */
    show(model) {
      this.opened = true;
      this.__init(model);
    },
    __init(model) {
      this.loading = false;
      this.init(model);
      this.$v && this.$v.model && this.$v.model.$reset();
    },
    __submit() {
      let vm = this;
      let done = () => vm.loading = false;
      let close = () => vm.opened = vm.loading = false;

      this.$v && this.$v.model && this.$v.model.$touch();
      if (!this.$v.model.$error) {
        this.submit({done, close})
      }
    },
    __render_close_icon(h) {
      return h('q-icon', {
        staticClass: 'absolute-top-right bg-white text-faded cursor-pointer pp-selectable-color-red',
        style: {
          borderRadius: '50%',
          transform: 'translate(40%, -40%)',
          zIndex: '1',
          fontSize: '20px'
        },
        nativeOn: {
          click: this.cancel
        },
        props: {name: 'cancel'},
        directives: [{name: 'close-overlay'}]
      })
    },
    __render_modal_layout(h) {
      return [
        this.__render_title(h),
        h('div', {staticClass: 'full-width bg-grey-5', style: {height: '1px'}}),
        this.__render_contents(h),
        this.__render_footer(h)
      ]
    },
    __render_contents(h) {
      return h('div', {
        style: {
          padding: '16px 48px',
          maxHeight: `calc(${this.minHeight} - 43px - 45px)`,
          overflow: 'auto'
        }
      }, [
        this.render_contents(h),
      ])
    },
    __render_title(h) {
      return h('div', {
        staticClass: 'font-14 text-weight-bold',
        style: {margin: '13px 32px'}
      }, [
        this.title(h)
      ])
    },
    __render_footer(h) {
      return h('div', {staticClass: 'row reverse', style: {height: '40px'}}, [
        h('q-btn', {
          staticClass: 'text-faded q-pt-none q-mt-xs q-pb-none q-mb-xs q-mr-sm',
          style: {minHeight: '32px', height: '32px'},
          props: {label: '取消', flat: true, size: 'md'},
          on: {
            click: this.cancel
          },
          directives: [{name: 'close-overlay'}]
        }),
        h('q-btn', {
          staticClass: 'text-primary q-pt-none q-mt-xs q-pb-none q-mb-xs q-mr-sm',
          style: {minHeight: '32px', height: '32px'},
          props: {label: '确定', flat: true, size: 'md'},
          on: {
            click: this.__submit
          }
        })
      ])
    }
  },

  render(h) {
    return h('q-modal', {
      staticClass: 'pjm-modal font-13',
      props: {
        contentCss: {minWidth: this.minWidth, maxWidth: this.maxWidth},
        value: this.opened,
        noBackdropDismiss: this.noBackdropDismiss
      },
      on: {
        input: (v) => this.opened = v
      }
    }, [
      this.__render_close_icon(h),
      this.__render_modal_layout(h)
    ])
  }
}
