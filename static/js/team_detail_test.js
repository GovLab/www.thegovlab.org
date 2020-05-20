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



new Vue({

  el: '#teamdetail',

  data () {
    return {
      memberData: [],
      more_body: false,
      news_toggle:false,
      publications_toggle:false,
      projects_toggle:false,
      apiURL: 'https://directus.thegovlab.com/thegovlab/items/team?filter[slug][like]=',
      apiApp: '&fields=*.*,books.books_id.*,videos.directus_files_id.*,projects.projects_id.*'

    }
  },

  created: function created() {
    this.memberslug=window.location.pathname.split('/');
    this.memberslug = this.memberslug[this.memberslug.length - 1].split('.')[0];
    console.log(this.memberslug);
    this.fetchTeamDetail();
  },

  methods: {

    fetchTeamDetail() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "thegovlab",
        storage: window.localStorage
      });

      client.getItems(
  'team',
  {
    filter: {
      // slug: self.memberslug,
      slug: 'stefaan-verhulst'
    },
    fields: ['*.*','books.books_id.*','videos.directus_files_id.*','books.books_id.picture.*','projects.projects_id.*']
  }
).then(data => {
  console.log(data);
  self.memberData = data.data[0];
})
.catch(error => console.error(error));
    },
    toggle(key) {
      if(this[key+'_toggle'] == false) this[key+'_toggle'] = true;
      else this[key+'_toggle'] = false;
      console.log(this[key+'_toggle']);
    },
    teamMore(slug) {
      window.location.href= slug+'.html';
    }
  }
});
