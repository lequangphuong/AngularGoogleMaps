/**
 * Created by PhuongLQ on 2/25/16.
 */
app.controller('MapCtrl', ['MarkerCreatorService', '$scope', function (MarkerCreatorService, $scope) {

    //MarkerCreatorService.createByCoords(10.762622, 106.660172, function (marker) {
    //    marker.options.labelContent = 'Autentia';
    //    $scope.autentiaMarker = marker;
    //});
    $scope.address = '';

    $scope.autentiaMarker = {
        latitude: 0,
        longitude: 0
    };

    $scope.map = {
        center: {
            latitude: $scope.autentiaMarker.latitude,
            longitude: $scope.autentiaMarker.longitude
        },
        zoom: 12,
        markers: [],
        control: {},
        options: {
            scrollwheel: true,
            disableDefaultUI: true
        }
    };

    MarkerCreatorService.createByCurrentLocation(function (marker) {
        marker.options.labelContent = 'You´re here';
        $scope.autentiaMarker = marker;
        $scope.map.markers.push(marker);
        refresh(marker);
    });
    //$scope.map.markers.push($scope.autentiaMarker);

    $scope.addCurrentLocation = function () {
        MarkerCreatorService.createByCurrentLocation(function (marker) {
            marker.options.labelContent = 'You´re here';
            $scope.map.markers.push(marker);
            refresh(marker);
        });
    };

    $scope.addAddress = function () {
        var address = $scope.address;
        if (address !== '') {
            MarkerCreatorService.createByAddress(address, function (marker) {
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        }
    };

    function refresh(marker) {
        $scope.map.control.refresh({
            latitude: marker.latitude,
            longitude: marker.longitude
        });
    }

}]);