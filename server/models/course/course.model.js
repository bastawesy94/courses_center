const {Schema}= require('mongoose')
const mongoose= require('mongoose')

//connection
mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

//test connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("db is connected !")
});

//schema 1
const studentSchema= new Schema({
    name: String,
    age: Number,
    phone: String
})

studentSchema.methods.getDetails=()=>{
    return 'bla bla user'    
}

const student= new Student({
    name: "mohamed",
    age: 40,
    phone: "454564666"
})
student.save((err , student=>{
    if(err) console.lo(err)
    student.getDetails()
}))

//create model
const Student= mongoose.model('Student', studentSchema)
const student = new Student()
console.log("details :" + student.getDetails())

module.exports= Student