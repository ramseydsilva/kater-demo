define(["core/router"],function(e){var o={home:"Home",jobs:"Jobs",jobPost:"Post a new Job",jobReview:"Review Job",folks:"Folks",login:"Login",join:"Join",logout:null,profile:"My Profile"},i=hideBack=hideMap=showHomeButtons=!1,t=function(){i=hideMap=hideBack=showHomeButtons=!1},n=$("#job"),a=$("#main-back"),l=$("#map"),s=$("body"),p=function(){showHomeButtons?app.views.home.showHomeButtons():app.views.home.hideHomeButtons(),hideMap?app.promises.mapLoaded.done(function(){l.addClass("hideMap")}):l.removeClass("hideMap"),hideBack?a.hide():a.show()};return e.extend({routes:{"":"home","login/":"login","profile/":"profile","logout/":"logout","join/":"join","jobs/":"jobs","jobs/new/":"jobPost","jobs/new/review/":"jobReview","jobs/:id/":"job","folks/":"folks"},pageNotFoundView:function(e){app.changeTitle(e||"404 Page Not Found")},homeCallback:function(){hideBack=!0,showHomeButtons=!0,p(),app.views.home.selectSingleCategory=i},jobReviewCallback:function(e){hideFilters=!0,p(),e&&e()},loginCallback:function(e){hideMap=!0,p(),e&&e()},profileCallback:function(e){hideMap=!0,p(),e&&e()},joinCallback:function(e){hideMap=!0,p(),e&&e()},folksCallback:function(e){hideMap=!0,p(),e&&e()},jobsCallback:function(e){hideMap=!0,p(),e&&e()},jobCallback:function(e){app.changeTitle("Job"),app.changePageTitle(e.attributes.title),app.promises.mapLoaded.done(function(){setMap({lat:e.attributes.latitude,lng:e.attributes.longitude})}),p()},jobPostCallback:function(e){if(app.views.home.$el.show(),i=!0,p(),app.views.home){var o=app.collections.category.where({selected:!0});o.length>1&&(selectCategory=o[0],app.views.home.unselectAllCategories(selectCategory))}e&&e()},jobReview:function(e,o){return app.views.jobPost?void(app.views.jobReview?(app.views.jobReview.render(),jobReviewView(o)):require(["views/jobReview"],function(e){app.views.jobReview=new e({model:app.views.jobPost.job,el:document.getElementById("jobReview"),jobCollection:app.collections.job}),jobReviewView(o)})):this.navigate("/jobs/post/",!0)},job:function(e,o){var i=this;if(o||(o=app.collections.job.findWhere({id:parseInt(e)})),o)o.view?(n.html(o.view.html),i.afterViewInit.call(i,"job",o)):require(["views/job"],function(e){o.view=new e({el:document.getElementById("job"),model:o}),i.afterViewInit.call(i,"job",o)});else{var i=this;o=app.collections.job.add({id:e}),o.fetch({error:function(e,o){app.collections.job.remove(e),this.pageNotFoundView(o.status+" "+o.statusText)},success:function(o){i.job(e,o)}})}},logout:function(){app.user.fetch({url:"/api/logout/"})},execute:function(e,i,n){var a=this;app.changeTitle(o[n]),e||(e=a[n]),window.scrollTo(0,0),s.show(),app.views.map?(t(),e&&e.apply(a,i)):require(["views/map"],function(o){app.views.map=new o({el:document.getElementById("map")}),"home"==n||app.views.home?(t(),e&&e.apply(a,i)):a.home(null,null,function(){t(),e&&e.apply(a,i)})})}})});