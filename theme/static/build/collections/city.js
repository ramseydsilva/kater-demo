define(["backbone","../models/city"],function(e,i){return e.Collection.extend({model:i,url:"/api/cities"})});