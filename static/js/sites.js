////////////////////////////////////////
// reload page after Forward and back
///////////////////////////////////////

const TYPE_BACK_FORWARD = 2;

function isReloadedPage() {
  return performance.navigation.type === TYPE_BACK_FORWARD;
}

function main() {
  if (isReloadedPage()) {
    window.location.reload();
  }
}
main();

////////////////////////////////////////////////////////////
///// TEAM  API REQUEST ` `
////////////////////////////////////////////////////////////


Vue.use(VueMeta);
new Vue({

  el: '#site-page',

  data () {
    return {
      sitesData: [],
      apiURL: 'https://directus.thegovlab.com/thegovlab/items/sites'
    }
  },
  created: function created() {
    this.fetchSites();
  },
  methods: {

    fetchSites() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "thegovlab",
        storage: window.localStorage
      });

      client.getItems(
  'sites',
  {
    fields: ['*.*','thumbnail.*']
  }
).then(data => {
  self.sitesData = data.data;

})
.catch(error => console.error(error));
    }
  }
});
