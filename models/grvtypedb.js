var mongoose = require('mongoose');
mongoose.connect("mongodb://Sahil:sahil1998@ds133762.mlab.com:33762/grievance",{ useNewUrlParser: true });
mongoose.Promise=global.Promise;

var GrievanceSchema = mongoose.Schema({
grvtype:{
    type:String
},
seq: { 
    type: Number, 
    default: 0 
},

active:{
    type:Boolean,
    default:true 
},
description:{
    type:String
}

});
var grvtype = module.exports = mongoose.model('Grvtype',GrievanceSchema,'Grvtype');
grvtype.grvtype_post=function(grvtype_docs,callback)
{ grvtype.count({},function(err,c)
    {
        grvtype_docs.seq=c+1;
        console.log(grvtype_docs.seq);
       grvtype_docs.save(callback); 
    });
}

/* author : Ankit Sharma*/

grvtype.update_grvtype=function(id,newvalues,callback)
{
    grvtype.updateOne(id, newvalues,callback);
}

grvtype.grvtype_seq_find=function(grv,callback)
{
query={grvtype:grv}

grvtype.findOne({$and:[{active:1},{grvtype:grv}]},callback);
}

grvtype.grvtype_find=function(callback)
{
grvtype.find({active:true},null,{sort:{seq:1}},callback);
}
