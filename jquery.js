let $ = require('jquery');
const ipcR = require('electron').ipcRenderer;

$(document).ready(function () {
    $("#btn-contact").click(function () {
        ipcR.send('clicked_contact', 'ping');
    });
});

$(document).ready(function () {
    $("#btn-quit").click(function () {
        ipcR.send('clicked_quit', 'ping');
    });
});

$(document).ready(function () {
    $('#btn-cancel').click(function () {
        console.log("peruuta nappia painettiin");
        ipcR.send('clicked_cancel', 'ping');
    });
});

