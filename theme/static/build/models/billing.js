define(["core/authSync"],function(i){return i.Model.extend({idAttribute:"username",url:"/api/billing/",isNew:function(){return!1},initialize:function(){}})});