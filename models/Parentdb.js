var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect("mongodb://Sahil:sahil1998@ds133762.mlab.com:33762/grievance",{ useNewUrlParser: true });
mongoose.Promise=global.Promise;
//var db = mongoose.connection;

var ParentSchema = mongoose.Schema({
    
    
    relation:{
        type:String
    },
    mobileno:{
        type:String
    },
    rand:{
        type:Number
    },
    status:{
     type:String
    },
    ward_id:{
    type:String
    },
    access:{
      type:String,
      default:'pending'
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

var Parent = module.exports = mongoose.model('Parent',ParentSchema,'Parent');

Parent.getUserByID = function(id, callback){
    var query = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};
    Parent.findOne(query,callback);
}
Parent.getinfobyID = function(id,callback){
    var query = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};
  var query={_id:id};
    Parent.findOne(query, callback);
}
Parent.updateuser = function(id,newvalues, callback){
   var id = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};
   Parent.updateOne(id, newvalues,callback);
}
Parent.update_password = function(id,password, callback){
    var id = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
               var query={password:hash};
            Parent.updateOne(id, query,callback);
        });
    });
   
}
Parent.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}

Parent.Terminate=function(year,newvalues,callback){
    Parent.updateMany({Last_year:year},newvalues,callback);
}

Parent.apprv_find=function(query,callback)
{
   Parent.find({$and:[{status:'verified'},{access:query}]},callback);
}
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
    
}
