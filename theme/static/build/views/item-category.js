define(["core/view","underscore","text!templates/item-category.html","./item"],function(e,t,i,n){return e.extend({template:t.template(i),el:$('<div class="mainmaenu clearfix"></div>'),events:{"click .me2SlctBtn":"showItems"},initialize:function(){this.render()},showItems:function(e){var t=$(e.currentTarget);t.hasClass("active")?(t.removeClass("active"),t.text("Select Items"),t.parent().parent().parent().next().slideUp()):(t.addClass("active"),t.text("Close"),t.parent().parent().parent().next().slideDown())},addItem:function(e){e.view||(e.view=new n({model:e})),this.itemList.append(e.view.$el)},render:function(){var e=this;this.html=$(this.template({model:this.model})),this.$el.html(this.html),this.itemList=this.$(".item-list"),this.model.items.forEach(function(t){e.addItem(t)})}})});