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

  el: '#job-board',

  data () {
    return {
      jobData: [],
      jobs_toggle:false,
      apiURL: 'https://directus.thegovlab.com/'
    }
  },

  created: function created() {
    this.fetchTeam();
  },
  methods: {

    fetchTeam() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "thegovlab",
        storage: window.localStorage
      });

      client.getItems(
  'jobs',
  {
    fields: ['*.*']
  }
).then(data => {
  console.log(data);
  self.jobData = data.data;

})
.catch(error => console.error(error));
    },
    toggle(key) {
      if(this[key+'_toggle'] == false) this[key+'_toggle'] = true;
      else this[key+'_toggle'] = false;
      console.log(this[key+'_toggle']);
    }
  }
});
