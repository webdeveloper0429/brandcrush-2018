window.onload = function(){

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    
    var deleteCookie = function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };


    (function (app) {
        function auth(element) {
            var scope = this, element;
            var token = null
            var currentUser = null
            var cookieName = 'brandcrushAuthToken'

            var API_URL = location.href.indexOf('localhost') !== -1 ? 'http://localhost:5000' : 'https://api.brandcrush.com'

            scope.initialize = function () {
                token = getCookie(cookieName)
                if(token){
                    fetchUser()
                }else{
                    currentUser= null
                    updateHeader()
                }

            };
            var fetchUser = function() {
                currentUser= null
                var url = API_URL+'/current-user?inline=host,brands,company,brands.brand,brands.brand.categories'
                $.ajax({
                    url: url,
                    type: 'GET',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer '+token);
                    },
                    data: {},
                    success: function (response) {
                        currentUser = response
                        console.log("49","success","currentUser", currentUser);
                        updateHeader()
                    },
                    error: function () { },
                });
            }
            var updateHeader = function() {
                if(currentUser && currentUser.id){
                    console.log("57","updateHeader", currentUser);
                    $('.navbar-item-logged-out').remove()
                    $('.navbar-item-logged-in').css('display', 'flex')
                    var profileName = currentUser.firstName

                    var logout = $('<a class="navbar-item" href="">Logout</a>')
                    logout.click(handleLogout)

                    if(currentUser.type.indexOf('host') !== -1){
                        if(currentUser.host && currentUser.host.name){
                            profileName += ' | '+currentUser.host.name
                        }
                        $('.navbar-link-profile-name span').text(profileName)
                        $(".navbar-item-logged-in-dropdown")
                            .before(
                            '<a class="navbar-item" href="https://app.brandcrush.com/host/list-a-space/create/new/" >List a space</a>'+
                            '<a class="navbar-item" href="https://app.brandcrush.com/host/dashboard" >Dashboard</a>' +
                            '<a class="navbar-item" href="https://app.brandcrush.com/host/messages" >Messages</a>' +
                            '<div class="navbar-item navbar-item-logged-out"></div>'

                        )
                        $(".navbar-item-logged-in-dropdown")
                            .after(
                                '<div class="navbar-item"></div>'
                            )

                        $('.navbar-item-logged-in-dropdown .navbar-dropdown').append(
                            '<a class="navbar-item" href="https://app.brandcrush.com/host/profile" >Profile</a>'+
                            '<a class="navbar-item" href="https://app.brandcrush.com/host/user-settings" >Manage Account Settings</a>'
                        )
                        $('.navbar-item-logged-in-dropdown .navbar-dropdown').append(
                            logout
                        )
                    }else{
                        if(currentUser.userData && currentUser.brands && currentUser.userData.SelectedBrandId){
                            var selectedBrand = currentUser.brands.find(function(brand){
                                return brand.brandId == currentUser.userData.SelectedBrandId
                            })
                            if(selectedBrand){
                                profileName += ' | '+selectedBrand.brand.name
                            }
                        }
                        $('.navbar-link-profile-name span').text(profileName)
                        $(".navbar-item-logged-in-dropdown")
                            .before(
                                '<a class="navbar-item" href="https://app.brandcrush.com/brand/saved" >Saved</a>' +
                                '<a class="navbar-item" href="https://app.brandcrush.com/brand/messages" >Messages</a>' +
                                '<a class="navbar-item" href="https://app.brandcrush.com/brand/dashboard" >Dashboard</a>' +
                                '<div class="navbar-item"></div>'
                            )
                        $(".navbar-item-logged-in-dropdown")
                            .after(
                                '<div class="navbar-item"></div>'
                            )

                        $('.navbar-item-logged-in-dropdown .navbar-dropdown').append(
                            '<a class="navbar-item" href="https://app.brandcrush.com/brand/manage-company" >Manage Business Profile</a>'+
                            '<a class="navbar-item" href="https://app.brandcrush.com/brand/manage-profiles" >Manage Brand Profiles</a>'+
                            '<a class="navbar-item" href="https://app.brandcrush.com/brand/user-settings" >Manage Account Settings</a>'
                        )
                        $('.navbar-item-logged-in-dropdown .navbar-dropdown').append(
                            logout
                        )
                    }

                }else{
                    $('.navbar-item-logged-in').hide()
                }
            }
            var handleLogout = function(evt) {
                evt.preventDefault()
                console.log("105","handleLogout","handleLogout", "");
                deleteCookie(cookieName)
                location.reload()
            }

            scope.initialize();
            return scope;
        }

        app.auth = auth;

    }(app = app || {}));
    var app;
    new app.auth()
}