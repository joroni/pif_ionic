(function() {

    var button = document.getElementById('cn-button'),
        wrapper = document.getElementById('cn-wrapper');

    //open and close menu when the button is clicked
    var open = false;

    $ionicPlatform.on('resume', function() {
        // your staff here
        button.addEventListener('click', handler, false);
    });

    $ionicPlatform.on('pause', function() {
        // your staff here
    });

    function handler() {
        if (!open) {
            this.innerHTML = "Close";
            classie.add(wrapper, 'opened-nav');
        } else {
            this.innerHTML = "Menu";
            classie.remove(wrapper, 'opened-nav');
        }
        open = !open;
    }

    function closeWrapper() {
        classie.remove(wrapper, 'opened-nav');
    }

})();