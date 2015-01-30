var notification;

// This should work both there and elsewhere.
function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

window.setInterval(function () {

    $.ajax({
        url: "https://thinking-aloud.no-ip.org:8080/getNotifications",
        type: "GET",
        success: function (data) {

            if (!isEmptyObject(data)) {
                var optionen = {
                    type: 'list',
                    title: 'Email',
                    message: 'Primary message to display',
//                    items: [{title: 'mein Titel', message: decodeURIComponent(data)}],
                    items: [{title: '', message: decodeURIComponent(data)}],
                    iconUrl: 'notification.png'
                };

                chrome.notifications.create('mein Titel', optionen, function (id) {
                });
//                setTimeout(function () {
//                AUTOHIDE: not implemented jet
//                }, 3000);
            }
        }
    });
    // ms between check for new Messages. Should be increased for release
}, 2000);



