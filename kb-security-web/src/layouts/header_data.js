const conf = {
  '/api_list/matchDeal': [{is: 'api-list-header-tabs'}],
  '/api_list/bid': [{is: 'api-list-header-tabs'}],
};

import ApiListHeaderTabs from "../pages/apilist/apilist_header_tabs";

export default {
  components: {
    ApiListHeaderTabs,
  },
  computed: {
    routeComp() {
      return conf[this.$route.path];
    }
  },
};
