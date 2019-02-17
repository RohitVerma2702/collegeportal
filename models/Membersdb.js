var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect("mongodb://Sahil:sahil1998@ds133762.mlab.com:33762/grievance",{ useNewUrlParser: true });
mongoose.Promise=global.Promise;
//var db = mongoose.connection;

var MemberSchema = mongoose.Schema({
    name:{
type:String
    },
    designation:{
  type:String
    },
    Gtype:{
        type:[Number]
    },
    emailid: {
        type: String,
        index: true
    },
    mobileno:{
        type: String,
        index: true
    },
    access:{
     type:String
    },
    password: {
        type: String
    }
   
});

var Member = module.exports = mongoose.model('Members',MemberSchema,'Members');


module.exports.updateuser = function(id,newvalues, callback){
    var id = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};
   Member.updateOne(id, newvalues,callback);
}


module.exports.update_password = function(id,password, callback){
    var id=(id.indexOf('@')===-1)?{_id:id}:{emailid:id};
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
               var query={password:hash};
            Member.updateOne(id, query,callback);
        });
    });
}
module.exports.getUserByID = function(id, callback){
    var query = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};
    Member.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}
Member.grv_find=function(query,callback)
{
console.log(query);
    Member.find({$and:[{gseq: { $in: query} },{status:{$in:['pending','viewed']}}]},callback);
}
Member.Delete_Gcm=function(query,callback){
    var set={emailid: query}
    Member.deleteOne(set,callback);
}
Member.find_member=function(seq,callback){
query={Gtype:seq}
    Member.find(query,callback);
}
Member.find_all=function(callback){
        Member.find(callback);
    }
Member.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
          newUser.password = hash;
            newUser.save(callback);
    })
})
}