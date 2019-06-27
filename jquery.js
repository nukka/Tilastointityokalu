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

        if ($('#checkbox-no-answer').is(':checked')) {
            ipcR.send("clicked_checkbox_noanswer", 'ping')
        }

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
    $("input[type='radio']").click(function () {
        let age = $("input[name='optradio_age']:checked").val();
        let help = $("input[name='optradio_help']:checked").val();
        let sex = $("input[name='optradio_sex']:checked").val();
        let child = $("input[name='optradio_c']:checked").val();
        let contact = $("input[name='optradio_co']:checked").val();
        let evaluation_a = $("input[name='evaluation_a']:checked").val();
        let evaluation_y = $("input[name='evaluation_y']:checked").val();

        if (age) {
            console.log(age);
        }

        if (help) {
            console.log(help);
        }
        if (sex) {
            console.log(sex);
        }
        if (child) {
            console.log(child);
        }
        if (contact) {
            console.log(contact);
        }
        if (evaluation_a) {
            console.log(evaluation_a);
        }
        if (evaluation_y) {
            console.log(evaluation_y);
        }

        console.log('    ');

    })

});

$(document).ready(function () {
    $("input[type='checkbox']").click(function () {

        let bgValues = [];
        let crisisValues = [];
        let changeValues = [];
        let concernValues = [];
        let wellbeingValues = [];
        let continueValues = [];


        $("input[name='bgcheck']:checked").each(function (index, value) {
            bgValues.push($(value).val());
            if (bgValues.length !== 0) {
                console.log(bgValues);
            }
        });

        $("input[name='check_crisis']:checked").each(function (index, value) {
            crisisValues.push($(value).val());
            if (crisisValues.length !== 0) {
                console.log(crisisValues);
            }
        });

        $("input[name='check_change']:checked").each(function (index, value) {
            changeValues.push($(value).val());
            if (changeValues.length !== 0) {
                console.log(changeValues);
            }
        });

        $("input[name='check_concern']:checked").each(function (index, value) {
            concernValues.push($(value).val());
            if (concernValues.length !== 0) {
                console.log(concernValues);
            }
        });

        $("input[name='check_wellbeing']:checked").each(function (index, value) {
            wellbeingValues.push($(value).val());
            if (wellbeingValues.length !== 0) {
                console.log(wellbeingValues);
            }
        });

        $("input[name='check_continue']:checked").each(function (index, value) {
            continueValues.push($(value).val());
            if (continueValues.length !== 0) {
                console.log(continueValues);
            }
        });


    });


});

$(document).ready(function () {
    $('#drop').change(function () {
        let value = $(this);
        console.log(value.val());
    })

});

$(document).ready(function () {
    $('textarea[name=text_area]').bind('input propertychange', function() {
        console.log(this.value);
    });

});









