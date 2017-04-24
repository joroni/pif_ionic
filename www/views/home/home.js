angular.module('App').controller('HomeCtrl', function($scope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup, EventsService) {







    var comment = {
        message: '',
        rating: 5
    };


    $scope.comment = angular.copy(comment);

    $scope.sendComments = function() {
        // Send comment
        $scope.cancelComments();
        $ionicPopup.alert({
            title: 'Thank you!',
            template: 'We appreciate your comments!',
            okText: 'Close'
        });
    };

    $scope.cancelComments = function() {
        $scope.comment = angular.copy(comment);
        $scope.modal.hide();
    }

    $scope.openComments = function() {
        $ionicModal.fromTemplateUrl('views/home/comments.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    };


    $scope.addClass = function() {
        $scope.nav - bar.push('home');
    }

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        if ($scope.modal) {
            $scope.modal.remove();
        }
    });



    (function() {

        var button = document.getElementById('cn-button');
        wrapper = document.getElementById('cn-wrapper');

        //open and close menu when the button is clicked
        var open = false;
        button.addEventListener('click', handler, false);

        function handler() {
            if (!open) {
                this.innerHTML = "<i class='ion-android-expand'></i>";
                classie.add(wrapper, 'opened-nav');
            } else {
                this.innerHTML = "<i class='ion-grid'></i>";
                classie.remove(wrapper, 'opened-nav');
            }
            open = !open;
        }

        function closeWrapper() {
            classie.remove(wrapper, 'opened-nav');


        }

    })();

    /*angular.module('App', ['angularCircularNavigation'])



    $scope.options = {
        content: null,
        isOpen: false,
        toggleOnClick: true,
        button: {
            content: null,
            cssClass: 'fa fa-bar-chart-o',
            background: 'red',
            color: 'white',
            size: 'small'
        },

        items: [{
            content: 'About',
            onclick: function() {
                console.log('About');
            }
        }]
    };

*/
    /*
        $http.get('http://api.openweathermap.org/data/2.5/weather?q=Key%20West,FL&units=imperial').success(function(data) {
            $scope.weather = data;
        });
    */
    var events = EventsService.$asArray();
    events.$loaded().then(function() {
        $scope.today = events[new Date().getDay()];
    });

});