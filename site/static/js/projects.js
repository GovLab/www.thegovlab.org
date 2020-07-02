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

  el: '#projectlist',

  data () {
    return {
      projectsData: [],
      maintag:[],
      subtag:[],
      listview: false,
      meta_title: 'The GovLab | Projects',
      meta_content: 'Building new technology to solve public problems. Our projects try to answer the questions that stand between today and more effective and legitimate governance tomorrow.',
      apiURL: 'https://directus.thegovlab.com/thegovlab/items/projects'
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
  'projects',
  {
    sort: '-order',
    fields: ['*.*','main_picture.*','subtag.*']
  }
).then(data => {

  client.getField("projects", "maintag").then(field => {self.maintag =field.data });
  client.getField("projects", "subtag").then(field => {self.subtag =field.data });

  console.log(self.maintag, self.subtag);
  return data;

}).then(data2 => {

    self.projectsData = data2.data;

})
.catch(error => console.error(error));
    },
    showList() {
      this.listview = true;
      console.log('her');
    },
    showThumb() {
      this.listview = false;
    },
    projectsMore(slug) {
      window.location.href= 'www.thegovlab.org'+slug+'.html';
    }
  }
});
