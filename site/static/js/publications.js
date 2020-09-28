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
Vue.use(VueGtag, {
  config: { id: "UA-40012093-4" }
});
new Vue({

  el: '#publications',

  data () {
    return {
      pubData: [],
      pubtitle:'',
      puburl:'',
      pub_date_order: 'asc',
      dorder: 'asc',
      meta_title: 'The GovLab | Publications',
      meta_content: 'Deepening our understanding of how to govern more effectively and legitimately through technology.'
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
    this.fetchPubs();
  },
  methods: {
    fetchPubs() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "thegovlab",
        storage: window.localStorage
      });

      client.getItems(
  'publications',
  {
    sort: 'pub_date',
    fields: ['*.*','picture.*']
  }
).then(data => {

  self.pubData = data.data.reverse();

})
.catch(error => console.error(error));
    },
  accessPub(title, url){
    self = this;
    self.pubtitle = title;
    self.puburl = url;

    this.$gtag.event('publication', {
    'event_category':'Publications',
    'event_label': self.pubtitle,
    'value':  parseInt(1)
  })
},
    reversePub() {
      if (this.dorder == 'asc')
      {
      self.pubData.sort(function(a, b) {
      var textA = a.pub_date;
      var textB = b.pub_date;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  this.dorder = 'desc';
}else if (this.dorder == 'desc')
{
  self.pubData.sort(function(a, b) {
  var textA = a.pub_date;
  var textB = b.pub_date;
  return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
});
this.dorder = 'asc';
}
    },
    orderName() {
        if (this.aorder == 'asc')
        {
        self.pubData.sort(function(a, b) {
        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    this.aorder = 'desc';
  }else if (this.aorder == 'desc')
  {
    self.pubData.sort(function(a, b) {
    var textA = a.title.toUpperCase();
    var textB = b.title.toUpperCase();
    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
});
  this.aorder = 'asc';
  }
  },

  formatDate(date) {
  return moment(date).format('MMMM YYYY');
  }
  }

});
