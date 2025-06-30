const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    summary:String,
    skills:[String],
    education: [
        {
            college: String,
            degree: String,
            startYear: Number,
            endYear: Number
        }
    ],
    projects: [
        {
            title:String,
            technologies:[String],
            description:String
        }
    ],
    isFresher: {
        type: Boolean,
        default:false
    },
    experience: [
        {
            company:String,
            role:String,
            description:String,
            startDate:String,
            endDate:String
        }
    ],
    templateId: {type:String,default:'TemplateOne'},   
}, { timestamps:true});

module.exports = mongoose.model('Resume',ResumeSchema);