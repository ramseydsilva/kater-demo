define(["core/authSync"],function(e){return e.Collection.extend({selectMultiple:!1,initalize:function(){},unselectAll:function(){this.set("selected",!1)},select:function(e){this.selectMultiple&&this.set("selected",!1),e.set("selected",!0)},unselect:function(e){e.set("selected",!1)}})});