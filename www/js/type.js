function log(message, type = 'INFO') {
    console.log(`${new Date()} [${type}] ${message}`);
}

function transactionError(tx, error) {
    log(`SQL Error ${error.code}. Message: ${error.message}.`, ERROR);
}

function transactionSuccessForTable(tableName) {
    log(`Create table '${tableName}' successfully.`);
}

function transactionSuccessForTableData(tableName, id, name) {
    log(`Insert (${id}, "${name}") into '${tableName}' successfully.`);
}

function prepareDatabaseType(db) {
    db.transaction(function (tx) {
        // Create table FurnitureType.
        query = `CREATE TABLE IF NOT EXISTS FurnitureType (
            Id INTEGER PRIMARY KEY,
            Name TEXT NOT NULL
        )`;

        tx.executeSql(query, [], transactionSuccessForTable('FurnitureType'), transactionError);
        // Create table PropertyType.
        query = `CREATE TABLE IF NOT EXISTS PropertyType (
            Id INTEGER PRIMARY KEY,
            Name TEXT NOT NULL
        )`;

        tx.executeSql(query, [], transactionSuccessForTable('PropertyType'), transactionError);

        // Create table PetAllow.
        query = `CREATE TABLE IF NOT EXISTS PetAllow (
            Id INTEGER PRIMARY KEY,
            Name TEXT NOT NULL
        )`;
        tx.executeSql(query, [], transactionSuccessForTable('PetAllow'), transactionError);

        query = `CREATE TABLE IF NOT EXISTS Bedrooms (
            Id INTEGER PRIMARY KEY,
            Name TEXT NOT NULL
        )`;
        tx.executeSql(query, [], transactionSuccessForTable('Bedrooms'), transactionError);

        query = `SELECT * FROM FurnitureType WHERE Id = 1 LIMIT 1`;
        tx.executeSql(query, [], function (tx, result) {
            if (result.rows[0] == null)
                addFurnitureType();
        }, transactionError);

        query = `SELECT * FROM PropertyType WHERE Id = 1 LIMIT 1`;
        tx.executeSql(query, [], function (tx, result) {
            if (result.rows[0] == null)
                addPropertyType();
        }, transactionError);

        query = `SELECT * FROM PetAllow WHERE Id = 1 LIMIT 1`;
        tx.executeSql(query, [], function (tx, result) {
            if (result.rows[0] == null)
                addPetAllow();
        }, transactionError);

        query = `SELECT * FROM Bedrooms WHERE Id = 1 LIMIT 1`;
        tx.executeSql(query, [], function (tx, result) {
            if (result.rows[0] == null)
                addBedroom();
        }, transactionError);
    })
}

function addFurnitureType() {
    db.transaction(function (tx) {
        var query = "INSERT INTO FurnitureType (Id, Name) VALUES (? ,?)";

        tx.executeSql(query, [1, 'Furnished'], transactionSuccessForTableData('FurnitureType', 1, 'Furnished'), transactionError);
        tx.executeSql(query, [2, 'Unfurnished'], transactionSuccessForTableData('FurnitureType', 2, 'Unfurnished'), transactionError);
        tx.executeSql(query, [3, 'Part Furnished'], transactionSuccessForTableData('FurnitureType', 3, 'Part Furnished'), transactionError);
    });
}
//Apartment Bachelor Officetel Shophouse Penthouse Duplex Shareroom

function addPropertyType() {
    db.transaction(function (tx) {
        var query = "INSERT INTO PropertyType (Id, Name) VALUES (? ,?)";

        tx.executeSql(query, [1, 'Apartment'], transactionSuccessForTableData('PropertyType', 1, 'Apartment'), transactionError);
        tx.executeSql(query, [2, 'Bachelor'], transactionSuccessForTableData('PropertyType', 2, 'Bachelor'), transactionError);
        tx.executeSql(query, [3, 'Officetel'], transactionSuccessForTableData('PropertyType', 3, 'Officetel'), transactionError);
        tx.executeSql(query, [4, 'Shophouse'], transactionSuccessForTableData('PropertyType', 4, 'Shophouse'), transactionError);
        tx.executeSql(query, [5, 'Penthouse'], transactionSuccessForTableData('PropertyType', 5, 'Penthouse'), transactionError);
        tx.executeSql(query, [6, 'Duplex'], transactionSuccessForTableData('PropertyType', 6, 'Duplex'), transactionError);
        tx.executeSql(query, [7, 'Shareroom'], transactionSuccessForTableData('PropertyType', 7, 'Shareroom'), transactionError);
    });
}

function addPetAllow() {
    db.transaction(function (tx) {
        var query = "INSERT INTO PetAllow (Id, Name) VALUES (? ,?)";

        tx.executeSql(query, [1, 'Do not Allow'], transactionSuccessForTableData('PetAllow', 1, 'Do not Allow'), transactionError);
        tx.executeSql(query, [2, 'Allow small pets'], transactionSuccessForTableData('PetAllow', 2, 'Allow small pets'), transactionError);
        tx.executeSql(query, [3, 'Allow medium pets'], transactionSuccessForTableData('PetAllow', 3, 'Allow medium pets'), transactionError);
        tx.executeSql(query, [4, 'Can discuss'], transactionSuccessForTableData('PetAllow', 4, 'Can discuss'), transactionError);

    });
}

function addBedroom() {
    db.transaction(function (tx) {
        var query = "INSERT INTO Bedrooms (Id, Name) VALUES (? ,?)";

        tx.executeSql(query, [1, 'Studio'], transactionSuccessForTableData('Bedrooms', 1, 'Studio'), transactionError);
        tx.executeSql(query, [2, '+1'], transactionSuccessForTableData('Bedrooms', 2, '+1'), transactionError);
        tx.executeSql(query, [3, '+2'], transactionSuccessForTableData('Bedrooms', 3, '+2'), transactionError);
        tx.executeSql(query, [4, '+3'], transactionSuccessForTableData('Bedrooms', 4, '+3'), transactionError);
        tx.executeSql(query, [5, '+4'], transactionSuccessForTableData('Bedrooms', 5, '+4'), transactionError);
        tx.executeSql(query, [6, '+5'], transactionSuccessForTableData('Bedrooms', 6, '+5'), transactionError);

    });
}