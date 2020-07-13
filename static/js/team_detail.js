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

  el: '#teamdetail',

  data () {
    return {
      memberData: [],
      more_body: false,
      news_toggle:false,
      publications_toggle:false,
      projects_toggle:false,
      events_toggle:false,
      meta_title:'',
      meta_content:'',
      apiURL: 'https://directus.thegovlab.com/thegovlab/items/team?filter[slug][like]=',
      apiApp: '&fields=*.*,books.books_id.*,videos.directus_files_id.*,projects.projects_id.*'

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
    this.memberslug=window.location.pathname.split('/');
    this.memberslug = this.memberslug[this.memberslug.length - 1].split('.')[0];

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
      slug: self.memberslug
    },
    fields: ['*.*','books.books_id.*','videos.directus_files_id.*','books.books_id.picture.*','projects.projects_id.*','bio_events.events_id.*','bio_courses.courses_id.*']
  }
).then(data => {

  // Sort books
  data.data[0].books.sort(function(a, b) {
    var textA = a.books_id.title.toUpperCase();
    var textB = b.books_id.title.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});
console.log(data.data[0]);

  self.memberData = data.data[0];
  self.meta_title = 'The Govlab | '+self.memberData.name;
  self.meta_content = self.memberData.bio_short;
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
