import {ajax_get_user_info, ajax_login_in, ajax_login_out} from "../../api/user/user_login_api";
import {notify_err, notify_ok} from '../../plugins/PpNotify'
import router from '../../router/index'
import localStorage from '../../utils/localStorage'

const getHello = (name) => {
  let hour = new Date().getHours();
  if (hour < 9)
    return '劳模你好早！';
  else if (hour < 11)
    return '早上好！' + name;
  else if (hour < 12)
    return '你好 ' + name;
  else if (hour < 19)
    return '下午好！' + name;
  else if (hour < 22)
    return '晚上好！';
  else
    return '劳模注意身体啊！'
};

export const getUserInfo = ({state}) => {
  return new Promise((resolve, reject) => {
    state.is_login
      ? resolve()
      : ajax_get_user_info()
        .then(d => {
          state.login_name = d.data.login_name;
          state.type = d.data.user_type;
          state.login_id = d.login_id;
          state.mail = d.mail;
          state.status = d.status;
          state.is_admin = d.is_admin;
          state.roles = [].concat(d['group_roles']).concat(d['user_roles']);
          state.user_roles = d['user_roles'] || [];
          state.group_roles = d['group_roles'] || [];
          state.groups = d.groups;
          state.tcm_account = d.tcm_account;
          state.is_login = true;
          resolve()
        })
        .catch((e) => {
          // notify_err('获取用户信息异常');
          // reject(e)
        })
  })
};


export const clearLoginState = ({state}) => {
  return new Promise((r, j) => {
    state.is_login = false;
    r();
    router.push({name: "Login"})
  });
};

export const login = (context, form) => {
  return new Promise((r, j) => {
    ajax_login_in(form)
      .then(() => {
        localStorage.set('isLogin', true);
        getUserInfo(context)
          .then(() => {
            r();
            notify_ok(getHello(context.state.name));
            router.push({path: "/home"});
          })
          .catch(j)
      })
      .catch(j);
  });
};

export const logout = (context) => {
  return new Promise((r, j) => {
    ajax_login_out()
      .then(() => {
        notify_ok('已登出系统');
        localStorage.set('isLogin', false);
        clearLoginState(context).then(r).catch(j)
        router.push({path:'/login'})
      })
      .catch(j)

  })
};
