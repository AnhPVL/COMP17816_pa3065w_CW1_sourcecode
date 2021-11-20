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

function prepareDatabase(db) {
    db.transaction(function (tx) {
        // Create table PROPERTY.
        var query = `CREATE TABLE IF NOT EXISTS Property (Id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                     Name TEXT NOT NULL UNIQUE,
                                                     Province INTEGER NOT NULL,
                                                     District INTEGER NOT NULL,
                                                     Ward INTEGER NOT NULL,
                                                     Street TEXT NOT NULL,
                                                     Type INTEGER NOT NULL,
                                                     Bedroom INTEGER NOT NULL,
                                                     Price INTEGER NOT NULL,
                                                     Furnituretype TEXT NULL,
                                                     Petallow INTEGER NUll,
                                                     Datepost TEXT NOLL NULL,
                                                     Reportername TEXT NOT NULL)`;
        tx.executeSql(query, [], function (tx, result) {
            log(`Create table 'Property' successfully.`);
        }, transactionError);

        // Create table NOTE
        var query = `CREATE TABLE IF NOT EXISTS Note (Id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                     Note TEXT NOT NULL,
                                                     Datetime DATE NOT NULL,
                                                     PropertyId INTEGER NOT NULL,
                                                     FOREIGN KEY (PropertyId) REFERENCES Property(Id))`;
        tx.executeSql(query, [], function (tx, result) {
            log(`Create table 'Note' successfully.`);
        }, transactionError);
    });
}