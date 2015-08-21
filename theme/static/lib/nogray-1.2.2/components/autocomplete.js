/*
 * NoGray Auto Complete Component
 *
 * Copyright (c), All right reserved
 * Gazing Design - http://www.NoGray.com
 * http://www.nogray.com/license.php
 */
 
ng.Assets.load_style(ng_config.assets_dir+"components/autocomplete/css/"+ng_config.css_skin_prefix+"autocomplete_style.css");ng.AutoComplete=function(a){this.p=this.create_options(a,{type:"self",src:null,minimum_length:1,number_results:5,force_selection:null,css_prefix:"ng_autocomplete_",value:null,caption:"",remote_delay:100,remote_output_process:null,multi_selection:null,multi_selection_holder:null,max_selection:0,pattern:null,responsive_top:0});this.create_events();if(this.p.disabled){this.p.disabled=false;this.disable.delay(100,this)}this.p.open_onfocus=this.p.open_onclick=false;this.make_id("auto_complete");this.p.current_focus=-1;this.p.current_focus_arr=[];if(ng.defined(this.p.input)){this.p.input_field=this.p.input}if(ng.defined(this.p.input_field)){this.make(this.p.input_field)}return this};ng.AutoComplete.inherit(ng.Component);ng.extend_proto(ng.AutoComplete,{has_type:"autocomplete",make:function(b){this.p.input_field=ng.get(b);this.set_input(ng.create("input",{type:"text",autocomplete:"off","class":this.p.css_prefix+"input "+this.p.input_field.className,id:this.id+"main_input",title:this.p.caption,events:{keyup:function(i){clearTimeout(this.p.remote_timer);if(i.get_key()=="enter"){if((!this.is_input_empty())&&(this.p.force_selection)){if(this.p.current_focus==-1){return this.select_first_step(!evt.shiftKey)}}return this.select_current_step(!i.shiftKey)}if((i.get_key()=="down")||(i.get_key()=="up")||(i.get_key()=="left")||(i.get_key()=="right")){return this}if(i.get_key()=="esc"){this.p.input.value=""}if((this.p.input.value=="")&&(window.innerWidth>=480)){return this.close()}if((this.p.input.value.length>=this.p.minimum_length)||(this.is_open())){this.fill_data()}this.fire_event("keyup",null,i)}.ng_bind(this),keydown:function(i){if((this.is_open())&&(i.get_key()=="enter")&&(this.p.current_focus!=-1)){i.stop()}if(i.get_key()=="down"){return this.step_up()}else{if(i.get_key()=="up"){return this.step_down()}}if(this.p.input.value.length==this.p.input.selectionEnd){if((i.get_key()=="left")&&(ng.Language.get_dir(this.get_language())=="rtl")){return this.select_current_step(false)}else{if(i.get_key()=="right"){return this.select_current_step(false)}}}this.fire_event("keydown",null,i)}.ng_bind(this),focus:function(i){clearTimeout(this.p.remote_timer);if(this.p.input.value==this.p.caption){this.p.input.value=""}if(this.p.input.value.length>=this.p.minimum_length){this.fill_data()}this.fire_event("focus",null,i)}.ng_bind(this),mouseup:function(i){i.stop()},mousewheel:function(i){if(i.wheel>0){this.step_up()}else{this.step_down()}this.fire_event("mousewheel",null,i)}.ng_bind(this),blur:function(i){if(this.p.is_moving_input){return this}clearTimeout(this.p.remote_timer);if(this.p.input.value!=""){this.select_current_step()}this.close();(function(){if(this.p.input.value==""){this.p.input.value=this.p.caption}}.defer(this));this.fire_event("blur",null,i)}.ng_bind(this),change:function(m){clearTimeout(this.p.remote_timer);if(this.is_input_empty()){this.p.current_focus=-1;this.unselect_last()}else{var k=true;var n=this.p.input.value;var j=n;for(var l=0;l<this.p.src.length;l++){if((this.p.input_value.value==this.p.src[l].value)&&(this.p.input.value==this.p.src[l].text)){var k=false;break}}if(k){for(var l=0;l<this.p.src.length;l++){if(this.p.input.value==this.p.src[l].text){j=this.p.src[l].text;n=this.p.src[l].value;break}}if(this.p.force_selection){if(this.p.current_focus_arr.length==0){this.p.input.value=this.p.input.value.substr(0,this.p.input.value.length-1);this.fill_data();return this.p.input.fire_event("change",null,m)}if(this.p.current_focus>-1){this.select_current_step()}else{this.select_first_step()}}else{if(this.p.current_focus>-1){this.select_current_step()}else{this.select_option({value:n,text:j})}}}}this.fire_event("change",null,m)}.ng_bind(this)}}));if(this.p.input_field.get("tag")=="input"){this.p.input.size=this.p.input_field.size}var g=ng.create("span",{id:"input_button_container"+this.id});this.p.input_field.append_element(g,"before");g.append_element(this.p.input);var a;if(this.p.type=="self"){this.p.src=[];a=[];this.p.type="array";if(!ng.defined(this.p.multi_selection)){this.p.multi_selection=this.p.input_field.multiple}var h=this.p.input_field.getElementsByTagName("option");for(var f=0;f<h.length;f++){var e="";if(h[f].parentNode.tagName.toLowerCase()=="optgroup"){e=h[f].parentNode.label}this.p.src.push({value:h[f].value,text:h[f].innerHTML,html:h[f].innerHTML,group:e});if(h[f].selected){a.push({value:h[f].value,text:h[f].innerHTML})}}this.p.input_value=ng.create("input",{name:this.p.input_field.name,type:"hidden"});this.p.input_field.replace(this.p.input_value);if(!ng.defined(this.p.force_selection)){this.p.force_selection=true}}else{if(this.p.type=="array"){this.p.input_field.set_style("display","none");this.p.input_value=this.p.input_field}else{if(this.p.type=="remote"){this.p.input_field.set_style("display","none");this.p.input_value=this.p.input_field;this.p.remote_timer=0}}}if(!ng.defined(this.p.multi_selection)){this.p.multi_selection=false}if(!ng.defined(this.p.value)){if((this.p.input_value.value!="")&&(this.p.input_value.value!=this.p.caption)){a=this.p.input_value.value.split("\n");if(this.p.type=="array"){for(var f=0;f<this.p.src.length;f++){for(var c=0;c<a.length;c++){if(this.p.src[f].value==a[c]){a[c]={value:this.p.src[f].value,text:this.p.src[f].text}}}}}}if(ng.defined(a)){this.select_option(a,true)}}if(this.p.input.value==""){this.p.input.value=this.p.caption}if(this.p.input_value.value==this.p.caption){this.p.input_value.value=""}if(!ng.defined(this.p.force_selection)){this.p.force_selection=false}this.set();var d="<div id='"+this.id+"_main_holder_div'></div>";this.set_html(d);this.p.holder_div=ng.get(this.id+"_main_holder_div");this.fire_event.defer(this,["load"]);ng.get(window).add_event("resize",function(){if(window.innerWidth<=480){var i=Math.round(window.innerWidth-(window.innerWidth*0.2));this.get_content_div().set_style("width",i);ng.get(this.id+"_input_div").set_style("width",i)}else{this.get_content_div().set_style("width","")}}.ng_bind(this));return this},get_selected:function(){if(this.p.value.length==0){return null}else{if(this.p.value.length==1){return this.get_last_selected()}else{return this.p.value}}},get_last_selected:function(){if(this.p.value.length==0){return null}var a=this.p.value[0];if(a.value==a.text){return a.value}else{return a}},get_first_selected:function(){if(this.p.value.length==0){return null}var a=this.p.value[this.p.value.length-1];if(a.value==a.text){return a.value}else{return a}},select_option:function(g,e){if(!ng.defined(this.p.value)){this.p.value=[]}if(ng.type(g)!="array"){g=[g]}for(var c=0;c<g.length;c++){var f=true;if(ng.type(g[c])=="string"){g[c]={value:g[c],text:g[c]}}if(!ng.defined(g[c].text)){g[c].text=g[c].value}for(var b=0;b<this.p.value.length;b++){if(this.p.value[b].value==g[c].value){f=false;break}}if(f){var d=[{value:g[c].value,text:g[c].text}];if(this.p.multi_selection){this.p.value=d.concat(this.p.value)}else{if(this.p.value.length>0){this.unselect_option(this.p.value)}this.p.value=d}if((!ng.defined(e))||(!e)){this.fire_event.defer(this,["select",[g[c].value,g[c].text]])}if((this.p.multi_selection)&&(this.p.max_selection>0)&&(this.p.value.length>this.p.max_selection)){for(var b=this.p.max_selection;b<this.p.value.length;b++){this.unselect_option(this.p.value[b].value)}this.p.value=this.p.value.slice(0,this.p.max_selection)}}else{if((!ng.defined(e))||(!e)){this.fire_event.defer(this,["alreadySelected",[g[c].value,g[c].text]])}}}var a=[];for(var c=0;c<this.p.value.length;c++){a.push(this.p.value[c].value)}this.p.input_value.value=a.join("\n");this.p.input.value=this.p.value[0].text;this.create_multi_select_list();return this},unselect_last:function(){this.unselect_option(this.get_last_selected())},unselect_first:function(){this.unselect_option(this.get_first_selected())},unselect_option:function(d){if(ng.type(d)!="string"){d=d.value}if(!ng.defined(this.p.value)){this.p.value=[]}if(ng.type(d)!="array"){d=[d]}for(var c=0;c<this.p.value.length;c++){for(var b=0;b<d.length;b++){if(this.p.value[c].value==d[b]){this.fire_event.defer(this,["unselect",[this.p.value[c].value,this.p.value[c].text]]);this.p.value.remove_key(c)}}}if(this.p.value.length==0){this.p.input_value.value=this.p.input.value=""}else{var a=[];for(var c=0;c<this.p.value.length;c++){a.push(this.p.value[c].value)}this.p.input_value.value=a.join("\n");this.p.input.value=this.p.value[0].text}return this.create_multi_select_list()},clear_selection:function(){if(this.is_disabled()){return this}this.p.value.length.empty();this.p.input_value.value=this.p.input.value="";return this.create_multi_select_list()},create_multi_select_list:function(){if(this.p.multi_selection){if(!ng.defined(this.p.multi_selection_event)){this.p.multi_selection_event=new ng.InnerHtmlEvents({click:function(h,g){if(this.is_disabled()){return this}var f=g.src_element.get("rel");if(f.indexOf("remove-")!=-1){var i=f.replace("remove-","").split("[NG[,]]");this.fire_event.defer(this,["optionRemove",[i[0],i[1],h],g]);this.unselect_option(i[0])}else{if(f.indexOf("click-")!=-1){var i=f.replace("click-","").split("[NG[,]]");this.fire_event("optionClick",[i[0],i[1],h],g)}}}.ng_bind(this)});this.p.multi_selection_event_txt=this.p.multi_selection_event.get_html()}if(!ng.defined(this.p.multi_selection_holder)){this.p.multi_selection_holder=ng.create("span",{className:this.p.css_prefix+"multi_list"});this.p.input.append_element(this.p.multi_selection_holder,"before")}var d=ng.get(this.p.multi_selection_holder);d.innerHTML="";var c=[];for(var b=0;b<this.p.value.length;b++){var e=this.p.value[b].value.replace(/\"/g,"&quot;");var a=this.p.value[b].text.replace(/\"/g,"&quot;");c.push('<span class="'+this.p.css_prefix+"multi_list_option ");c.push(ng.Language.get_dir(this.get_language())+'"');c.push(" "+this.p.multi_selection_event_txt+">");c.push('<span class="'+this.p.css_prefix+'multi_list_text" rel="click-'+e+"[NG[,]]"+a+'">'+a+"</span>");c.push('<span class="'+this.p.css_prefix+'multi_list_remove"  rel="remove-'+e+"[NG[,]]"+a+'">&nbsp;</span>');c.push("</span>")}d.set_html(c)}else{if(ng.defined(this.p.multi_selection_holder)){ng.get(this.p.multi_selection_holder).innerHTML=""}}return this},set_src:function(a){this.p.src=a;return this},get_src:function(){return this.p.src},set_minimum_length:function(a){this.p.minimum_length=a;return this},get_minimum_length:function(){return this.p.minimum_length},set_number_results:function(a){this.p.number_results=a;return this},get_number_results:function(){return this.p.number_results},set_force_selection:function(a){this.p.force_selection=a;return this},get_force_selection:function(){return this.p.force_selection},set_remote_delay:function(a){this.p.remote_delay=a;return this},get_remote_delay:function(){return this.p.remote_delay},set_caption:function(a){if(this.p.input.value==this.p.caption){this.p.input.value=a}this.p.caption=a;this.p.input.title=a;return this},get_caption:function(){return this.p.caption},set_multi_selection:function(a){this.p.multi_selection=a;return this},get_multi_selection:function(){return this.p.multi_selection},set_multi_selection_holder:function(a){if(ng.defined(this.p.multi_selection_holder)){this.p.multi_selection_holder.innerHTML=""}this.p.multi_selection_holder=ng.get(a);return this.create_multi_select_list()},get_multi_selection_holder:function(){return this.p.multi_selection_holder},set_max_selection:function(a){this.p.max_selection=a;return this},get_max_selection:function(){return this.p.max_selection},get_hidden_input:function(){return this.p.input_value},get_txt_around_caret:function(){if(document.selection){this.p.input.focus();var c=document.selection.createRange();var b=document.selection.createRange().text.length;c.moveStart("character",-this.p.input.value.length);var a=c.text.length-b}else{if(ng.defined(this.p.input.selectionStart)){var a=this.p.input.selectionStart}}return[this.p.input.value.substr(0,a),this.p.input.value.substr(a)]},get_search_regexp:function(){if(ng.defined(this.p.pattern)){return this.p.pattern}var c=this.get_txt_around_caret();var b=c[0];var a=c[1];if((b!="")&&(a!="")){return new RegExp("^("+b.escape_regex()+")("+a.escape_regex()+")?","i")}else{if(a==""){return new RegExp("^("+b.escape_regex()+")","i")}else{return new RegExp("("+a.escape_regex()+")","i")}}},fill_data:function(a){if(this.is_disabled()){return this}this.clear_focus();this.p.current_focus_arr=[];clearTimeout(this.p.remote_timer);if((this.p.input.value=="")&&(window.innerWidth>=480)){return this.close()}if(!ng.defined(a)){var e=this[this.p.type+"_fill_data"]()}else{var e=a}if(!ng.defined(e)){return this}if((e.length<=0)&&(window.innerWidth>=480)){return this.close()}var c=[];if(!ng.defined(this.p.main_events_html)){this.p.main_events=new ng.InnerHtmlEvents({click:function(i,h){if(this.is_disabled()){return this}var g=i.get("rel");if(!ng.defined(g)){return this}if(g!=""){this.select_step(g)}h.stop()}.ng_bind(this),mouseenter:function(i,h){if(this.is_disabled()){return this}var g=i.get("rel");if(!ng.defined(g)){return this}if(g!=""){this.step(g)}h.stop()}.ng_bind(this)});this.p.main_events_html=this.p.main_events.get_html()}var d="";for(var b=0;b<e.length;b++){if(ng.type(e[b])!="object"){e[b]={value:e[b],text:e[b],html:e[b],group:""}}if(!ng.defined(e[b].text)){e[b].text=e[b].value}if(!ng.defined(e[b].html)){e[b].html=e[b].text}if(!ng.defined(e[b].group)){e[b].group=""}this.p.current_focus_arr[b]={id:this.id+"_option_"+b,value:e[b].value,text:e[b].text};if((this.p.force_selection)&&(b==0)){var f=" "+this.p.css_prefix+"list_focus";this.p.current_focus=0}else{var f=""}if(d!=e[b].group){d=e[b].group;c.push("<div class='"+this.p.css_prefix+"group_div'>"+d+"</div>")}c.push("<div class='"+this.p.css_prefix+"list_div"+f+"' id='"+this.id+"_option_"+b+"' "+this.p.main_events_html+" rel='"+b+"'>"+e[b].html+"</div>")}this.p.holder_div.set_html(c);if(this.is_open()){this.reposition()}return this.open()},array_fill_data:function(){var b=[];var c=this.get_search_regexp();for(var a=0;a<this.p.src.length;a++){if(ng.type(this.p.src[a])!="object"){this.p.src[a]={value:this.p.src[a],text:this.p.src[a],html:this.p.src[a]}}if(!ng.defined(this.p.src[a].text)){this.p.src[a].text=this.p.src[a].value}if((c.test(this.p.src[a].value))||(c.test(this.p.src[a].text))){b.push(this.p.src[a]);if(b.length>=this.p.number_results){break}}}return b},remote_fill_data:function(){if(!ng.defined(this.p.xhr)){this.p.xhr=new ng.XHR({url:this.p.src,events:{success:function(b){clearTimeout(this.p.remote_timer);if(b.text!=""){if(ng.defined(this.p.remote_output_process)){var a=this.p.remote_output_process(b)}else{var a=ng.eval_json(b.text)}(function(){this.fill_data(a)}.defer(this))}}.ng_bind(this)}})}this.p.remote_timer=(function(){clearTimeout(this.p.remote_timer);this.p.xhr.abort();var a=this.p.input.value;var b=this.get_txt_around_caret();this.p.xhr.set_param({text:a,precaret:b[0],postcaret:b[1]});this.p.xhr.get()}.delay(this.p.remote_delay,this))},select_current_step:function(a){return this.select_step(this.p.current_focus,a)},select_first_step:function(a){return this.select_step(0,a)},select_step:function(c,b){if(this.is_disabled()){return this}if(c<0){return this}if(!ng.defined(b)){b=true}var a=this.p.current_focus_arr[c];if(ng.defined(a)){this.select_option({value:a.value,text:a.text});if(b){this.close()}}return this},clear_focus:function(){var a=this.p.current_focus_arr[this.p.current_focus];if(ng.defined(a)){var c=a.id}else{return this}this.p.current_focus=-1;var b=ng.get(c);if(ng.defined(b)){b.remove_class(this.p.css_prefix+"list_focus")}return this},step:function(c){if(this.is_disabled()){return this}this.clear_focus();if(c==-1){this.p.current_focus=c;return this}else{if(c<-1){c=this.p.current_focus_arr.length-1}else{if(c>=this.p.current_focus_arr.length){c=0}}}this.p.current_focus=c;var a=this.p.current_focus_arr[c];if(ng.defined(a)){var d=a.id}else{return this}var b=ng.get(d);if(ng.defined(b)){b.add_class(this.p.css_prefix+"list_focus")}this.fire_event("step",[c]);return this},step_down:function(){this.step(this.p.current_focus-1);this.fire_event("stepdown");return this},step_up:function(){this.step(this.p.current_focus+1);this.fire_event("stepup");return this},is_input_empty:function(){if(this.p.input.value==""){return true}if(this.p.input.value==this.p.caption){return true}return false},get_current_focus:function(){return this.p.current_focus},set_pattern:function(a){this.p.pattern=a;return this},get_pattern:function(a){return this.p.pattern},toString:function(){if(this.p.value.length==0){return""}if(this.p.value.length==1){return this.p.value[0].toString()}return this.p.value.toString()}});ng.map_html5_prop("search",{placeholder:"caption",pattern:"pattern",list:function(g){var f=ng.get(g).getElementsByTagName("option");ng.get(g).set_style("display","none");if(f.length){var a=[];for(var e=0;e<f.length;e++){var d={};d.value=f[e].value;if(f[e].label!=""){d.text=f[e].label}else{d.text=d.value}var c=f[e].getAttribute("data-html");if(ng.defined(c)){d.html=c}else{d.html=d.text}var b=f[e].getAttribute("data-group");if(ng.defined(b)){d.group=b}else{d.group=""}a.push(d)}return{src:a,type:"array"}}}});if(ng.defined(ng.UI)){ng.UI.add_to_ini("ng-autocomplete",function(a){ng.UI.common_ini(a,ng.AutoComplete)})};