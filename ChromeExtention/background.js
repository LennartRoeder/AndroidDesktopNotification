window.setInterval(function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://thinking-aloud.no-ip.org:8080/getNotifications", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            response.forEach(function (entry) {
                createNotification(entry);
            });
        }
    };
    xhr.send();
// ms between check for new Messages. Should be increased for release
}, 5000);

function createNotification(data) {
    var options = {
        type: 'list',
        title: 'Notification',
        message: 'Primary message to display',
        items: [{title: data.title, message: data.message}],
        iconUrl: 'notification.png'
    };
    chrome.notifications.create('', options, function (id) {
    });
}