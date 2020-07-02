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
    $(window).on('load', function() {
      $('.b-project-slider').slick({
          arrows: false,
          infinite: false,
          draggable: false,
          centerMode: true,
          slidesToShow: 1,
          variableWidth: true,
          focusOnSelect: true,
          swipeToSlide: true,
          responsive: [
          {
              breakpoint: 800,
              settings: {
                  draggable: true,
                  slidesToShow: 1,
              }
          }
          ]
      });
  });
  }
}
main();

////////////////////////////////////////////////////////////
///// TEAM  API REQUEST ` `
////////////////////////////////////////////////////////////


const client=  new DirectusSDK({
  url: "https://directus.thegovlab.com/",
  project: "thegovlab",
  storage: window.localStorage
})


Vue.use(VueMeta);
new Vue({

  el: '#projectpage',
  // components: {
  //    "swiper" : VueAwesomeSwiper,
  //    "swiper-slide": VueAwesomeSwiper
  //  },
	data: {
    swiperOptions: {
  loop: true,
  height:500,
  spaceBetween:40,
  slidesPerView:1,
  centeredSlides: true,
  pagination: {
    el: '.swiper-pagination',
     clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
},
      projectData: [],
      items: [],
      listview: false,
      progessAr: ['m-define','m-prototype','m-test','m-complete'],
      progess:'',
      meta_title: 'The GovLab | Project',
      meta_content: '',
      projectslug:'project-network-of-innovators',
      apiURL: 'https://directus.thegovlab.com/thegovlab/items/projects'
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
    this.projectslug=window.location.pathname.split('/');
    this.projectslug = this.projectslug[this.projectslug.length - 1].split('.')[0];

    this.fetchTeam();
  },
  methods: {
    onSetTranslate() {
      console.log('onSetTranslate')
    },
    onSwiperSlideChangeTransitionStart() {
      console.log('onSwiperSlideChangeTransitionStart')
    },
    onSwiperClickSlide(index, reallyIndex) {
      console.log('Swiper click slide!', reallyIndex)
    },

    fetchTeam() {
      self = this;


      client.getItems(
  'projects',
  {
    filter: {
      slug: self.projectslug
    },
    fields: ['*.*','project_team.team_id.*','gallery.directus_files_id.*','project_team.team_id.picture.*']
  }
  ).then(data => {

  return data;

}).then(data2 => {
    self.progess = self.progessAr[data2.data[0].progress];

    self.meta_title = 'The GovLab | '+data2.data[0].name;
    self.meta_content = data2.data[0].description;
    self.items = data2.data[0].gallery;
    self.projectData = data2.data[0];


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
    },
    isMobile() {
    	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    		return true
    	} else {
    		return false
    	}
    },
  },
    updated() {
      $(window).on('load', function() {
        $('.b-project-slider').slick({
            arrows: false,
            infinite: false,
            draggable: false,
            centerMode: true,
            slidesToShow: 1,
            variableWidth: true,
            focusOnSelect: true,
            swipeToSlide: true,
            responsive: [
            {
                breakpoint: 800,
                settings: {
                    draggable: true,
                    slidesToShow: 1,
                }
            }
            ]
        });
    });

    }
});

