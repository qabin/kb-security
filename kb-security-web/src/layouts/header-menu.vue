<template>
  <!-- 页眉的第一行是一个QToolbar -->
  <div>
    <q-toolbar style="max-height: 50px">
      <q-icon
        size="30px"
        name="security"/>
      <span class="text-weight-bold q-ml-md">安全攻防演练平台</span>

      <div class="absolute-right">
        <q-btn class="full-height shadow-0"
               @click.native=user_info_btn_click
               size="lg"
               icon="account_circle">
          <q-tooltip :offset="[5,5]">{{user_info_btn_tip()}}</q-tooltip>
        </q-btn>
        <q-btn class="full-height shadow-0"
               icon="import_contacts"
               size="lg"
               @click.native="open_url('https://blog.csdn.net/a787373009/article/category/9187978')"
        >
          <q-tooltip :offset="[5,5]">使用教程</q-tooltip>
        </q-btn>

        <q-btn class="full-height shadow-0"
               icon="star_border"
               size="lg"
               @click.native="open_url('https://github.com/qabin/kb-security')"
        >
          <q-tooltip :offset="[5,5]">源码地址</q-tooltip>
        </q-btn>

        <q-btn class="full-height shadow-0"
               icon="exit_to_app"
               size="lg"
               @click.native="$store.dispatch('user/logout')"
        >
          <q-tooltip :offset="[5,5]">退出</q-tooltip>
        </q-btn>
      </div>
    </q-toolbar>
  </div>
</template>

<script>
  export default {
    name: 'header-menu',
    mixins: [],
    components: {},
    props: {
      defaultMiniMenu: false,
    },
    data: () => {
      return {
        show_log_out: false
      }
    },
    computed: {
      // showMenu() {
      //   return this.$store.state.main.show_menu;
      // }
      userName () {
        return this.$store.state.user.login_name
      },
      isAdmin () {
        return this.$store.state.user.type === 2 ? true : false
      }
    },
    methods: {
      user_info_btn_click () {
        if (this.userName) {
          //this.$router.push({path: '/user/update'})
        } else {
          this.$router.push(({path: '/login'}))
        }
      },
      user_info_btn_tip () {
        if (this.userName) {
          return '欢迎，' + this.userName
        } else {
          return '登录/注册'
        }
      },
      open_url(url){
        window.open(url,'_blank')
      }
    }
  }
</script>

<style scoped>
  .q-toolbar {
    padding-top: 0;
    padding-bottom: 0;
  }

  a {
    color: white;
    text-decoration: none;
  }

  .menu_toggle {
    cursor: pointer !important;
    padding: 12px;
    transition: transform 0.2s;
    width: 50px;
    font-size: 26px;
  }

  .menu_toggle.active {
    transform: rotate(90deg);
  }

  .icon {
    padding: 0px 40px;
    max-width: 25px
  }

</style>
