import store from '../store/index'

const left_menu_data = [
  {
    label: '首页',
    to: '/home',
    icon: 'home',
  },
  {
    label: '聊天室',
    to: '/chat_room',
    icon: 'forum',
  },
  {
    label: '聊天记录',
    to: '/chat_list',
    icon: 'list_alt',
  },
  {
    label: 'XSS劫持平台',
    to: '/xss_platform',
    icon: 'beach_access',
  },
]

const left_menu_data_admin = [
  {
    label: '首页',
    to: '/home',
    icon: 'home',
  },
  {
    label: '聊天室',
    to: '/chat_room',
    icon: 'forum',
  },
  {
    label: '聊天记录',
    to: '/chat_list_admin',
    icon: 'list_alt',
  },
  {
    label: 'XSS劫持平台',
    to: '/xss_platform',
    icon: 'beach_access',
  },
]

export {left_menu_data, left_menu_data_admin}

const route_menu_cache = {}

const cache_route = (path, item) => {
  route_menu_cache[path] = item
}

export const route2menu = (path) => {
  if (route_menu_cache[path]) {
    return route_menu_cache[path]
  }
  let res = []
  let menu_data = store.state.user.type === 2 ? left_menu_data_admin : left_menu_data
  for (let i in menu_data) {
    let item = menu_data[i]
    if (item.to === path && !item.ignore) {
      res.push(item)
    } else if (item.children) {
      for (let j in item.children) {
        let child_item = item.children[j]
        if (child_item.to && child_item.to === path) {
          res.push(item)
          res.push(child_item)
        }
      }
    }
  }
  cache_route(path, res)
  return res;
};
