define(["core/view","underscore","text!templates/caterer-list-item.html"],function(t,e,i){return t.extend({template:e.template(i),events:{},initialize:function(){this.render()},render:function(){this.html=$(this.template({name:this.model.attributes.name,image:this.model.attributes.image,slug:this.model.attributes.slug})),this.$el.html(this.html)}})});