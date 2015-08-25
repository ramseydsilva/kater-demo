define(["core/view","underscore","text!templates/home.html","bootstrap-datepicker"],function(e,t,a){return e.extend({template:t.template(a),events:{"click .advancelink":"toggleAdvancedOptions","change #area-select":"selectArea","change #category-select":"selectCategory","changeDate .datepicker":"selectDate","click #arabic-speaking-only-checkbox":"selectArabicSpeakingOnly","click #all-female-servers-checkbox":"selectAllFemaleServers","change #price-lower-input":"selectPriceLower","change #price-upper-input":"selectPriceUpper","change #capacity-lower-input":"selectCapacityLower","change #capacity-upper-input":"selectCapacityUpper","click #searchBtn":"filterCaterers"},initialize:function(){var e=this;this.render(),app.collections.area.forEach(function(t){e.addArea(t)}),app.collections.area.on("add",this.addArea,this),app.collections.category.forEach(function(t){e.addCategory(t)}),app.collections.category.on("add",this.addCategory,this),app.filter.on("change:area",this.changeArea,this),app.filter.on("change:category",this.changeCategory,this),app.filter.on("change:date",this.changeDate,this)},filterCaterers:function(e){e.preventDefault(),app.components.caterers.view&&app.components.caterers.view.fetchCaterers()},addArea:function(e){var t="";e.id==app.filter.attributes.area&&(t='selected="selected"'),this.areaSelect.append('<option value="'+e.id+'" '+t+">"+e.attributes.name+"</option>")},addCategory:function(e){var t="";e.id==app.filter.attributes.category&&(t='selected="selected"'),this.categorySelect.append('<option value="'+e.id+'" '+t+">"+e.attributes.title+"</option>")},changeArea:function(e){this.areaSelect.val(e.attributes.area)},changeCategory:function(e){this.categorySelect.val(e.attributes.category)},changeDate:function(e){this.datepicker.val(e.attributes.date)},selectArea:function(){var e=this.areaSelect.val();e?app.filter.set("area",parseInt(e)):app.filter.set("area",null)},selectCategory:function(){var e=this.categorySelect.val();e?app.filter.set("category",parseInt(e)):app.filter.set("category",null)},selectDate:function(){app.filter.set("date",this.datepicker.val())},selectPriceLower:function(){app.filter.set("price_lower",this.price_lower.val())},selectPriceUpper:function(){app.filter.set("price_upper",this.price_upper.val())},selectCapacityLower:function(){app.filter.set("capacity_lower",this.capacity_lower.val())},selectCapacityUpper:function(){app.filter.set("capacity_upper",this.capacity_upper.val())},selectAllFemaleServers:function(){app.filter.set("all_female_servers",this.all_female_servers.is(":checked"))},selectArabicSpeakingOnly:function(){app.filter.set("arabic_speaking_only",this.arabic_speaking_only.is(":checked"))},toggleAdvancedOptions:function(){this.advanceBox.toggle()},render:function(){this.html=$(this.template({})),this.$el.html(this.html),this.areaSelect=this.$("#area-select"),this.categorySelect=this.$("#category-select"),this.datepicker=this.$(".datepicker"),this.advanceBox=this.$(".advncebox"),this.datepicker.datepicker(),require(["jquery-carousel","jquery-carousel-responsive"]),this.price_lower=this.$("#price-lower-input"),this.price_upper=this.$("#price-upper-input"),this.capacity_lower=this.$("#capacity-lower-input"),this.capacity_upper=this.$("#capacity-upper-input"),this.all_female_servers=this.$("#all-female-servers-checkbox"),this.arabic_speaking_only=this.$("#arabic-speaking-only-checkbox")}})});