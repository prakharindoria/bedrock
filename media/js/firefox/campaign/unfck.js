/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */


/*
    Twitter sharing
*/
(function() {
    'use strict';

    // Twitter share
    function openTwitterSubwin(url) {
        var width = 550;
        var height = 420;
        var options = {
            'scrollbars': 'yes',
            'resizable': 'yes',
            'toolbar': 'no',
            'location': 'yes',
            'width': width,
            'height': height,
            'top': screen.height > height ? Math.round((screen.height / 2) - (height / 2)) : 0,
            'left': Math.round((screen.width / 2) - (width / 2))
        };

        window.open(url, 'twitter_share', window._SearchParams.objectToQueryString(options).replace(/&/g, ',')).focus();
    }

    function handleShareLinkClick(e) {
        var item = e.target.closest('.c-item-unfck');
        if(e.target.tagName == 'SPAN') {
            var href = e.target.parentElement.href;
        } else {
            var href = e.target.href;
        }

        // Track the event in GA
        window.dataLayer.push({
            'event': 'in-page-interaction',
            'eAction': 'checklist',
            'eLabel': 'share: ' + item.id,
        });

        // Open Twitter in a sub window
        openTwitterSubwin(href);
        e.preventDefault();
    }

    function onLoad() {
        // Set up twitter link handler
        var shareLinks = document.querySelectorAll('.js-twitter-share');

        for (var i = 0; i < shareLinks.length; i++) {
            shareLinks[i].addEventListener('click', handleShareLinkClick, false);
        }
    }

    window.Mozilla.run(onLoad);
})();


/*
    Download GIF
*/
(function() {
    'use strict';

    function watchDownloads() {
        var downloadLinks = document.querySelectorAll('.js-download-gif');

        for (var i = 0; i < downloadLinks.length; i++) {
            downloadLinks[i].addEventListener('click', function(e) {
                var item = e.target.closest('.c-item-unfck');
                // Track the event in GA
                window.dataLayer.push({
                    'event': 'in-page-interaction',
                    'eAction': 'checklist',
                    'eLabel': 'download: ' + item.id,
                });
            }, false);
        }
    }

    window.Mozilla.run(watchDownloads);

})();


/*
    Copy link to clipboard
*/
(function() {
    'use strict';

    // Copy Link
    var clipboard = new ClipboardJS('.js-copy-link');

    clipboard.on('success', function(e) {
        var item = e.trigger.closest('.c-item-unfck');
        var notification = item.querySelector('.mzp-c-notification-bar');
        notification.classList.add('is-visible');

        // Track the event in GA
        window.dataLayer.push({
            'event': 'in-page-interaction',
            'eAction': 'checklist',
            'eLabel': 'copy: ' + item.id,
        });

        setTimeout(function(){
            notification.classList.remove('is-visible');
         }, 3000);
    });
    clipboard.on('error', function(e) {
        // TODO
        // eslint-disable-next-line no-console
        console.log('error');
        // Maybe just show notification with link text?
        // keep it visible longer than success?
    });
})();


/*
    Tell us
*/
(function() {
    'use strict';

    // remaining charcters countdown

    // submit form

    // show sucess message

    // prompt to share on twitter

    // button to reset and show form again

})();
