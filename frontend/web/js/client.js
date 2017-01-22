'use strict';
$(document).ready(function () {
    var map;
    var RMarker;
    var CMarker;
    var host = window.location.hostname;
    var socket = io.connect("http://" + host + ":3000");
    var user_data = $('#rep');
    var ids;
    var isAccepted = false;
    var isDone = false;
    var zoom = 12;
    var RPosition = {
        lat: 0,
        lng: 0
    };
    var CPosition = {
        lat: 0,
        lng: 0
    };
    var RInfoWindow;
    var CInfoWindow;

    var RContentString = '';
    var CContentString = '';
    var rAddress = '';

    var destinationIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=Y|FFFF00|000000';
    var originIcon ="http://"+host+'/img/map_marker.png';

    function initialize() {
        var mapOptions = {
            center: RPosition,
            zoom: zoom,
            scrollwheel: false
        };
        map = new google.maps.Map(document.getElementById('google_Map'),
            mapOptions);
        RMarker = new google.maps.Marker({
            position: RPosition,
            map: map,
            icon: originIcon

        });

        CMarker = new google.maps.Marker({
            position: CPosition,
            map: map,
            icon: destinationIcon

        });

        CInfoWindow = new google.maps.InfoWindow({
            content: CContentString
        });
        RInfoWindow = new google.maps.InfoWindow({
            content: RContentString
        });
        RMarker.addListener('click', function () {
            RInfoWindow.open(map, RMarker);
        });

        CMarker.addListener('click', function () {
            CInfoWindow.open(map, CMarker);
        });
        CMarker.setMap(map);
        RMarker.setMap(map);
        // calculateAndDisplayRoute( RMarker,  position)
    }

    google.maps.event.addDomListener(window, 'load', initialize);
    socket.on('ping', function (data) {
        if (user_data.length > 0) {
            var json = user_data.attr('data-id');
            ids = JSON.parse(json);
            socket.emit('usersdata', ids);
        }
    });

    socket.on('setCoord', function (data) {

        if (data.OrderStatus == 1 && !isAccepted) {
            $.notify({
                // options
                icon: 'fa fa-check-circle',
                title: false,
                message: "Your order is Accepted!"
            }, {
                // settings
                element: 'body',
                position: null,
                type: "info",
                allow_dismiss: true,
                newest_on_top: false,
                showProgressbar: false,
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 3000,
                timer: 500,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                }
            });
            isAccepted = true;
        }
        if(data.OrderStatus == 2 && !isDone){
            $.notify({
                // options
                icon: 'fa fa-check-circle',
                title: false,
                message: "Your order is Done!"
            }, {
                // settings
                element: 'body',
                position: null,
                type: "success",
                allow_dismiss: true,
                newest_on_top: false,
                showProgressbar: false,
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 3000,
                timer: 500,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                }
            });
            isDone = true;
            user_data.attr('data-id', '{"o":null}');
        }
        document.getElementById('details').style.display='block';
        RPosition = new google.maps.LatLng(data.rCoord.lat, data.rCoord.lng);
        CPosition = new google.maps.LatLng(data.cCoord.lat, data.cCoord.lng);

        RMarker.setPosition(RPosition);
        CMarker.setPosition(CPosition);

        var rCoord = RPosition.toJSON();
        var cCoord = CPosition.toJSON();
        var bounds = new google.maps.LatLngBounds(RPosition, CPosition);
        var center = {
            lat: (rCoord.lat + cCoord.lat) / 2,
            lng: (rCoord.lng + cCoord.lng) / 2
        };

        map.panTo(center);
        map.fitBounds(bounds);
        RContentString = "<div><p style='padding-bottom: 0;'>Repairer Name:" +
            " <span style='padding: 0; border-bottom: 1px solid #777777'>" + data.name + "</span></p>" +
            "<p style='padding-top: 0'>Phone: <a href='javascript: void(0);' style='border-bottom: 1px solid #337ab7'>" + data.phone + "</a></p></div>";
        RInfoWindow.setContent(RContentString);
        CContentString = "<div><p style='padding-bottom: 0;'>" +
            " <span style='padding: 0;'>You</span></p></div>";
        CInfoWindow.setContent(CContentString);

        $.get({
            url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + data.rCoord.lat + ',' + data.rCoord.lng,
            success: function (res) {
                if (res.status == 'OK') {
                    rAddress = res.results[0].formatted_address;
                } else {
                    console.log(res)
                }
            }
        });

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [RPosition],
                destinations: [CPosition],
                travelMode: 'DRIVING',
                // transitOptions: TransitOptions,
                // drivingOptions: DrivingOptions,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            }, callback);

        function callback(response, status) {
            if (status == 'OK') {
                var from = response.originAddresses[0];
                var to = response.destinationAddresses[0];
                var result = response.rows[0].elements[0];

                document.getElementById('from').innerHTML = from;
                document.getElementById('too').innerHTML = to;
                document.getElementById('time1').innerHTML = result.duration.text;
                document.getElementById('dist').innerHTML = result.distance.text;
            }
        }
    });
    socket.on('users connected', function (data) {
        console.log(data);
    });
});