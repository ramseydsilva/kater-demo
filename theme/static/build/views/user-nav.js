define(["core/view","underscore","text!templates/user-nav.html"],function(e,t,s){return e.extend({template:t.template(s),events:{"click .loginBtn":"showLoginModal","click .logoutBtn":"logOut"},initialize:function(){this.render(),app.user.on("change:username",this.refreshBtn,this)},showLoginModal:function(){this.loginModal.modal("show")},logOut:function(e){e.preventDefault(),app.user.logout()},loginUser:function(e){var t=this;e.preventDefault(),app.user.fetch({url:"/api/login",headers:{XUSERNAME:t.usernameInput.val(),XPASSWORD:t.passwordInput.val()},success:function(e){e.id&&(t.loginModal.modal("hide"),t.loginError.html("").addClass("hidden"))},error:function(){t.loginError.html("<strong>Error</strong> Incorrect username or password").removeClass("hidden")}})},registerUser:function(e){var t=this;e.preventDefault(),app.user.fetch({url:"/api/register/",method:"POST",data:{first_name:t.firstNameInput.val(),last_name:t.lastNameInput.val(),email:t.emailInput.val(),mobile_number:t.mobileNumberInput.val(),street_address1:t.streetAddress1Input.val(),street_address2:t.streetAddress2Input.val(),area:t.areaSelect.val(),username:t.usernameInput2.val(),password:t.passwordInput2.val()},success:function(e){e.id&&(t.loginModal.modal("hide"),t.registerError.html("").addClass("hidden"))},error:function(e,s){t.registerError.html("<strong>Error</strong> "+s.responseJSON.error).removeClass("hidden")}})},refreshBtn:function(){app.user.attributes.username?(this.logoutBtns.removeClass("hidden"),this.loginBtns.addClass("hidden")):(this.loginBtns.removeClass("hidden"),this.logoutBtns.addClass("hidden"))},addArea:function(e){var t="";e.id==app.filter.attributes.area&&(t='selected="selected"'),this.areaSelect.append('<option value="'+e.id+'" '+t+">"+e.attributes.name+"</option>")},render:function(){var e=this;this.html=$(this.template({loggedIn:app.user.attributes.username})),this.$el.html(this.html),this.areaSelect=this.$("#area-select2"),app.collections.area.forEach(function(t){e.addArea(t)}),app.collections.area.on("add",this.addArea,this),this.loginBtn=this.$(".loginBtn"),this.loginBtns=this.$(".loginBtns"),this.logoutBtns=this.$(".logoutBtns"),this.usernameInput=$(".usernameInput"),this.passwordInput=$(".passwordInput"),this.firstNameInput=$(".firstNameInput"),this.lastNameInput=$(".lastNameInput"),this.emailInput=$(".emailInput"),this.mobileNumberInput=$(".mobileNumberInput"),this.streetAddress1Input=$(".streetAddressInput"),this.streetAddress2Input=$(".streetAddress2Input"),this.areaSelect=$("#area-select2"),this.usernameInput2=$(".usernameInput2"),this.passwordInput2=$(".passwordInput2"),this.loginModal=$("#loginModal"),this.loginError=$(".loginError"),this.registerError=$(".registerError"),$(".registerForm").submit(function(t){e.registerUser(t)}),$(".loginForm").submit(function(t){e.loginUser(t)})}})});