var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect("mongodb://Sahil:sahil1998@ds133762.mlab.com:33762/grievance",{ useNewUrlParser: true });
mongoose.Promise=global.Promise;
//var db = mongoose.connection;

var StudentSchema = mongoose.Schema({
    id: {
        type: String,
        index: true
    },
    gender:{
        type: String,
    },
    dep:{
      type: String
    },
    rand:{
        type:Number
    },
    status:{
     type:String
    },
    access:{
        type:String,
        default:'pending'
    },
    Batch:{
        type:String
    },
    mobileno:{
        type:String
    },
    Cdate:{
   type:Number
    },
    Last_year:{
       type:Number
    },
    password: {
        type: String
    },
    emailid: {
        type: String
    },
    name: {
        type: String
    }
   
});

var Student = module.exports = mongoose.model('Student',StudentSchema,'Student');




/*module.exports.getUserById = function(id, callback){
    Faculty.findById(id, callback);
}*/

module.exports.getUserByID = function(id, callback){
    var query = (id.indexOf('@') === -1) ? {mobileno: id} : {emailid: id};
    Student.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}
module.exports.getinfobyID = function(id, callback){
    //var query = (id.indexOf('@') === -1) ? {mobileno: id} : {emailid: id};
   var query={_id:id}
    Student.findOne(query, callback);
}
module.exports.updateuser = function(id,newvalues, callback){
     //var query = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};
    var query=id;
    Student.updateOne(query,newvalues,callback);
 }
 module.exports.update_password = function(id,password, callback){
    var id = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
               var query={password:hash};
            Student.updateOne(id, query,callback);
        });
    });
   
}

Student.Terminate=function(year,newvalues,callback){

    Student.updateMany({Last_year:year},newvalues,callback);

}


 Student.apprv_find=function(query,callback)
{
                                                                
    Student.find({$and:[{Termination:0},{status:'verified'},{access:query}]},callback);
}

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
    
}
