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
    $("#btn-statistics").click(function () {
        ipcR.send('clicked_stat', 'ping');
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
                infoValues.push('Status:' + status);
            }


            if (child !== undefined) {
                infoValues.push('Lapsi_lkm:' + child);
            }

            if (bgValues.length !== 0) {
                for (let i = 0; i < bgValues.length; i++) {
                    infoValues.push('Lapsi_ikä:' + bgValues[i]);
                }

            }

            if (contact_type !== undefined) {
                infoValues.push('Yht_otto:' + contact_type);
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

                for (let i = 0; i < crisisValues.length; i++) {
                    inputValues.push('Kriisi:' + crisisValues[i]);
                }

            }

            if (changeValues.length !== 0) {

                for (let i = 0; i < changeValues.length; i++) {
                    inputValues.push('Muutos:' + changeValues[i]);
                }
            }

            if (concernValues.length !== 0) {

                for (let i = 0; i < concernValues.length; i++) {
                    inputValues.push('Huoli:' + concernValues[i]);
                }

            }

            if (wellbeingValues.length !== 0) {

                for (let i = 0; i < wellbeingValues.length; i++) {
                    inputValues.push('Hyvinvointi:' + wellbeingValues[i]);
                }
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
            continueValues.push('Jatko:' + $(value).val());
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

                inputValues.push('Arvio_a:' + evaluation_a);
                //console.log(inputValues);
            }


            if (evaluation_y !== undefined) {

                inputValues.push('Arvio_y:' + evaluation_y);
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
        if (inputValues.length !== 0) {
            writeFile.push(inputValues);
        }


        if (inputDatabg === undefined && inputDatareason === undefined && inputDatahelp === undefined && inputValues.length === 0) {
            // console.log("tyhjää");
        } else {
            fs.appendFile(filename, writeFile + '\n', (err) => {
                if (err) {
                    throw err;

                }

            });
        }


    });


});


$(document).ready(function () {

    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) throw err;

        let array = data.split('\n');

        let ages = [];
        let helps = [];
        let sexs = [];
        let statuses = [];
        let child_ages = [];
        let child_lkm = [];
        let contacts = [];

        let crisises = [];
        let changes = [];
        let concerns = [];
        let wells = [];

        let continues = [];

        let evas_y = [];
        let evas_a = [];

        $.each(array, function (index) {
            let row = array[index].split(',');
            //console.log(row);


            $.each(row, function (index) {
                let word = row[index].split(',');
                //console.log(word);


                let found = false;
                $.each(word, function (index, value) {
                    if (value.indexOf(':') >= 0) {

                        found = true;
                        //console.log(found);

                        if (found === true) {
                            let string = word[index].split(':');
                            //console.log(string);

                            if (string[0] === 'Ika') {
                                ages.push(string[1]);

                            }

                            if (string[0] === 'Apu') {
                                helps.push(string[1]);
                            }

                            if (string[0] === 'Sukupuoli') {
                                sexs.push(string[1]);
                            }

                            if (string[0] === 'Status') {
                                statuses.push(string[1]);
                            }

                            if (string[0] === 'Lapsi_lkm') {
                                child_lkm.push(string[1]);

                            }

                            if (string[0] === 'Lapsi_ikä') {
                                child_ages.push(string[1]);
                            }

                            if (string[0] === 'Yht_otto') {
                                contacts.push(string[1]);
                            }

                            if (string[0] === 'Kriisi') {
                                crisises.push(string[1]);

                            }

                            if (string[0] === 'Muutos') {
                                changes.push(string[1]);

                            }

                            if (string[0] === 'Huoli') {
                                concerns.push(string[1]);
                            }

                            if (string[0] === 'Hyvinvointi') {
                                wells.push(string[1]);
                            }

                            if (string[0] === 'Jatko') {
                                continues.push(string[1]);
                            }

                            if (string[0] === 'Arvio_y') {
                                evas_y.push(string[1]);
                            }

                            if (string[0] === 'Arvio_a') {
                                evas_a.push(string[1]);
                            }

                        }
                        // return false;
                    }

                });


            });


        });

        let counts_age = {};
        let counts_help = {};
        let counts_sex = {};
        let counts_status = {};
        let counts_cAge = {};
        let counts_child_lkm = {};
        let counts_contact = {};
        let counts_crisis = {};
        let counts_change = {};
        let counts_corcern = {};
        let counts_well = {};
        let counts_cont = {};
        let counts_eva_y = {};
        let counts_eva_a = {};

        for (let i = 0; i < ages.length; i++) {
            let age = ages[i];
            counts_age[age] = counts_age[age] ? counts_age[age] + 1 : 1;
        }


        for (let i = 0; i < helps.length; i++) {
            let help = helps[i];
            counts_help[help] = counts_help[help] ? counts_help[help] + 1 : 1;
        }


        for (let i = 0; i < sexs.length; i++) {
            let sex = sexs[i];
            counts_sex[sex] = counts_sex[sex] ? counts_sex[sex] + 1 : 1;
        }

        for (let i = 0; i < statuses.length; i++) {
            let status = statuses[i];
            counts_status[status] = counts_status[status] ? counts_status[status] + 1 : 1;
        }

        for (let i = 0; i < child_lkm.length; i++) {
            let lkm = child_lkm[i];
            counts_child_lkm[lkm] = counts_child_lkm[lkm] ? counts_child_lkm[lkm] + 1 : 1;
        }


        for (let i = 0; i < child_ages.length; i++) {
            let age = child_ages[i];
            counts_cAge[age] = counts_cAge[age] ? counts_cAge[age] + 1 : 1;
        }

        for (let i = 0; i < contacts.length; i++) {
            let contact = contacts[i];
            counts_contact[contact] = counts_contact[contact] ? counts_contact[contact] + 1 : 1;
        }

        for (let i = 0; i < crisises.length; i++) {
            let crisis = crisises[i];
            counts_crisis[crisis] = counts_crisis[crisis] ? counts_crisis[crisis] + 1 : 1;
        }

        for (let i = 0; i < changes.length; i++) {
            let change = changes[i];
            counts_change[change] = counts_change[change] ? counts_change[change] + 1 : 1;
        }

        for (let i = 0; i < concerns.length; i++) {
            let concern = concerns[i];
            counts_corcern[concern] = counts_corcern[concern] ? counts_corcern[concern] + 1 : 1;
        }

        for (let i = 0; i < wells.length; i++) {
            let well = wells[i];
            counts_well[well] = counts_well[well] ? counts_well[well] + 1 : 1;

        }

        for (let i = 0; i < continues.length; i++) {
            let cont = continues[i];
            counts_cont[cont] = counts_cont[cont] ? counts_cont[cont] + 1 : 1;

        }


        for (let i = 0; i < evas_y.length; i++) {
            let eva = evas_y[i];
            counts_eva_y[eva] = counts_eva_y[eva] ? counts_eva_y[eva] + 1 : 1;

        }

        for (let i = 0; i < evas_a.length; i++) {
            let eva = evas_a[i];
            counts_eva_a[eva] = counts_eva_a[eva] ? counts_eva_a[eva] + 1 : 1;

        }


        //console.log(evas_a);

        console.log('Yhteydenottojen määrä: ' + array.length);
        console.log('Alle 18: ' + counts_age['Alle 18'] + '\n', '19-30: ' + counts_age['19-30'] + '\n', '31-40: ' + counts_age['31-40'] + '\n', '41-50: ' + counts_age['41-50'] + '\n', '51-60: ' + counts_age['51-60'] + '\n', 'Yli 60: ' + counts_age['Yli 60'] + '\n');
        console.log('Oma perhe: ' + counts_help['Omalle perheelle'], 'Ystävä/tuttava: ' + counts_help['Ystävälle/tuttavalle']);
        console.log('Mies: ' + counts_sex['Mies'], 'Nainen: ' + counts_sex['Nainen'], 'Muu: ' + counts_sex['Muu'], 'Ei tietoa: ' + counts_sex['Ei tietoa']);
        console.log('Työssäkäyvä: ' + counts_status['Työssäkäyvä'], 'Työtön: ' + counts_status['Työtön'], 'Opiskelija: ' + counts_status['Opiskelija'], 'Eläkelainen: ' + counts_status['Eläkeläinen'], 'Varusmies: ' + counts_status['Varusmies'], 'Kotona: ' + counts_status['Kotona lasten kanssa'], 'Sairaslomalla: ' + counts_status['Sairaslomalla']);
        console.log('Ei vielä syntynyt: ' + counts_cAge['[Ei vielä syntynyt]'], '6kk tai alle: ' + counts_cAge['6kk tai alle'], '1v tai alle: ' + counts_cAge['1v tai alle'], '2-4v: ' + counts_cAge['2-4v'], '5-7v: ' + counts_cAge['5-7v'], '8-10v: ' + counts_cAge['8-10v'], '11-13v: ' + counts_cAge['11-13v'], '14-16v: ' + counts_cAge['14-16v'], '17 tai yli: ' + counts_cAge['17 tai yli']);
        console.log('Ei lapsia: ' + counts_child_lkm['Ei lapsia'], '1 lapsi: ' + counts_child_lkm['1 lapsi'], '2 -3 lasta: ' + counts_child_lkm['2-3 lasta'], '4-7 lasta: ' + counts_child_lkm['4-7 lasta'], 'Yli 8 lasta: ' + counts_child_lkm['8 tai enemmän'], 'Ei tietoa: ' + counts_child_lkm['Ei tietoa']);
        console.log('Puhelinsoitto: ' + counts_contact['Puhelinsoitto'], 'Sähköposti: ' + counts_contact['Sähköpostiviesti']);

        console.log('Avo-/avioero tai parisuhteen päättyminen: ' + counts_crisis['Avo-/avioero tai parisuhteen päättyminen'], 'Harkitsemassa eroa: ' + counts_crisis['Harkitsemassa eroa'], 'Avioeron/avoeron hakemisen käytännöt: ' + counts_crisis['Avioeron/avoeron hakemisen käytännöt'], 'Vanhemmuus eron jälkeen: ' + counts_crisis['Vanhemmuus eron jälkeen'], 'Lasten huoltajuuteen liittyvä haaste: ' + counts_crisis['Lasten huoltajuuteen liittyvä haaste'], 'Ex-puolisoon liittyvä haaste: ' + counts_crisis['Ex-puolisoon liittyvä haaste'], 'Uusperheeseen liittyvä haaste: ' + counts_crisis['Uusperheeseen liittyvä haaste'], 'Ystävyys- ja perhesuhteisiin liittyvä haaste: ' + counts_crisis['Ystävyys- ja perhesuhteisiin liittyvä haaste'], 'Muu: ' + counts_crisis['Muu']);
        console.log('Raskaus: ' + counts_change['Raskaus'], 'Lapsen syntymä: ' + counts_change['Lapsen syntymä'], 'Sairastuminen: ' + counts_change['Sairastuminen'], 'Työttömäksi jääminen: ' + counts_change['Työttömäksi jääminen'], 'Elääkkeelle jääminen: ' + counts_change['Eläkkeelle jääminen'], 'Työelämän tai koulutuksen ulkopuolelle jääminen: ' + counts_change['Työelämän tai koulutuksen ulkopuolelle jääminen'], 'Läheisen kuolema: ' + counts_change['Läheisen kuolema'], 'Väkivallan kohteeksi joutuminen' + counts_change['Väkivallan kohteeksi joutuminen'], 'Äkillinen vammautuminen/sairastuminen' + counts_change['Äkillinen vammautuminen/sairastuminen'], 'Taloudelliset vaikeudet: ' + counts_change['Taloudelliset vaikeudet'], 'Muu: ' + counts_change['Muu']);
        console.log('Vauvaikäiseen liittyvä huoli: ' + counts_corcern['Vauvaikäiseen liittyvä huoli'], 'Leikki- tai kouluikäiseen liittyvä huoli: ' + counts_corcern['Leikki- tai kouluikäiseen liittyvä huoli'], 'Murrosikäiseen/teini-ikäiseen lapseen liittyvä huoli: ' + counts_corcern['Murrosikäiseen/teini-ikäiseen lapseen liittyvä huoli'], 'Muu: ' + counts_corcern['Muu']);
        console.log('Perustarpeisiin liittyvä haaste: ' + counts_well['Perustarpeisiin liittyvä haaste'], 'Päihde- tai riippuvuusongelma: ' + counts_well['Päihde- tai riippuvuusongelma'], 'Seksuaalisuuteen liittyvä ongelma: ' + counts_well['Seksuaalisuuteen liittyvä ongelma'], 'Stressi: ' + counts_well['Stressi'], 'Uupumus: ' + counts_well['Uupumus'], 'Yksinäisyys: ' + counts_well['Yksinäisyys'], 'Mielenterveysongelma: ' + counts_well['Mielenterveysongelma'], 'Itsetunto-ongelma: ' + counts_well['Itsetunto-ongelma'], 'Muu: ' + counts_well['Muu']);

        console.log('Vanhemman neuvo -vertaistukiryhmä: ', counts_cont['Vanhemman neuvo -vertaistukiryhmä'], 'Eroneuvoilta/erokahvila: ' + counts_cont['Eroneuvoilta/erokahvila'], 'Eroseminaari: ' + counts_cont['Eroseminaari'], 'Miesten eroryhmä: ' + counts_cont['Miesten eroryhmä'], 'Sovittu tapaaminen: ' + counts_cont['Sovittu tapaaminen'], 'Chat-palvelu: ' + counts_cont['Chat-palvelu'], 'Erotukihenkilö: ' + counts_cont['Erotukihenkilö'] + 'Lastenvalvoja: ' + counts_cont['Lastenvalvoja'], 'Turvakotiin ohjaus: ' + counts_cont['Turvakotiin ohjaus'], 'Perheasioiden sovittelu: ' + counts_cont['Perheasioiden sovittelu'], 'Ei jatkotoimenpiteitä: ' + counts_cont['Ei jatkotoimenpiteitä'], 'Muu: ' + counts_cont['Muu']);
        console.log('a1: ' + counts_eva_y['1'], 'a2: ' + counts_eva_y['2'], 'a3: ' + counts_eva_y['3'], 'a4: ' + counts_eva_y['4'], 'a5: ' + counts_eva_y['5']);
        console.log('y1: ' + counts_eva_a['1'], 'y2: ' + counts_eva_a['2'], 'y3: ' + counts_eva_a['3'], 'y4: ' + counts_eva_a['4'], 'y5: ' + counts_eva_a['5']);


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

















