$(document).ready(function () {
    // This example displays an address form, using the autocomplete feature
    // of the Google Places API to help users fill in the information.

    var placeSearch, autocomplete;
    var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        sublocality_level_1: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };

    function initialize() {
        // Create the autocomplete object, restricting the search
        // to geographical location types.
        autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {
            types: ['geocode']
        });
        // When the user selects an address from the dropdown,
        // populate the address fields in the form.
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            fillInAddress();
        });
    }

    // [START region_fillform]
    function fillInAddress() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();
        var address;
        var loc;
        for (var component in componentForm) {
            if(component == 'sublocality_level_1'){
            }else{
                document.getElementById(component).value = '';
                document.getElementById(component).disabled = false;
            }
        }
        if (place['address_components'] == null) {
            $.get({
                url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + place.name,
                success: function (res) {
                    address = res.results[0];
                    // Get each component of the address from the place details
                    // and fill the corresponding field on the form.
                    for (var i = 0; i < address.address_components.length; i++) {
                        var addressType = address.address_components[i].types[0];
                        if (componentForm[addressType]) {
                            if(addressType == 'sublocality_level_1'){
                                loc = address.address_components[i][componentForm[addressType]];
                                document.getElementById('locality').value = loc;
                            }else{
                                var val = address.address_components[i][componentForm[addressType]];
                                document.getElementById(addressType).value = val;
                            }
                        }
                    }
                }
            });
        } else {
            address = autocomplete.getPlace();
            // Get each component of the address from the place details
            // and fill the corresponding field on the form.

            for (var i = 0; i < address.address_components.length; i++) {
                var addressType = address.address_components[i].types[0];
                if (componentForm[addressType]) {
                    if(addressType == 'sublocality_level_1'){
                        loc = address.address_components[i][componentForm[addressType]];
                        document.getElementById('locality').value = loc;
                    }else{
                        var val = address.address_components[i][componentForm[addressType]];
                        document.getElementById(addressType).value = val;
                    }
                }
            }
        }
    }

    initialize();
    // [END region_geolocation]
});
