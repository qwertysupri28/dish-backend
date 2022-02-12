var express = require('express');
var router = express.Router();
const reader = require('xlsx')
  
const file = reader.readFile('./doc/indian_food.csv');
var mySql = require('./mySql');

router.post('/', async function(req, res, next) {
    console.log(req.body);
    const worksheet = file.Sheets[file.SheetNames[0]];

    const dishData= [];
    let obj = {};
    
    for(let cell in worksheet) {
        const cellasString = cell.toString();

        if (cellasString[1] !== 'r' && cellasString !== 'm' && cellasString[1] > 1) {
            if (cellasString[0] === 'A') {
                obj.name = worksheet[cell].v;
            }
            if (cellasString[0] === 'B') {
                obj.ingredients = worksheet[cell].v;
            }
            if (cellasString[0] === 'C') {
                obj.diet = worksheet[cell].v;
            }
            if (cellasString[0] === 'D') {
                obj.prep_time = worksheet[cell].v;
            }
            if (cellasString[0] === 'E') {
                obj.cook_time = worksheet[cell].v;
            }
            if (cellasString[0] === 'F') {
                obj.flavor_profile = worksheet[cell].v;
            }
            if (cellasString[0] === 'G') {
                obj.course = worksheet[cell].v;
            }
            if (cellasString[0] === 'H') {
                obj.state = worksheet[cell].v;
            }
            if (cellasString[0] === 'I') {
                obj.region = worksheet[cell].v;
                dishData.push(obj);
                obj = {};
            }
        }
    }
    // console.log(dishData);
    let insertData = '';
    let query = '';
    for (let i = 0; i < dishData.length; i ++) {
        console.log(i);
        insertData = insertData + `("${dishData[i].name}", "${dishData[i].ingredients}", "${dishData[i].diet}", ${dishData[i].prep_time}, ${dishData[i].cook_time}, "${dishData[i].flavor_profile}", "${dishData[i].course}", "${dishData[i].state}", "${dishData[i].region}"),`;
        query = `INSERT INTO tbl_dish (name, ingredients, diet, prep_time, cook_time, flavor_profile, course, state, region) VALUES ${insertData}`;
    }
    const finalQuery = query.slice(0, -1)
    console.log(finalQuery);
    let response = await mySql.sqlQuery(finalQuery);
    res.send(response);
    
});

module.exports = router;