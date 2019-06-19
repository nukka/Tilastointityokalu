let $ = require('jquery');
const ipc = require('electron').ipcRenderer;

$(document).ready(function () {
    $("#btn-contact").click(function () {
        ipc.send('clicked_contact', 'ping');
    });
});

$(document).ready(function () {
    $("#btn-quit").click(function () {
        ipc.send('clicked_quit', 'ping');
    });
});