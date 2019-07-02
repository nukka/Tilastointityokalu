let $ = require('jquery');
const ipcR = require('electron').ipcRenderer;

let fs = require('fs');
let filename = 'testidata';


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
            ipcR.send("clicked_checkbox_noanswer", 'ping');
            ipcR.send('update-from-bg', 'Kontaktia ei syntyny');
        }
        let age = $("input[name='optradio_age']:checked").val();
        let help = $("input[name='optradio_help']:checked").val();
        let sex = $("input[name='optradio_sex']:checked").val();
        let child = $("input[name='optradio_c']:checked").val();
        let contact_type = $("input[name='optradio_co']:checked").val();
        let status = $("option[name='status']:checked").val();
        let bgValues = [];

        let infoValues = [];


        $("input[name='bgcheck']:checked").each(function (index, value) {
            bgValues.push($(value).val());
            if (bgValues.length !== 0) {
            }
        });


        if (age === undefined && help === undefined && sex === undefined && child === undefined && contact_type === undefined && status === undefined && bgValues.length === 0) {
            console.log("Tietoja ei syötetty");

        } else {

            if (age !== undefined) {

                infoValues.push('Ika:' + age);
            }

            if (help !== undefined) {

                infoValues.push('Apu:' + help);
            }
            if (sex !== undefined) {

                infoValues.push('Sukupuoli:' + sex);

            }

            if (status !== undefined) {
                infoValues.push(status);
            }


            if (child !== undefined) {
                infoValues.push(child);
            }

            if (bgValues.length !== 0) {
                infoValues.push('[' + bgValues + ']');
            }

            if (contact_type !== undefined) {
                infoValues.push(contact_type);
            }
            ipcR.send('update-from-bg', infoValues);
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

        let crisisValues = [];
        let changeValues = [];
        let concernValues = [];
        let wellbeingValues = [];

        let inputValues = [];


        $("input[name='check_crisis']:checked").each(function (index, value) {
            crisisValues.push($(value).val());
        });


        $("input[name='check_change']:checked").each(function (index, value) {
            changeValues.push($(value).val());
        });

        $("input[name='check_concern']:checked").each(function (index, value) {
            concernValues.push($(value).val());
        });

        $("input[name='check_wellbeing']:checked").each(function (index, value) {
            wellbeingValues.push($(value).val());
        });

        if (crisisValues.length === 0 && changeValues.length === 0 && concernValues.length === 0 && wellbeingValues.length === 0) {
            console.log("Tietoja ei syötetty");
        } else {


            if (crisisValues.length !== 0) {
                inputValues.push('[' + crisisValues + ']');

            }

            if (changeValues.length !== 0) {
                inputValues.push('[' + changeValues + ']');
            }

            if (concernValues.length !== 0) {
                inputValues.push('[' + concernValues + ']');
            }

            if (wellbeingValues.length !== 0) {
                inputValues.push('[' + wellbeingValues + ']');
            }

            ipcR.send('update-from-reason', inputValues);
        }


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

        let continueValues = [];

        $("input[name='check_continue']:checked").each(function (index, value) {
            continueValues.push($(value).val());
            if (continueValues.length !== 0) {
                console.log(continueValues);
            }
        });

        if (continueValues.length === 0) {
            console.log("Tietoja ei syötetty");
        } else {
            ipcR.send('update-from-help', continueValues);

        }


    });
});

$(document).ready(function () {
    $('#btn-previous-evaluation').click(function () {
        ipcR.send('clicked_previous_evaluation', 'ping');
    });
});

$(document).ready(function () {

    let inputDatabg;
    let inputDatareason;
    let inputDatahelp;


    ipcR.on('action-update-bg', (event, arg) => {
        inputDatabg = arg;
    });

    ipcR.on('action-update-reason', (event, arg) => {
        inputDatareason = arg;
    });

    ipcR.on('action-update-help', (event, arg) => {
        inputDatahelp = arg;
    });


    $('#btn-save').click(function () {

        let inputValues = [];
        ipcR.send('clicked_save', 'ping');

        let evaluation_a = $("input[name='evaluation_a']:checked").val();
        let evaluation_y = $("input[name='evaluation_y']:checked").val();
        let text = $('textarea#textarea_e').val();

        if (evaluation_a === undefined && evaluation_y === undefined && text.length === 0) {
            console.log("Tietoja ei tallennettu");

        } else {
            if (evaluation_a !== undefined) {

                inputValues.push(evaluation_a);
            }


            if (evaluation_y !== undefined) {

                inputValues.push(evaluation_y);
            }

            if (text.length !== 0) {

                inputValues.push(text);
            }


        }

        let writeFile = [];

        if (inputDatabg !== undefined) {
            writeFile.push(inputDatabg);
        }

        if (inputDatareason !== undefined) {
            writeFile.push(inputDatareason);
        }
        if (inputDatahelp !== undefined) {
            writeFile.push(inputDatahelp);
        }
        if (inputValues !== undefined) {
            writeFile.push(inputValues);
        }

        if (inputDatabg === undefined && inputDatareason === undefined && inputDatahelp === undefined) {
            console.log("tyhjää");
        } else {
            fs.appendFile(filename, writeFile + '\n', (err) => {
                if (err) {
                    throw err;

                }

            });
        }


        /*fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) throw err;
            let array = [];
            array.push(data);
            var rows = data.split('\n');


            console.log(rows.length);


        });    */
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
    $('textarea[name=text_area]').bind('input propertychange', function () {
        console.log(this.value);
    });

});

















