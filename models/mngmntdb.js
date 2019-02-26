var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect("mongodb://Sahil:sahil1998@ds133762.mlab.com:33762/grievance",{ useNewUrlParser: true });
mongoose.Promise=global.Promise;
//var db = mongoose.connection;

var mngmntSchema = mongoose.Schema({
    name:{
        type:String
    },
    emailid: {
        type: String,
        index: true
    },
    designation:{
        type:String
          },
   Gtype:{
      type:[Number]
       },
       access:{
       type:String
       },
    mobileno:{
        type: String,
        index: true
    },
    password: {
        type: String
    }
   
});

var mngmnt = module.exports = mongoose.model('Mngmnt',mngmntSchema,'Mngmnt');





module.exports.getUserByID = function(id, callback){
    var query = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};

    mngmnt.findOne(query, callback);
}
module.exports.getinfobyID = function(id, callback){
    var query = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};
  mngmnt.findOne(query, callback);
}
mngmnt.updateuser = function(id,newvalues, callback){
  var id=(id.indexOf('@')===-1)?{_id:id}:{emailid:id};
    mngmnt.updateOne(id, newvalues,callback);
 }
 mngmnt.find_member=function(seq,callback){
    query={Gtype:seq}
        mngmnt.find({$and:[{Gtype:seq},{access:'approved'}]},callback);
    }
    mngmnt.find_all=function(callback){
        mngmnt.find({access:'approved'},callback);
    }
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}
module.exports.update_password = function(id,password, callback){
    var id=(id.indexOf('@')===-1)?{_id:id}:{emailid:id};
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
               var query={password:hash};
               mngmnt.updateOne(id, query,callback);
        });
    });
   
}
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
          newUser.password = hash;
            newUser.save(callback);
    })
})
}