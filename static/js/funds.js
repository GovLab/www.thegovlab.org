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

  el: '#funds',

  data () {
    return {
      fundData: [],
      more_body: false,
      meta_title: 'The GovLab | Our Transparency',
      meta_content: 'GovLab Grants and Contracts since 2013.',
      apiURL: 'https://directus.thegovlab.com/'
    }
  },
  metaInfo () {
        return {
          title: this.meta_title,
          meta: [
            {title: this.meta_title, property:'og:title'},
      {  name: 'description', content: this.meta_content, property:'og:description'}
    ]
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
  'funders',
  {
    sort: 'name',
    fields: ['*.*']
  }
).then(data => {
  console.log(data);
  self.fundData = data.data;

})
.catch(error => console.error(error));
    },
    currency(amount) {
      var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
});
return formatter.format(amount);
    }
  }
});
