var express = require('express');
var router = express.Router();



//update the phonebook entries

router.post('/update/:id',function (req, res) {

	var db=req.db;
	var id=req.params.id;
 //    console.log({"_id":db.ObjectID.createFromHexString('"'+id+'"')},{"$set":{"no":"hassan"}});
	// db.collection('phoneBookEntries').update({_id: )},{"$set":{"no":"hassan"}},function (err, result) {
		
	// 	if (err) {
	// 		res.json({"success":"no"});
	// 	}
	// 	else{
	// 			res.json({"success":"yes","result":result});
	// 	}


	// });
	res.json({"success":"no"});

});


//get all phonebook entries
router.get('/phonebook', function(req, res) {

		var db=req.db;
		
		db.collection('phoneBookEntries').find().toArray(function(err, result) {
    if (err) throw err;
    res.json(result);

});

});

//delete phonebook entries

router.delete('/deletecontact/:id', function(req, res){
	var db=req.db;
	var idToDelete=req.params.id;
	db.collection('phoneBookEntries').removeById(idToDelete, function (err,result){
			if(err){
					res.json({"success":"no"});
			}
			else
			{
					res.json({"success":"yes"});				
			}
	});

});

// add new phonebook entry
router.post('/addcontact', function(req, res){
	var db=req.db;
	//get all the information from the incoming post req
	//console.log(req.query);
	var firstname=req.query.firstname;
	var lastname=req.query.lastname;
	var email=req.query.email;
	var phoneno=req.query.no;

	if(firstname==undefined || lastname==undefined || email==undefined || phoneno==undefined){
			res.json({"success":"no","message":"missing values"});
	}

	var collection=db.collection("phoneBookEntries");
	var entry={"firstname":firstname, "lastname":lastname, "email":email, "no":phoneno};
	console.log(entry);
	collection.insert(entry, function(err, result){
		if(err){

			res.json({"success":"no"});
		}
		else{
				res.json({"success":"yes","result":result});
		}

	});



});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
