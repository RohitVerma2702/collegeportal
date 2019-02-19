var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect("mongodb://Sahil:sahil1998@ds133762.mlab.com:33762/grievance",{ useNewUrlParser: true });
mongoose.Promise=global.Promise;
//var db = mongoose.connection;

var AdminSchema = mongoose.Schema({
    name:{
     type:String
    }, 
   emailid: {
        type: String,
        index: true
    },
    mobileno:{
        type: String,
        index: true
    },
    password: {
        type: String
    }
   
});

var Admin = module.exports = mongoose.model('Admin',AdminSchema,'Admin');




module.exports.getinfobyID = function(id, callback){
    var query=(id.indexOf('@')===-1)?{_id:id}:{emailid:id};
    Admin.findOne(query, callback);
}
module.exports.update_password = function(id,password, callback){
 var id={emailid:id}; 
   bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
               var query={password:hash};
            Admin.updateOne(id, query,callback);
        });
    });
   
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}

  module.exports.getUserByID = function(id, callback){
    var query = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};
     Admin.findOne(query, callback);
     }
     Admin.updateuser=function(id,newvalues,callback)
     {
        var query = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};
         Admin.updateOne(query,newvalues,callback);
     }

  Admin.admin_find=function(callback){

    Admin.find(callback);
  }   
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}

