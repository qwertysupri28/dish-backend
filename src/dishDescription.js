var express = require('express');
var router = express.Router();
var mySql = require('./mySql');

router.post('/', async function(req, res, next) {
    console.log(req.body);
    let query = `SELECT * FROM tbl_dish WHERE id=${req.body.id}`;
    
    let response = await mySql.sqlQuery(query);

    res.send({"detail": response});
    
});

module.exports = router;