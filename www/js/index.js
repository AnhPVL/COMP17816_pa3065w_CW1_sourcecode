var ERROR = 'ERROR';

// Create or Open Database.
var db = window.openDatabase('RZ', '1.0', 'RZ', 20000);

// To detect whether users use mobile phones horizontally or vertically.
$(window).on('orientationchange', onOrientationChange);

// Display messages in the console.
function log(message, type = 'INFO') {
    console.log(`${new Date()} [${type}] ${message}`);
}

function onOrientationChange(e) {
    if (e.orientation == 'portrait') {
        log('Portrait.');
    }
    else {
        log('Landscape.');
    }
}

// To detect whether users open applications on mobile phones or browsers.
if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    $(document).on('deviceready', onDeviceReady);
}
else {
    $(document).on('ready', onDeviceReady);
}

// Display errors when executing SQL queries.
function transactionError(tx, error) {
    log(`SQL Error ${error.code}. Message: ${error.message}.`, ERROR);
}

// Run this function after starting the application.
function onDeviceReady() {
    log(`Device is ready.`);

    prepareDatabase(db);
    prepareDatabaseAddress(db);
    prepareDatabaseType(db);
}

$(document).on('pagebeforeshow', '#page-create', function () {
    selectProvince('#page-create #frm-register');
    selectDistrict('#page-create #frm-register', -1);
    selectWard('#page-create #frm-register', -1);
    selectFurnitureType('#page-create #frm-register');
    selectPropertyType('#page-create #frm-register');
    selectPetAllow('#page-create #frm-register');
    selectBedrooms('#page-create #frm-register');


});
$(document).on('change', '#page-create #frm-register #province', function () {
    selectDistrict('#page-create #frm-register', this.value);
    selectWard('#page-create #frm-register', -1);
});
$(document).on('change', '#page-create #frm-register #district', function () {
    selectWard('#page-create #frm-register', this.value);
});

function selectProvince(form, selectedId = -1) {
    db.transaction(function (tx) {
        var query = 'SELECT * FROM City ORDER BY Name';
        tx.executeSql(query, [], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            var optionL = `<option value="-1"> Select Province/City </option>`;
            for (let item of result.rows) {
                if (item.Id == selectedId) {
                    optionL += `<option value='${item.Id}' selected>${item.Name}</option>`;
                } else {
                    optionL += `<option value='${item.Id}'>${item.Name}</option>`;
                }

                //optionL += `<option value='${item.Id}' ${item.Id == selectedId ? 'selected' : ''}>${item.Name}</option>`;

            }

            $(`${form} #province`).html(optionL);
            $(`${form} #province`).selectmenu('refresh', true);
        }
    });

}

function selectDistrict(form, idselected, selectedId = -1) {

    //var name = $('#page-create #frm-register #province option:selected').text();
    // var idselected = $(`${form} #province`).val();


    db.transaction(function (tx) {
        var query = `SELECT * FROM District WHERE Cityid = ${idselected} ORDER BY Name`;
        tx.executeSql(query, [], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            var optionL = `<option value="-1"> Select District </option>`;
            for (let item of result.rows) {
                if (item.Id == selectedId) {
                    optionL += `<option value='${item.Id}' selected>${item.Name}</option>`;
                } else {
                    optionL += `<option value='${item.Id}'>${item.Name}</option>`;
                }
            }

            $(`${form} #district`).html(optionL);
            $(`${form} #district`).selectmenu('refresh', true);
        }
    });
}

function selectWard(form, idselected, selectedId = -1) {

    //    var idselected = $(`${form} #district`).val();


    db.transaction(function (tx) {
        var query = `SELECT * FROM Ward WHERE Districtid = ${idselected} ORDER BY Name`;
        tx.executeSql(query, [], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            var optionL = `<option value="-1"> Select Ward </option>`;
            for (let item of result.rows) {
                if (item.Id == selectedId) {
                    optionL += `<option value='${item.Id}' selected>${item.Name}</option>`;
                } else {
                    optionL += `<option value='${item.Id}'>${item.Name}</option>`;
                }
            }

            $(`${form} #ward`).html(optionL);
            $(`${form} #ward`).selectmenu('refresh', true);
        }
    });
}

function selectFurnitureType(form, selectedId = -1) {
    db.transaction(function (tx) {
        var query = 'SELECT * FROM FurnitureType ORDER BY Name';
        tx.executeSql(query, [], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            var optionL = `<option value="-1"> Select Furniture Type </option>`;
            for (let item of result.rows) {
                if (item.Id == selectedId) {
                    optionL += `<option value='${item.Id}' selected>${item.Name}</option>`;
                } else {
                    optionL += `<option value='${item.Id}'>${item.Name}</option>`;
                }

                //optionL += `<option value='${item.Id}' ${item.Id == selectedId ? 'selected' : ''}>${item.Name}</option>`;

            }

            $(`${form} #furnituretype`).html(optionL);
            $(`${form} #furnituretype`).selectmenu('refresh', true);
        }
    });

}

function selectPropertyType(form, selectedId = -1) {
    db.transaction(function (tx) {
        var query = 'SELECT * FROM PropertyType ORDER BY Name';
        tx.executeSql(query, [], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            var optionL = `<option value="-1"> Select Property Type </option>`;
            for (let item of result.rows) {
                if (item.Id == selectedId) {
                    optionL += `<option value='${item.Id}' selected>${item.Name}</option>`;
                } else {
                    optionL += `<option value='${item.Id}'>${item.Name}</option>`;
                }

                //optionL += `<option value='${item.Id}' ${item.Id == selectedId ? 'selected' : ''}>${item.Name}</option>`;

            }

            $(`${form} #type`).html(optionL);
            $(`${form} #type`).selectmenu('refresh', true);
        }
    });

}

function selectPetAllow(form, selectedId = -1) {
    db.transaction(function (tx) {
        var query = 'SELECT * FROM PetAllow ORDER BY Name';
        tx.executeSql(query, [], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            var optionL = `<option value="-1"> Select Pets permission </option>`;
            for (let item of result.rows) {
                if (item.Id == selectedId) {
                    optionL += `<option value='${item.Id}' selected>${item.Name}</option>`;
                } else {
                    optionL += `<option value='${item.Id}'>${item.Name}</option>`;
                }


            }

            $(`${form} #petallow`).html(optionL);
            $(`${form} #petallow`).selectmenu('refresh', true);
        }
    });

}

function selectBedrooms(form, selectedId = -1) {
    db.transaction(function (tx) {
        var query = 'SELECT * FROM Bedrooms ORDER BY Name';
        tx.executeSql(query, [], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            var optionL = `<option value="-1"> Select Bedrooms </option>`;
            for (let item of result.rows) {
                if (item.Id == selectedId) {
                    optionL += `<option value='${item.Id}' selected>${item.Name}</option>`;
                } else {
                    optionL += `<option value='${item.Id}'>${item.Name}</option>`;
                }


            }

            $(`${form} #bedroom`).html(optionL);
            $(`${form} #bedroom`).selectmenu('refresh', true);
        }
    });

}


// Submit a form to register a new property.
$(document).on('submit', '#page-create #frm-register', confirmProperty);
$(document).on('submit', '#page-create #frm-confirm', registerProperty);


function confirmProperty(e) {
    e.preventDefault();

    // Get user's input.
    var name = $('#page-create #frm-register #name').val();
    var province = $(`#page-create #frm-register #province option:selected`).text();
    var district = $('#page-create #frm-register #district option:selected').text();
    var ward = $('#page-create #frm-register #ward option:selected').text();
    var street = $('#page-create #frm-register #street').val();
    var type = $('#page-create #frm-register #type option:selected').text();
    var bedroom = $('#page-create #frm-register #bedroom option:selected').text();
    var price = $('#page-create #frm-register #price').val();
    var petallow = $('#page-create #frm-register #petallow option:selected').text();
    var furnituretype = $('#page-create #frm-register #furnituretype option:selected').text();
    var today = new Date();
    //var datepost = (today.getDate() + '/'+ (today.getMonth()+1)+'/'+today.getFullYear()).toString();
    var datepost = today.toUTCString();
    var reportername = $('#page-create #frm-register #reportername').val();
    var note = $('#page-create #frm-register #txt-note').val();

    if (checkProperty('#page-create #frm-register')) {

        db.transaction(function (tx) {
            var query = 'SELECT * FROM Property WHERE Name = ?';
            tx.executeSql(query, [name], transactionSuccess, transactionError);

            function transactionSuccess(tx, result) {
                if (result.rows[0] == null) {
                    log('Open the confirmation popup.');

                    $('#page-create #error').empty();

                    $('#page-create #frm-confirm #name').val(name);
                    $('#page-create #frm-confirm #province').val(province);
                    $('#page-create #frm-confirm #district').val(district);
                    $('#page-create #frm-confirm #ward').val(ward);
                    $('#page-create #frm-confirm #street').val(street);
                    $('#page-create #frm-confirm #type').val(type);
                    $('#page-create #frm-confirm #bedroom').val(bedroom);
                    $('#page-create #frm-confirm #price').val(price);
                    $('#page-create #frm-confirm #furnituretype').val(furnituretype);
                    $('#page-create #frm-confirm #petallow').val(petallow);
                    $('#page-create #frm-confirm #datepost').val(datepost);
                    $('#page-create #frm-confirm #reportername').val(reportername);

                    $('#page-create #frm-confirm').popup('open');
                }
                else {
                    var error = 'This property exists.';
                    $('#page-create #error').empty().append(alert(error));
                    $('#page-create #name').focus();

                    log(error, ERROR);
                }
            }
        });
    }
}
function checkProperty(form) {
    var check = true;
    var error = $(`${form} #error`);
    if ($(`${form} #province`).val() == -1) {
        check = false;
        error.append(alert('Please choose a PROVINCE!'));
        $(`${form} #province`).focus();

    }
    if ($(`${form} #district`).val() == -1) {
        check = false;
        error.append(alert('Please choose a DISTRICT!'))
        $(`${form} #district`).focus();
    }
    if ($(`${form} #ward`).val() == -1) {
        check = false;
        error.empty().append(alert('Please choose a WARD!'));
        $(`${form} #ward`).focus();
    }
    if ($(`${form} #type`).val() == -1) {
        check = false;
        error.empty().append(alert('Please choose a PROPERTY TYPE!'));
        $(`${form} #type`).focus();
    }
    if ($(`${form} #furnituretype`).val() == -1) {
        check = false;
        error.empty().append(alert('Please choose a FURNITURE TYPE!'));
        $(`${form} #furnituretype`).focus();
    }
    if ($(`${form} #bedroom`).val() == -1) {
        check = false;
        error.empty().append(alert('Please choose the number of BEDROOMS'));
        $(`${form} #bedroom`).focus();
    }
    if ($(`${form} #price`).val() <= 0) {
        check = false;
        error.empty().append(alert('Please enter the MONTHLY PRICE rent!'));
        $(`${form} #price`).focus();
    }
    if ($(`${form} #petallow`).val() == -1) {
        check = false;
        error.empty().append(alert('Does your place allow PETS? Please select an option!'));
        $(`${form} #petallow`).focus();
    }

    return check;
}

function registerProperty(e) {
    e.preventDefault();

    var name = $('#page-create #frm-confirm #name').val();
    var province = $('#page-create #frm-register #province').val();
    var district = $('#page-create #frm-register #district').val();
    var ward = $('#page-create #frm-register #ward').val();
    var street = $('#page-create #frm-confirm #street').val();
    var type = $('#page-create #frm-register #type').val();
    var bedroom = $('#page-create #frm-confirm #bedroom').val();
    var price = $('#page-create #frm-confirm #price').val();
    var furnituretype = $('#page-create #frm-register #furnituretype').val();
    var datepost = $('#page-create #frm-confirm #datepost').val();
    var reportername = $('#page-create #frm-confirm #reportername').val();
    var petallow = $('#page-create #frm-register #petallow').val();
    var note = $('#page-create #frm-register #txt-note').val();

    const newLocal = 'INSERT INTO Property (Name, Province, District, Ward, Street, Type, Bedroom, Price, Furnituretype, Datepost, Reportername, Petallow) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.transaction(function (tx) {
        var query = newLocal;
        tx.executeSql(query, [name, province, district, ward, street, type, bedroom, price, furnituretype, datepost, reportername, petallow], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            log(`Create a property name '${name}' successfully.`);

            // Reset the form.
            $('#frm-register').trigger('reset');
            $('#page-create #error').empty();

            if (note != '') {
                var dateTime = new Date();

                db.transaction(function (tx) {
                    var query = 'INSERT INTO Note (PropertyId, Note, Datetime) VALUES (?, ?, ?)';
                    tx.executeSql(query, [result.insertId, note, dateTime], transactionSuccess, transactionError);

                    function transactionSuccess(tx, result) {
                        log(`Add new note to property '${name}' successfully.`);
                    }
                });
            }

            $('#page-create #frm-confirm').popup('close');
        }
    });
}

// Display Property List.
$(document).on('pagebeforeshow', '#page-list', showList);
$(document).on('vclick', '#page-list #btn-listback', showList);


const newLocal = `SELECT P.Id AS Id, P.Name, Street, Type, Bedroom, Price, City.Name AS ProvinceName, District.Name AS DistrictName, Ward.Name AS WardName
FROM Property AS P
LEFT JOIN City ON City.Id = P.Province
LEFT JOIN District ON District.Id = P.District
LEFT JOIN Ward ON Ward.Id = P.Ward`;

function showList() {
    db.transaction(function (tx) {
        var query = newLocal;
        tx.executeSql(query, [], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            log(`Get list of Properties successfully.`);

            // Prepare the list of Propertys.
            var listProperty = `<ul id='list-property' data-role='listview'
                                                     data-corners='false' class='ui-nodisc-icon ui-alt-icon' >`;
            for (let property of result.rows) {
                listProperty += `<li><a data-details='{"Id" : ${property.Id}}'>
                                    <img src='img/logoProperty.png'>
                                    <h3>Property Name: ${property.Name}</h3>
                                    <p>Address: ${property.Street}, ${property.WardName}, ${property.ProvinceName}, ${property.DistrictName}</p>
                                </a></li>`;
            }
            listProperty += `</ul>`;

            // Add list to UI.
            $('#list-property').empty().append(listProperty).listview('refresh').trigger('create');

            log(`Show list of properties successfully.`);
        }
    });
}

// Save Property Id.
$(document).on('vclick', '#list-property li a', function (e) {
    e.preventDefault();

    var id = $(this).data('details').Id;
    localStorage.setItem('currentPropertyId', id);

    $.mobile.navigate('#page-detail', { transition: 'slide' });
});

// Show Property Details.
$(document).on('pagebeforeshow', '#page-detail', showDetail);

function showDetail() {
    var id = localStorage.getItem('currentPropertyId');

    db.transaction(function (tx) {
        var query = `SELECT P.Id AS Id, P.Name, Street, Bedrooms.Name AS BedroomName, Price, Reportername, Datepost, City.Name AS ProvinceName, District.Name AS DistrictName, Ward.Name AS WardName, PropertyType.Name AS TypeName, FurnitureType.Name AS FurnituretypeName, PetAllow.Name As PetallowName        
        FROM Property AS P
        LEFT JOIN City ON City.Id = P.Province
        LEFT JOIN District ON District.Id = P.District
        LEFT JOIN Ward ON Ward.Id = P.Ward
        LEFT JOIN FurnitureType ON FurnitureType.Id = P.Furnituretype
        LEFT JOIN PropertyType ON PropertyType.Id = P.Type
        LEFT JOIN PetAllow ON PetAllow.Id = P.Petallow
        LEFT JOIN Bedrooms ON Bedrooms.Id = P.Bedroom
        WHERE P.Id = ?`;
        tx.executeSql(query, [id], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            var errorMessage = 'Property not found.';
            var name = errorMessage;
            var province = errorMessage;
            var district = errorMessage;
            var ward = errorMessage;
            var street = errorMessage;
            var type = errorMessage;
            var bedroom = errorMessage;
            var price = errorMessage;
            var petallow = errorMessage;
            var furnituretype = errorMessage;
            var datepost = errorMessage;
            var reportername = errorMessage;

            if (result.rows[0] != null) {
                log(`Get details of property '${id}' successfully.`);

                name = result.rows[0].Name;
                province = result.rows[0].ProvinceName;
                district = result.rows[0].DistrictName;
                ward = result.rows[0].WardName;
                street = result.rows[0].Street;
                type = result.rows[0].TypeName;
                bedroom = result.rows[0].BedroomName;
                price = result.rows[0].Price;
                petallow = result.rows[0].PetallowName;
                furnituretype = result.rows[0].FurnituretypeName;
                datepost = result.rows[0].Datepost;
                reportername = result.rows[0].Reportername;
            }
            else {
                log(errorMessage, ERROR);

                $('#page-detail #btn-update').addClass('ui-disabled');
                $('#page-detail #btn-delete-confirm').addClass('ui-disabled');
            }

            $('#page-detail #id').val(id);
            $('#page-detail #name').val(name);
            $('#page-detail #province').val(province);
            $('#page-detail #district').val(district);
            $('#page-detail #ward').val(ward);
            $('#page-detail #street').val(street);
            $('#page-detail #type').val(type);
            $('#page-detail #bedroom').val(bedroom);
            $('#page-detail #price').val(price);
            $('#page-detail #petallow').val(petallow);
            $('#page-detail #furnituretype').val(furnituretype);
            $('#page-detail #datepost').val(datepost);
            $('#page-detail #reportername').val(reportername);

            showNote();
        }
    });
}

// Delete Property.
$(document).on('submit', '#page-detail #frm-delete', deleteProperty);
$(document).on('keyup', '#page-detail #frm-delete #txt-delete', confirmDeleteProperty);

function confirmDeleteProperty() {
    var text = $('#page-detail #frm-delete #txt-delete').val();

    if (text == 'confirm delete') {
        $('#page-detail #frm-delete #btn-delete').removeClass('ui-disabled');
    }
    else {
        $('#page-detail #frm-delete #btn-delete').addClass('ui-disabled');
    }
}

function deleteProperty(e) {
    e.preventDefault();

    var id = localStorage.getItem('currentPropertyId');

    db.transaction(function (tx) {
        var query = 'DELETE FROM Property WHERE Id = ?';
        tx.executeSql(query, [id], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            log(`Delete property '${id}' successfully.`);

            $('#page-detail #frm-delete').trigger('reset');

            $.mobile.navigate('#page-list', { transition: 'none' });
        }
    });
}

// Add Note
$(document).on('submit', '#page-detail #frm-note', addNote);

function addNote(e) {
    e.preventDefault();

    var propertyId = localStorage.getItem('currentPropertyId');
    var note = $('#page-detail #frm-note #txt-note').val();
    var dateTime = new Date();

    db.transaction(function (tx) {
        var query = 'INSERT INTO Note (PropertyId, Note, Datetime) VALUES (?, ?, ?)';
        tx.executeSql(query, [propertyId, note, dateTime], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            log(`Add new note to property '${propertyId}' successfully.`);

            $('#page-detail #frm-note').trigger('reset');

            showNote();
        }
    });
}

// Show Note.
function showNote() {
    var propertyId = localStorage.getItem('currentPropertyId');

    db.transaction(function (tx) {
        var query = 'SELECT * FROM Note WHERE PropertyId = ?';
        tx.executeSql(query, [propertyId], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            log(`Get list of notes successfully.`);

            // Prepare the list of notes.
            var listNote = '';
            for (let note of result.rows) {
                listNote += `<div class = 'list'>
                                    <small>${note.Datetime}</small>
                                    <h3>${note.Note}</h3>
                                </div>`;
            }

            // Add list to UI.
            $('#page-detail #list-note').empty().append(listNote);

            log(`Show list of notes successfully.`);
        }
    });
}


//Search -- search page 

$(document).on('vclick', '#page-list #btn-popSearch', function () {
    selectProvince('#page-list #frm-search');
    selectDistrict('#page-list #frm-search',-1);
    selectWard('#page-list #frm-search',-1);
    selectFurnitureType('#page-list #frm-search');
    selectPropertyType('#page-list #frm-search');
    selectPetAllow('#page-list #frm-search');
    selectBedrooms('#page-list #frm-search');
    $('#page-list #frm-search').popup('open');

});
/*
$(document).on('pagebeforeshow', '#page-list', function () {
    selectProvince('#page-list #frm-search');
    selectDistrict('#page-list #frm-search',-1);
    selectWard('#page-list #frm-search',-1);
    selectFurnitureType('#page-list #frm-search');
    selectPropertyType('#page-list #frm-search');
    selectPetAllow('#page-list #frm-search');
    selectBedrooms('#page-list #frm-search');

});
*/
$(document).on('change', '#page-list #frm-search #province', function () {
    selectDistrict('#page-list #frm-search', this.value);
    selectWard('#page-list #frm-search', -1);
});
$(document).on('change', '#page-list #frm-search #district', function () {
    selectWard('#page-list #frm-search', this.value);
});

$(document).on('vclick', '#page-list #frm-search #btn-search', search);

function search(e) {
    e.preventDefault();

    var name = $('#page-list #frm-search #name').val();
    var bedroom = $('#page-list #frm-search #bedroom').val();
    var price = $('#page-list #frm-search #price').val();
    var province = $('#page-list #frm-search #province').val();
    var district = $('#page-list #frm-search #district').val();
    var ward = $('#page-list #frm-search #ward').val();
    var type = $('#page-list #frm-search #type').val();
    var petallow = $('#page-list #frm-search #petallow').val();
    var furnituretype = $('#page-list #frm-search #furnituretype').val();

    db.transaction(function (tx) {
        var query = `SELECT P.Id AS Id, P.Name, Street, Type, Bedroom, P.Province, P.District, P.Ward, Price, City.Name AS ProvinceName, District.Name AS DistrictName, Ward.Name AS WardName, Furnituretype, Petallow 
        FROM Property AS P
        LEFT JOIN City ON City.Id = P.Province
        LEFT JOIN District ON District.Id = P.District
        LEFT JOIN Ward ON Ward.Id = P.Ward
        WHERE`;
        
        if (name) {
            query += ` P.Name LIKE "%${name}%"   AND`; // blank before Username
        }
        if (province != -1) {
            query += ` P.Province = ${province}   AND`
        }
        if (district != -1) {
            query += ` P.District = ${district}   AND`
        }
        if (ward != -1) {
            query += ` P.Ward = ${ward}   AND`
        }
        if (furnituretype != -1) {
            query += ` Furnituretype = ${furnituretype}   AND`
        }
        if (type != -1) {
            query += ` Type = ${type}   AND`
        }
        if (bedroom != -1) {
            query += ` Bedroom = ${bedroom}   AND`
        }
        if (petallow != -1) {
            query += ` Petallow = ${petallow}   AND`
        }
        if (price >10) {
            query += ` Price >= ${price}   AND`
        }
        query = query.substring(0, query.length - 6) //  6 blank

        tx.executeSql(query, [], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            log(`Get list of Properties successfully.`);
            var listProperty = `<ul id='list-property' data-role='listview' data-corners='false' class='ui-nodisc-icon ui-alt-icon'>`;
            for (let property of result.rows) {

                listProperty += `<li><a data-details='{"Id" : ${property.Id}'>
                                     <img src='img/logoProperty.png'>
                                     <h3>Property Name: ${property.Name}</h3>
                                     <p>Address: ${property.Street}, ${property.WardName}, ${property.ProvinceName}, ${property.DistrictName}</p>
                                     </a></li>`;

            }
            listProperty += `</ul>`;

            $('#page-list #frm-search').trigger('reset');
            $('#page-list #frm-search').popup('close');

            // Add list to UI.
            $('#page-list #list-property').empty().append(listProperty).listview().listview('refresh').trigger('create');
            log(`Show list of properties successfully.`);


        }
    });
}


//Update

$(document).on('vclick', '#page-detail #btn-form #btn-popUpdate', showUpdate);

$(document).on('change', '#page-detail #frm-update #province', function () {
    selectDistrict('#page-detail #frm-update', this.value);
    selectWard('#page-detail #frm-update', -1);
});
$(document).on('change', '#page-detail #frm-update #district', function () {
    selectWard('#page-detail #frm-update', this.value);
});
function showUpdate(e) {
    e.preventDefault();
    var id = localStorage.getItem('currentPropertyId');
    db.transaction(function (tx) {
        var query = `SELECT * FROM Property WHERE Id = ?`;
        tx.executeSql(query, [id], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            if (result.rows[0] != null) {
                log(`Get details of property '${id}' successfully for Update form`);

                log('Open the Update popup.');

                $('#page-detail #frm-update #error').empty();

                $('#page-detail #frm-update #name').val(result.rows[0].Name);
                $('#page-detail #frm-update #street').val(result.rows[0].Street);
                $('#page-detail #frm-update #bedroom').val(result.rows[0].Bedroom);
                $('#page-detail #frm-update #price').val(result.rows[0].Price);
                $('#page-detail #frm-update #datepost').val(result.rows[0].Datepost);
                $('#page-detail #frm-update #reportername').val(result.rows[0].Reportername);
                selectProvince('#page-detail #frm-update', result.rows[0].Province);
                selectDistrict('#page-detail #frm-update', result.rows[0].Province, result.rows[0].District);
                selectWard('#page-detail #frm-update', result.rows[0].District, result.rows[0].Ward);
                selectFurnitureType('#page-detail #frm-update', result.rows[0].Furnituretype);
                selectPropertyType('#page-detail #frm-update', result.rows[0].Type);
                selectPetAllow('#page-detail #frm-update', result.rows[0].Petallow);
                selectBedrooms('#page-detail #frm-update', result.rows[0].Bedroom);
                
                $('#page-detail #btn-form').panel('close');
                $('#page-detail #frm-update').popup('open');

            }
        }
    });
}

$(document).on('vclick', '#page-detail #frm-update #btn-update', updateProperty);


function updateProperty(e) {
    e.preventDefault();

    var id = localStorage.getItem('currentPropertyId');

    var name = $('#page-detail #frm-update #name').val();
    var street = $('#page-detail #frm-update #street').val();
    var bedroom = $('#page-detail #frm-update #bedroom').val();
    var price = $('#page-detail #frm-update #price').val();
    var reportername = $('#page-detail #frm-update #reportername').val();
    var province = $('#page-detail #frm-update #province').val();
    var district = $('#page-detail #frm-update #district').val();
    var ward = $('#page-detail #frm-update #ward').val();
    var type = $('#page-detail #frm-update #type').val();
    var petallow = $('#page-detail #frm-update #petallow').val();
    var furnituretype = $('#page-detail #frm-update #furnituretype').val();
    
    var today = new Date();
    var datepost = today.toUTCString();
    if (checkProperty('#page-detail #frm-update')) {

        db.transaction(function (tx) {
            var query = `UPDATE Property SET Name = ?, Province = ?, District = ?, Ward = ?, Street = ?, Type = ?, Bedroom = ?, Price = ?, Furnituretype = ?, Datepost = ?, Reportername = ?, Petallow = ? WHERE Id = ?`;
            tx.executeSql(query, [name, province, district, ward, street, type, bedroom, price, furnituretype, datepost, reportername, petallow, id], transactionSuccess, transactionError);

            function transactionSuccess(tx, result) {
                log(`Update account '${id}' with '${name}' successfully.`);

                showDetail();

                $('#page-detail #frm-update').popup('close');
                $('#page-detail #frm-update').trigger('reset');

                $.mobile.navigate('#page-detail', { transition: 'none' });
            
                
            }
        });

    }
}


