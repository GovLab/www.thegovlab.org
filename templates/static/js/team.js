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

  el: '#teamlist',

  data () {
    return {
      teamData: [],
      more_body: false,
      apiURL: 'https://directus.thegovlab.com/thegovlab/items/team?sort=order&fields=*,picture.*'
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
  'team',
  {
    sort: 'order',
    fields: ['*.*','picture.*','projects.projects_id.*']
  }
).then(data => {

  self.teamData = data.data;
  console.log(self.teamData);
})
.catch(error => console.error(error));
      // https://directus.thegovlab.com/thegovlab/items/team?sort=order&fields=*,picture.*
  //     var self = this; // Reference to the function self
  //     https://directus.thegovlab.com/thegovlab/items/team?sort=order&fields=*,picture.*
  //
  //     client.getItems({"team"
  //       {
  //           sort: "order&fields=*,picture.*"
  //         }
  //     })
  // .then(data => {
  //   console.log(data);
  // })
  // .catch(error => console.error(error));
      // axios.get(self.apiURL).then(responseTeam => {
      //   console.log(responseTeam);
      //   // self.teamData = responseTeam.data;
      //
      // });
    },
    showDesc(teammember) {
      teammember['extended'] = true;
      $('.js-bio-toggle').parent().toggleClass('m-active');
      console.log(teammember);
    },
    showExc(teammember) {
    	console.log('two');
      teammember['extended'] = false;
      $('.js-bio-toggle').parent().toggleClass('m-active');
    },
    showProj(teammember) {
      teammember['extended_project'] = true;
      $('.js-project-toggle').parent().toggleClass('m-show');
    },
    hideProj(teammember) {
      teammember['extended_project'] = false;
      $('.js-project-toggle').parent().toggleClass('m-show');
    },
    teamMore(slug) {
      window.location.href= slug+'.html';
    }
  }
});



