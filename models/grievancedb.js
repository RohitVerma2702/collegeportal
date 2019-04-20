var mongoose = require('mongoose');
mongoose.connect("mongodb://Sahil:sahil1998@ds133762.mlab.com:33762/grievance",{ useNewUrlParser: true });
mongoose.Promise=global.Promise;

var GrievanceSchema = mongoose.Schema({
Grv:{
    type:String
},
Gtype:{
    type:String
},
gseq:{
    type:Number
},
subject:{
    type:String
},
file:{
type:String
},
Utype:{
    type:String
},
Grievant:{
type:String
},
grv_id:{
    type:String,
},
time:{
    type:Date
},
status:{// pending/viewed/disposed
    type:String
},
active:{//  1:-active 0:-deleted
type:Boolean,
default:true
},
GCM:{
type:String
},
Reply_date:{
    type:Date
},
reply:{
type:String
}


});
var Grv = module.exports = mongoose.model('Grievance',GrievanceSchema,'Grievance');
Grv.grv_post=function(grv_docs,callback)//Creating new Grievances
{
 grv_docs.save(callback);
}
Grv.update_grv=function(id,newvalues,callback)
{  Grv.updateOne(id, newvalues,callback);
}
Grv.grv_find=function(query,callback)
{
Grv.find({$and:[{active:1},{Gtype:query}]},null,{sort:{time:-1}},callback);
}
Grv.grv_findbyuser=function(query,callback)
{
   Grv.find({$and:[{active:1},{Grievant:query}]},null,{sort:{time:-1}},callback);
}
Grv.grv_findbyid=function(query,callback)
{
    Grv.findOne({grv_id:query},null,callback);}

Grv.grv_all=function(query,date,callback)//all grievances either either active or not 
{console.log("date="+date);
    Grv.find({active:query},null,{sort:{time:-1}},callback);
}

Grv.count_grv=function(query,callback){
   if(query!=null)
    Grv.countDocuments({status:query},callback);
  else
  Grv.countDocuments(null,callback);
}

/* author: Ankit Sharma*/
Grv.grv_findformembers_and_mngmnt=function(query,callback)
{
console.log(query);
    Grv.find({$and:[{active:1},{gseq: { $in: query} },{status:{$in:['pending','viewed','disposed']}}]},null,{sort:{time:-1}},callback);
}
Grv.Report_grv_all=function(query,Fdate,Tdate,callback)//all grievances either either active or not 
{
    Grv.find({$and:[{active:query},{time:{$lt:Tdate,$gt:Fdate}}]},null,{sort:{time:-1}},callback);
}
Grv.Report_grv_status=function(query,Fdate,Tdate,callback)//all grievances either either active or not 
{
    Grv.find({$and:[{status:query},{time:{$lt:Tdate,$gt:Fdate}}]},null,{sort:{time:-1}},callback);
}
Grv.Report_grv_DGtype=function(query,gtype,Fdate,Tdate,callback)//all grievances either either active or not 
{
    Grv.find({$and:[{active:query},{Gtype:gtype},{time:{$lt:Tdate,$gt:Fdate}}]},null,{sort:{time:-1}},callback);
}
Grv.Report_grv_PGtype=function(query,status,gtype,Fdate,Tdate,callback)//all grievances either either active or not 
{
    Grv.find({$and:[{status:status},{active:query},{Gtype:gtype},{time:{$lt:Tdate,$gt:Fdate}}]},null,{sort:{time:-1}},callback);
}

Grv.Report_grv_GCMtype=function(query,status,GCM,Fdate,Tdate,callback)//all grievances either either active or not 
{
    Grv.find({$and:[{status:status},{active:query},{GCM:GCM},{time:{$lt:Tdate,$gt:Fdate}}]},null,{sort:{time:-1}},callback);
}