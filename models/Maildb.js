var mongoose = require('mongoose');
mongoose.connect("mongodb://Sahil:sahil1998@ds133762.mlab.com:33762/grievance",{ useNewUrlParser: true });
mongoose.Promise=global.Promise;

var MailSchema=mongoose.Schema({
    emailid:{
        type:String
    },
    subject:{
        type:String
    },
    status:{
        type:String
    },
    date:{
        type:Date
    }
});

var Mail=module.exports=mongoose.model('Mail_Log',MailSchema,'Mail_Log');
Mail.mail_log=function(mail_doc,callback){
    mail_doc.save(callback);
}

Mail.find_mail=function(callback){
    Mail.find(callback).sort({date:-1});

}

