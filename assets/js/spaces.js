$(document).ready(function(){
    (function (app) {

        // var API_URL = location.href.indexOf('localhost') !== -1 ? 'http://localhost:5000' : 'https://api.brandcrush.com'
        var API_URL = 'https://api.brandcrush.com'
        var qp = '&inline=images(url),spacePosition(name,ratePeriod),addresses(suburb,country_stateId),addresses.countryState(name)&fields=name,rate,reachDistributionCapacity,spacePositionId';

        function loadSpaces() {

            loadSpace('#health-wellness-sport', '?ids=1249,1278,1245'+qp);
            loadSpace('#lifestyle', '?ids=738,1288,1264'+qp);
            loadSpace('#bars-cafes', '?ids=1250,1248,1269'+qp);
        }

        function loadSpace(el, queryParams) {
            $.getJSON(API_URL+"/space"+queryParams, function( data ) {
                $.each( data.data, function( key, val ) {
                    var template = $('#card-template > div').clone();

                    template.find('.card-img').attr('style', 'background-image: url('+val.images[0].url+')');
                    template.find('.title').text(val.name);
                    template.find('.sub-title').text(val.spacePosition.name.toUpperCase());
                    template.find('.price').text('$'+val.rate + ' per '+val.spacePosition.ratePeriod + ' | ' + val.reachDistributionCapacity + ' Product Reach');
                    template.find('.names').text(val.addresses[0].suburb+(val.addresses[0].countryState ? ', '+val.addresses[0].countryState.name : ""));
                    template.find('.view-details').attr('href', 'https://brandcrush.com/brand/space/'+val.id);

                    $(el).append(template);            
                });
            
            });

        }

        app.loadSpaces = loadSpaces;

    }(app = app || {}));
    var app;
    new app.loadSpaces();
});