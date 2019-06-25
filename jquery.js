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
    $('#btn-cancel-bginfo').click(function () {
        ipcR.send('clicked_cancel', 'ping');
    });
});

$(document).ready(function () {
    $('#btn-next-bginfo').click(function () {
        ipcR.send('clicked_next', 'ping');
    });
});

$(document).ready(function () {
    $('#btn-previous-reason').click(function () {
        ipcR.send('clicked_previous_r', 'ping');
    })
});

$(document).ready(function () {
    $('#btn-next-reason').click(function () {
        ipcR.send('clicked_next_r', 'ping');
    })
});

$(document).ready(function () {
    $('#btn-toMain').click(function () {
        ipcR.send('clicked_toMain', 'ping');
    })
});

$(document).ready(function () {
    $('#btn-previous-help').click(function () {
        ipcR.send('clicked_previous_help', 'ping');
    });
});

$(document).ready(function () {
    $('#btn-next-help').click(function () {
        ipcR.send('clicked_next_help', 'ping');
    });
});

$(document).ready(function () {
    $('#btn-previous-evaluation').click(function () {
        ipcR.send('clicked_previous_evaluation', 'ping');
    });
});

$(document).ready(function () {
    $('#btn-save').click(function () {
        ipcR.send('clicked_save', 'ping');
    });
});

$(document).ready(function () {
    $('#btn-back-success').click(function () {
        ipcR.send('clicked_previous_success', 'ping');
    });
});

$(document).ready(function () {
    $('#checkbox-no-answer').click(function () {
        ipcR.send("clicked_checkbox_noanswer", 'ping')
    });
});


