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
    $("#btn-record").click(function () {
        ipcR.send('clicked_rec', 'ping');

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
            ipcR.send('update-from-bg', 'empty');

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
        ipcR.send('clicked_toMain', 'ping')

    })
});

$(document).ready(function () {

    $('#arrow-btn').click(function () {
        ipcR.send('clicked_toMain', 'ping')

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
        if (arg !== 'empty') {
            inputDatabg = arg;
        }

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

                inputValues.push('Teksti:' + text);
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
        let text = [];

        let unique_ages = 0;
        let unique_helps = 0;
        let unique_sexs = 0;
        let unique_statuses = 0;
        let unique_childs = 0;
        let unique_cages = 0;
        let unique_contacts = 0;
        let unique_crisis = 0;
        let unique_change = 0;
        let unique_concern = 0;
        let unique_well = 0;
        let unique_cont = 0;
        let unique_est_y = 0;
        let unique_est_a = 0;


        let tempRow = [];
        let tempRow2 = [];
        let tempAge = [];
        let tempHelp = [];
        let tempSex = [];
        let tempStatus = [];
        let tempChilds = [];
        let tempChildAge = [];
        let tempContact = [];
        let tempCrisis = [];
        //let tempChange=[];
        let tempConcern = [];
        //let tempWell=[];
        let tempCont = [];
        let tempEy = [];
        let tempEa = [];
        let tempText = [];


        $.each(array, function (index) {
            let row = array[index].split(',');
            //displayTitle(muutos);
            //displayTitle(huoli);


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
                                unique_ages = ages.filter(function (itm, i, ages) {
                                    return i === ages.indexOf(itm);
                                });

                                tempAge.push(string[1]);

                            }

                            if (string[0] === 'Apu') {
                                helps.push(string[1]);

                                unique_helps = helps.filter(function (itm, i, helps) {
                                    return i === helps.indexOf(itm);
                                });

                                tempHelp.push(string[1]);
                            }

                            if (string[0] === 'Sukupuoli') {
                                sexs.push(string[1]);

                                unique_sexs = sexs.filter(function (itm, i, sexs) {
                                    return i === sexs.indexOf(itm);
                                });

                                tempSex.push(string[1]);
                            }

                            if (string[0] === 'Status') {
                                statuses.push(string[1]);

                                unique_statuses = statuses.filter(function (itm, i, statuses) {
                                    return i === statuses.indexOf(itm);
                                });

                                tempStatus.push(string[1]);

                            }

                            if (string[0] === 'Lapsi_lkm') {
                                child_lkm.push(string[1]);

                                unique_childs = child_lkm.filter(function (itm, i, child_lkm) {
                                    return i === child_lkm.indexOf(itm);
                                });

                                tempChilds.push(string[1]);


                            }


                            if (string[0] === 'Lapsi_ikä') {
                                child_ages.push(string[1]);

                                unique_cages = child_ages.filter(function (itm, i, child_ages) {
                                    return i === child_ages.indexOf(itm);
                                });
                                tempChildAge.push(string[1]);

                            }

                            if (string[0] === 'Yht_otto') {
                                contacts.push(string[1]);

                                unique_contacts = contacts.filter(function (itm, i, contacts) {
                                    return i === contacts.indexOf(itm);
                                });

                                tempContact.push(string[1]);
                            }

                            if (string[0] === 'Kriisi') {
                                crisises.push(string[1]);

                                unique_crisis = crisises.filter(function (itm, i, crisises) {
                                    return i === crisises.indexOf(itm);
                                });

                                tempCrisis.push(string[1]);

                            }

                            if (string[0] === 'Muutos') {


                                changes.push(string[1]);

                                unique_change = changes.filter(function (itm, i, changes) {
                                    return i === changes.indexOf(itm);


                                });

                                tempRow.push(string[1]);
                            }


                            if (string[0] === 'Huoli') {

                                concerns.push(string[1]);
                                unique_concern = concerns.filter(function (itm, i, concerns) {
                                    return i === concerns.indexOf(itm);
                                });

                                tempConcern.push(string[1]);
                            }

                            if (string[0] === 'Hyvinvointi') {
                                wells.push(string[1]);

                                unique_well = wells.filter(function (itm, i, wells) {
                                    return i === wells.indexOf(itm);
                                });

                                tempRow2.push(string[1]);

                            }

                            if (string[0] === 'Jatko') {
                                continues.push(string[1]);

                                unique_cont = continues.filter(function (itm, i, continues) {
                                    return i === continues.indexOf(itm);
                                });

                                tempCont.push(string[1]);
                            }

                            if (string[0] === 'Arvio_y') {
                                evas_y.push(string[1]);

                                unique_est_y = evas_y.filter(function (itm, i, evas_y) {
                                    return i === evas_y.indexOf(itm);
                                });
                                tempEy.push(string[1]);
                            }


                            if (string[0] === 'Arvio_a') {
                                evas_a.push(string[1]);

                                unique_est_a = evas_a.filter(function (itm, i, evas_a) {
                                    return i === evas_a.indexOf(itm);
                                });
                                tempEa.push(string[1]);
                            }

                            if (string[0] === 'Teksti') {
                                text.push(string[1]);
                                tempText.push(string[1]);
                            }


                        }

                    }


                });

            });

            if ((array.length - 1) > index) {

                $('.record').append('<br/>');
                $('.record').append('<span class="registration">' + (index + 1) + '</span>' + '<span class="registration">' + '. kirjaus' + '</span>');
                $('.record').append('<br/>');

            }

            showInfo(tempRow, 'Perhetilanteen muutos: ');
            showInfo(tempRow2, 'Hyvinvointi: ');
            showInfo(tempAge, 'Ikä: ');
            showInfo(tempHelp, 'Tarvitsen apua: ');
            showInfo(tempSex, 'Sukupuoli: ');
            showInfo(tempStatus, 'Sosioekonominen asema: ');
            showInfo(tempChilds, 'Lasten lukumäärä: ');
            showInfo(tempChildAge, 'Lasten iät: ');
            showInfo(tempContact, 'Yhteydenottotapa: ');
            showInfo(tempCrisis, 'Kriisi: ');
            showInfo(tempConcern, 'Huoli lapsesta: ');
            showInfo(tempCont, 'Suositeltu jatko: ');
            showInfo(tempEy, 'Yhteydenottajan arvio ');
            showInfo(tempEa, 'Asiantuntijan arvio ');
            showInfo(tempText, 'Muuta huomioitavaa: ');

            if ((array.length - 2) > index) {
                $('.record').append('<div class="line-padding">');
                $('.record').append('<div class="line">');
            }


            tempRow.length = 0;
            tempRow2.length = 0;
            tempAge.length = 0;
            tempHelp.length = 0;
            tempSex.length = 0;
            tempStatus.length = 0;
            tempChilds.length = 0;
            tempChildAge.length = 0;
            tempContact.length = 0;
            tempCrisis.length = 0;
            tempConcern.length = 0;
            tempCont.length = 0;
            tempEy.length = 0;
            tempEa.length = 0;
            tempText.length = 0;


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

        let age_count = [];
        let help_count = [];
        let sex_count = [];
        let status_count = [];
        let childage_count = [];
        let child_count = [];
        let contact_count = [];
        let crisis_count = [];
        let change_count = [];
        let concern_count = [];
        let well_count = [];
        let cont_count = [];
        let eva_y_count = [];
        let eva_a_count = [];

        age_count.push(counts_age[unique_ages[0]], counts_age[unique_ages[1]], counts_age[unique_ages[2]], counts_age[unique_ages[3]], counts_age[unique_ages[4]], counts_age[unique_ages[5]]);
        help_count.push(counts_help[unique_helps[0]], counts_help[unique_helps[0]]);
        sex_count.push(counts_sex[unique_sexs[0]], counts_sex[unique_sexs[1]], counts_sex[unique_sexs[2]], counts_sex[unique_sexs[3]]);
        status_count.push(counts_status[unique_statuses[0]], counts_status[unique_statuses[1]], counts_status[unique_statuses[2]], counts_status[unique_statuses[3]], counts_status[unique_statuses[4]], counts_status[unique_statuses[5]], counts_status[unique_statuses[6]]);
        childage_count.push(counts_cAge[unique_cages[0]], counts_cAge[unique_cages[1]], counts_cAge[unique_cages[2]], counts_cAge[unique_cages[3]], counts_cAge[unique_cages[4]], counts_cAge[unique_cages[5]], counts_cAge[unique_cages[6]], counts_cAge[unique_cages[7]]);
        child_count.push(counts_child_lkm[unique_childs[0]], counts_child_lkm[unique_childs[1]], counts_child_lkm[unique_childs[2]], counts_child_lkm[unique_childs[3]], counts_child_lkm[unique_childs[4]], counts_child_lkm[unique_childs[5]]);
        contact_count.push(counts_contact[unique_contacts[0]], counts_contact[unique_contacts[1]]);
        crisis_count.push(counts_crisis[unique_crisis[0]], counts_crisis[unique_crisis[1]], counts_crisis[unique_crisis[2]], counts_crisis[unique_crisis[3]], counts_crisis[unique_crisis[4]], counts_crisis[unique_crisis[5]], counts_crisis[unique_crisis[6]], counts_crisis[unique_crisis[7]], counts_crisis[unique_crisis[8]], counts_crisis[unique_crisis[9]]);
        change_count.push(counts_change[unique_change[0]], counts_change[unique_change[2]], counts_change[unique_change[3]], counts_change[unique_change[4]], counts_change[unique_change[5]], counts_change[unique_change[6]], counts_change[unique_change[7]]);
        concern_count.push(counts_corcern[unique_concern[0]], counts_corcern[unique_concern[1]], counts_corcern[unique_concern[2]], counts_corcern[unique_concern[3]], counts_corcern[unique_concern[4]]);
        well_count.push(counts_well[unique_well[0]], counts_well[unique_well[1]], counts_well[unique_well[2]], counts_well[unique_well[3]], counts_well[unique_well[4]], counts_well[unique_well[5]], counts_well[unique_well[6]], counts_well[unique_well[7]], counts_well[unique_well[8]], counts_well[unique_well[9]]);
        cont_count.push(counts_cont[unique_cont[0]], counts_cont[unique_cont[1]], counts_cont[unique_cont[2]], counts_cont[unique_cont[3]], counts_cont[unique_cont[4]], counts_cont[unique_cont[5]], counts_cont[unique_cont[6]], counts_cont[unique_cont[7]], counts_cont[unique_cont[8]], counts_cont[unique_cont[9]], counts_cont[unique_cont[10]], counts_cont[unique_cont[11]]);
        eva_y_count.push(counts_eva_y[unique_est_y[0]], counts_eva_y[unique_est_y[1]], counts_eva_y[unique_est_y[2]], counts_eva_y[unique_est_y[3]], counts_eva_y[unique_est_y[4]]);
        eva_a_count.push(counts_eva_a[unique_est_a[0]], counts_eva_a[unique_est_a[1]], counts_eva_a[unique_est_a[2]], counts_eva_a[unique_est_a[3]], counts_eva_a[unique_est_a[4]]);

        //console.log(unique_ages);
        //console.log(child_ages);

        parseArr(age_count);
        parseArr(help_count);
        parseArr(sex_count);
        parseArr(status_count);
        parseArr(childage_count);
        parseArr(child_count);
        parseArr(contact_count);
        parseArr(crisis_count);
        parseArr(change_count);
        parseArr(concern_count);
        parseArr(well_count);
        parseArr(cont_count);
        parseArr(eva_y_count);
        parseArr(eva_a_count);


        if (isEmptyArray(ages.length) === true && isEmptyArray(helps.length) === true && isEmptyArray(sexs.length) === true && isEmptyArray(statuses.length) === true && isEmptyArray(child_ages.length) === true && isEmptyArray(child_lkm.length) === true && isEmptyArray(contacts.length) === true) {
            $('.stat').hide();
            $('.bar').hide();
        } else {
            $('.stat_title').append('<span>Yhteydenottajan taustatiedot</span>');
        }

        if (isEmptyArray(crisises.length) === true && isEmptyArray(changes.length) === true && isEmptyArray(concerns.length) === true && isEmptyArray(wells.length) === true) {
            $('.stat').hide();
            $('.bar_r').hide();

        } else {
            $('.stat_title_r').append('<span>Yhteydenoton syy</span>');
        }
        if (isEmptyArray(continues.length)) {
            $('.stat').hide();
            $('.bar_c').hide();
        } else {
            $('.stat_title_c').append('<span>Mitä apua tarjottiin?</span>');
        }

        if (isEmptyArray(evas_a.length) === true && isEmptyArray(evas_y.length) === true) {
            $('.stat').hide();
            $('.bar_e').hide();
        } else {
            $('.stat_title_e').append('<span>Arvio palvelun hyödyllisyydestä</span>');
        }


        if (isEmptyArray(array.length) === false) {
            $('.in_total').append('<span>Kirjauksia yhteensä: </span>' + (array.length - 1) + '<span> kpl</span>');
        }


        if (isEmptyArray(ages.length) === false) {

            $('.age').append('<h3>Ikä</h3>');
            $('.age').append(ages.length + '<h7> kpl kirjausta</h7>');

            let ctx = $('#myChart');

            if ($('.statistics').length > 0) {
                pieChart(age_count, unique_ages, ctx);
            }


        }

        if (isEmptyArray(helps.length) === false) {
            $('.help').append('<h3>Etsin apua</h3>');
            $('.help').append(helps.length + '<h7> kpl kirjausta</h7>');

            let ctx = $('#myChartH');
            if ($('.statistics').length > 0) {
                pieChart(help_count, unique_helps, ctx);
            }


        }

        if (isEmptyArray(sexs.length) === false) {
            $('.sex').append('<h3>Sukupuoli</h3>');
            $('.sex').append(sexs.length + '<h7> kpl kirjausta</h7>');

            let ctx = $('#myChartS');

            if ($('.statistics').length > 0) {
                pieChart(sex_count, unique_sexs, ctx);
            }


        }

        if (isEmptyArray(statuses.length) === false) {
            $('.status').append('<h3>Sosioekonominen asema</h3>');
            $('.status').append(statuses.length + '<h7> kpl kirjausta</h7>');


            let ctx = $('#myChartSt');

            if ($('.statistics').length > 0) {
                pieChart(status_count, unique_statuses, ctx);
            }


        }

        if (isEmptyArray(child_ages.length) === false) {
            $('.child_age').append('<h3>Lasten iät</h3>');
            $('.child_age').append(child_ages.length + '<h7> kpl kirjausta</h7>');


            let ctx = $('#myChartCA');
            if ($('.statistics').length > 0) {
                pieChart(childage_count, unique_cages, ctx);
            }


        }

        if (isEmptyArray(child_lkm.length) === false) {
            $('.child_count').append('<h3>Lasten lukumäärä</h3>');
            $('.child_count').append(child_lkm.length + '<h7> kpl kirjausta</h7>');


            let ctx = $('#myChartCC');
            if ($('.statistics').length > 0) {
                pieChart(child_count, unique_childs, ctx);
            }


        }

        if (isEmptyArray(contacts.length) === false) {
            $('.contact').append('<h3>Yhteydenottotapa</h3>');
            $('.contact').append(contacts.length + '<h7> kpl kirjausta</h7>');


            let ctx = $('#myChartCO');
            if ($('.statistics').length > 0) {
                pieChart(contact_count, unique_contacts, ctx);
            }


        }

        if (isEmptyArray(crisises.length) === false) {
            $('.crisis').append('<h3>Erokriisi</h3>');
            $('.crisis').append(crisises.length + '<h7> kpl kirjausta</h7>');


            let ctx = $('#myChartCR');
            if ($('.statistics').length > 0) {
                horBarChart(crisis_count, unique_crisis, ctx);
            }


        }

        if (isEmptyArray(changes.length) === false) {
            $('.change').append('<h3>Perhetilanteen muutos</h3>');
            $('.change').append(changes.length + '<h7> kpl kirjausta</h7>');


            let ctx = $('#myChartCH');
            if ($('.statistics').length > 0) {
                horBarChart(change_count, unique_change, ctx);
            }


        }

        if (isEmptyArray(concerns.length) === false) {
            $('.concern').append('<h3>Huoli lapsesta</h3>');
            $('.concern').append(concerns.length + '<h7> kpl kirjausta</h7>');


            let ctx = $('#myChartCON');
            if ($('.statistics').length > 0) {
                horBarChart(concern_count, unique_concern, ctx);
            }


        }

        if (isEmptyArray(wells.length) === false) {
            $('.well').append('<h3>Hyvinvointi</h3>');
            $('.well').append(wells.length + '<h7> kpl kirjausta</h7>');


            let ctx = $('#myChartWE');
            if ($('.statistics').length > 0) {
                horBarChart(well_count, unique_well, ctx);
            }


        }

        if (isEmptyArray(continues.length) === false) {
            $('.conti').append('<h3>Suositeltu jatko</h3>');
            $('.conti').append(continues.length + '<h7> kpl kirjausta</h7>');


            let ctx = $('#myChartCONT');

            if ($('.statistics').length > 0) {
                horBarChart(cont_count, unique_cont, ctx);
            }


        }

        if (isEmptyArray(evas_y.length) === false) {
            $('.estimate').append('<h3>Yhteydenottajan arvio palvelun hyödyllisyydestä</h3>');
            $('.estimate').append(evas_y.length + '<h7> kpl kirjausta</h7>');


            let sortedList = [];

            for (let j = 0; j < unique_est_y.length; j++) {
                sortedList.push({'label': unique_est_y[j], 'arvio': eva_y_count[j]});
            }


            sortedList.sort(function (a, b) {
                return ((a.label < b.label) ? -1 : ((a.label === b.label) ? 0 : 1));
            });

            for (let k = 0; k < sortedList.length; k++) {
                unique_est_y[k] = sortedList[k].label;
                eva_y_count[k] = sortedList[k].arvio;
            }


            let ctx = $('#myChartES');
            let type = 'bar';

            if ($('.statistics').length > 0) {
                horBarChart(eva_y_count, unique_est_y, ctx, type);
            }


        }

        if (isEmptyArray(evas_a.length) === false) {
            $('.estimate_a').append('<h3>Asiantuntijan arvio palvelun hyödyllisyydestä</h3>');
            $('.estimate_a').append(evas_a.length + '<h7> kpl kirjausta</h7>');

            let sortedList = [];

            for (let j = 0; j < unique_est_a.length; j++) {
                sortedList.push({'label': unique_est_a[j], 'arvio': eva_a_count[j]});
            }


            sortedList.sort(function (a, b) {
                return ((a.label < b.label) ? -1 : ((a.label === b.label) ? 0 : 1));
            });

            for (let k = 0; k < sortedList.length; k++) {
                unique_est_a[k] = sortedList[k].label;
                eva_a_count[k] = sortedList[k].arvio;
            }

            type = 'bar';
            let ctx = $('#myChartES_A');
            if ($('.statistics').length > 0) {
                horBarChart(eva_a_count, unique_est_a, ctx, type);
            }


        }


        console.log('Yhteydenottojen määrä: ' + array.length);
        console.log('Alle 18: ' + counts_age['Alle 18'] + '\n', '19-30: ' + counts_age['19-30'] + '\n', '31-40: ' + counts_age['31-40'] + '\n', '41-50: ' + counts_age['41-50'] + '\n', '51-60: ' + counts_age['51-60'] + '\n', 'Yli 60: ' + counts_age['Yli 60'] + '\n');
        console.log('Oma perhe: ' + counts_help['Omalle perheelle'], 'Ystävä/tuttava: ' + counts_help['Ystävälle/tuttavalle']);
        console.log('Mies: ' + counts_sex['Mies'], 'Nainen: ' + counts_sex['Nainen'], 'Muu: ' + counts_sex['Muu'], 'Ei tietoa: ' + counts_sex['Ei tietoa']);
        console.log('Työssäkäyvä: ' + counts_status['Työssäkäyvä'], 'Työtön: ' + counts_status['Työtön'], 'Opiskelija: ' + counts_status['Opiskelija'], 'Eläkelainen: ' + counts_status['Eläkeläinen'], 'Varusmies: ' + counts_status['Varusmies'], 'Kotona: ' + counts_status['Kotona lasten kanssa'], 'Sairaslomalla: ' + counts_status['Sairaslomalla']);
        console.log('Ei vielä syntynyt: ' + counts_cAge['Ei vielä syntynyt'], '6kk tai alle: ' + counts_cAge['6kk tai alle'], '1v tai alle: ' + counts_cAge['1v tai alle'], '2-4v: ' + counts_cAge['2-4v'], '5-7v: ' + counts_cAge['5-7v'], '8-10v: ' + counts_cAge['8-10v'], '11-13v: ' + counts_cAge['11-13v'], '14-16v: ' + counts_cAge['14-16v'], '17 tai yli: ' + counts_cAge['17 tai yli']);
        console.log('Ei lapsia: ' + counts_child_lkm['Ei lapsia'], '1 lapsi: ' + counts_child_lkm['1 lapsi'], '2 -3 lasta: ' + counts_child_lkm['2-3 lasta'], '4-7 lasta: ' + counts_child_lkm['4-7 lasta'], 'Yli 8 lasta: ' + counts_child_lkm['8 tai enemmän'], 'Ei tietoa: ' + counts_child_lkm['Ei tietoa']);
        console.log('Puhelinsoitto: ' + counts_contact['Puhelinsoitto'], 'Sähköposti: ' + counts_contact['Sähköpostiviesti']);

        console.log('Avo-/avioero tai parisuhteen päättyminen: ' + counts_crisis['Avo-/avioero tai parisuhteen päättyminen'], 'Harkitsemassa eroa: ' + counts_crisis['Harkitsemassa eroa'], 'Avioeron/avoeron hakemisen käytännöt: ' + counts_crisis['Avioeron/avoeron hakemisen käytännöt'], 'Vanhemmuus eron jälkeen: ' + counts_crisis['Vanhemmuus eron jälkeen'], 'Lasten huoltajuuteen liittyvä haaste: ' + counts_crisis['Lasten huoltajuuteen liittyvä haaste'], 'Ex-puolisoon liittyvä haaste: ' + counts_crisis['Ex-puolisoon liittyvä haaste'], 'Uusperheeseen liittyvä haaste: ' + counts_crisis['Uusperheeseen liittyvä haaste'], 'Ystävyys- ja perhesuhteisiin liittyvä haaste: ' + counts_crisis['Ystävyys- ja perhesuhteisiin liittyvä haaste'], 'Parisuhteeseen liittyvä haaste: ' + counts_crisis['Parisuhteeseen liittyvä haaste'], 'Muu: ' + counts_crisis['Muu']);
        console.log('Raskaus: ' + counts_change['Raskaus'], 'Lapsen syntymä: ' + counts_change['Lapsen syntymä'], 'Sairastuminen: ' + counts_change['Sairastuminen'], 'Työttömäksi jääminen: ' + counts_change['Työttömäksi jääminen'], 'Elääkkeelle jääminen: ' + counts_change['Eläkkeelle jääminen'], 'Työelämän tai koulutuksen ulkopuolelle jääminen: ' + counts_change['Työelämän tai koulutuksen ulkopuolelle jääminen'], 'Läheisen kuolema: ' + counts_change['Läheisen kuolema'], 'Väkivallan kohteeksi joutuminen' + counts_change['Väkivallan kohteeksi joutuminen'], 'Äkillinen vammautuminen/sairastuminen' + counts_change['Äkillinen vammautuminen/sairastuminen'], 'Taloudelliset vaikeudet: ' + counts_change['Taloudelliset vaikeudet'], 'Muu: ' + counts_change['Muu']);
        console.log('Vauvaikäiseen liittyvä huoli: ' + counts_corcern['Vauvaikäiseen liittyvä huoli'], 'Leikki- tai kouluikäiseen liittyvä huoli: ' + counts_corcern['Leikki- tai kouluikäiseen liittyvä huoli'], 'Murrosikäiseen/teini-ikäiseen lapseen liittyvä huoli: ' + counts_corcern['Murrosikäiseen/teini-ikäiseen lapseen liittyvä huoli'], 'Muu: ' + counts_corcern['Muu']);
        console.log('Perustarpeisiin liittyvä haaste: ' + counts_well['Perustarpeisiin liittyvä haaste'], 'Päihde- tai riippuvuusongelma: ' + counts_well['Päihde- tai riippuvuusongelma'], 'Seksuaalisuuteen liittyvä ongelma: ' + counts_well['Seksuaalisuuteen liittyvä ongelma'], 'Stressi: ' + counts_well['Stressi'], 'Uupumus: ' + counts_well['Uupumus'], 'Yksinäisyys: ' + counts_well['Yksinäisyys'], 'Mielenterveysongelma: ' + counts_well['Mielenterveysongelma'], 'Itsetunto-ongelma: ' + counts_well['Itsetunto-ongelma'], 'Muu: ' + counts_well['Muu']);

        console.log('Vanhemman neuvo -vertaistukiryhmä: ', counts_cont['Vanhemman neuvo -vertaistukiryhmä'], 'Eroneuvoilta/erokahvila: ' + counts_cont['Eroneuvoilta/erokahvila'], 'Eroseminaari: ' + counts_cont['Eroseminaari'], 'Miesten eroryhmä: ' + counts_cont['Miesten eroryhmä'], 'Sovittu tapaaminen: ' + counts_cont['Sovittu tapaaminen'], 'Chat-palvelu: ' + counts_cont['Chat-palvelu'], 'Erotukihenkilö: ' + counts_cont['Erotukihenkilö'] + 'Lastenvalvoja: ' + counts_cont['Lastenvalvoja'], 'Turvakotiin ohjaus: ' + counts_cont['Turvakotiin ohjaus'], 'Perheasioiden sovittelu: ' + counts_cont['Perheasioiden sovittelu'], 'Ei jatkotoimenpiteitä: ' + counts_cont['Ei jatkotoimenpiteitä'], 'Muu: ' + counts_cont['Muu']);
        console.log('y1: ' + counts_eva_y['1'], 'y2: ' + counts_eva_y['2'], 'y3: ' + counts_eva_y['3'], 'y4: ' + counts_eva_y['4'], 'y5: ' + counts_eva_y['5']);
        console.log('a1: ' + counts_eva_a['1'], 'a2: ' + counts_eva_a['2'], 'a3: ' + counts_eva_a['3'], 'a4: ' + counts_eva_a['4'], 'a5: ' + counts_eva_a['5']);


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

function isEmptyArray(length) {
    if (length === 0) {
        return true;
    } else {
        return false;
    }

}

function parseArr(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === undefined) {
            arr.splice(i, 1);
        }
    }
}

function showInfo(rivi, otsikko) {

    if (rivi.length > 0) {
        //console.log(rivi.length);

        $('.record').append('<div class="data">'+'<span>' + otsikko + '</span>'+ '<span>' + rivi + '</span>'+'</br>' +'</div>');
        //$('.record').append('<span>' + rivi + '</span>');
        //$('.record').append('</br>');
    }

}


function pieChart(count, labels, ctx) {

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: '',
                data: count,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(66, 245, 126, 0.2)',
                    'rgba(194, 41, 171, 0.2)',
                    'rgba(176, 82, 48, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(45, 173, 87, 1)',
                    'rgba(214, 47, 188, 1)',
                    'rgb(143, 68, 40, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {}
    });


}


function horBarChart(count, labels, ctx, type = 'horizontalBar') {

    new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: '',
                data: count,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(66, 245, 126, 0.2)',
                    'rgba(194, 41, 171, 0.2)',
                    'rgba(176, 82, 48, 0.2)',
                    'rgba(0, 78, 204, 0.2)',
                    'rgba(30, 74, 51, 0.2)',
                    'rgba(156, 156, 156, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(45, 173, 87, 1)',
                    'rgba(214, 47, 188, 1)',
                    'rgb(143, 68, 40, 1)',
                    'rgba(0, 94, 247, 1)',
                    'rgba(34, 89, 59, 1)',
                    'rgba(156, 156, 156, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        precision: 0
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        precision: 0
                    }
                }]
            }
        }
    });


}









