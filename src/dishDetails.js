var express = require('express');
var router = express.Router();
var mySql = require('./mySql');

router.post('/', async function(req, res, next) {
    console.log(req.body);
    let sortString = (req.body.sortColum && req.body.sortDirection) ? ` ORDER BY ${req.body.sortColum} ${req.body.sortDirection} ` : ` ORDER BY id DESC `;

    let query = `SELECT * FROM tbl_dish`;
    
    let countQuery = `SELECT * FROM tbl_dish`;

    if (req.body.search) {
        query += ` WHERE (tbl_dish.name LIKE "%${req.body.search}%" OR tbl_dish.ingredients LIKE "%${req.body.search}%") `
        countQuery += ` WHERE (tbl_dish.name LIKE "%${req.body.search}%" OR tbl_dish.ingredients LIKE "%${req.body.search}%") `
    }

    query += ` ${sortString} LIMIT ${req.body.resultPerPage} OFFSET ${(req.body.currentPage - 1) * req.body.resultPerPage}`;

    let response = await mySql.sqlQuery(query);
    let countNumber = await mySql.sqlQuery(countQuery);

    res.send({"detail": response, "count": countNumber.length});
    
});

module.exports = router;