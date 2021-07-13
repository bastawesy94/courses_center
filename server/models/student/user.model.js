const {Schema}= require('mongoose')
const mongoose= require('mongoose')

//connection
mongoose.connect('mongodb://127.0.0.1:27017/courses_center', {useNewUrlParser: true, useUnifiedTopology: true});

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
    phone: String,
    joinDate: {type: Date, default: Date.now},
    isPaied: {type: Boolean, default: false}
})

//student's methods
studentSchema.methods.getDetails=()=>{
    return 'bla bla user'    
}

//create model
const Student= mongoose.model('Student', studentSchema)

const student= new Student({
    name: "mohamed",
    age: Math.ceil(Math.random()*100),
    phone: "454564666"
})

//create user
async function createStudent(student) {
    const result= await student.save()
    console.log("User created : " + result)   
}
//retrieve user
async function getAllStudents() {
    const result= await Student
    .find({age: {$lte:40 }})//$ it meants math operator
    .limit(20)
    .sort({age:1})//1 asc and -1 desc
    .select({_id: -1,name:1, age:1})
    console.log("All Students : " + result)   
}
//retrieve user with R.E
async function getAllStudentsContainsMo() {
    const result= await Student
    .find({name : /.*mo.*/ })//contains
    .limit(20)
    .sort({age:1})//1 asc and -1 desc
    .select({_id: -1,name:1, age:1})
    // .countDocuments() //get only length of array
    console.log("All Students : " + result)   
}

//update student
async function updateStudent(id) {
    const result= await Student.update({_id: id},{
        $set:{age: 50}
    })
    console.log(result)
}

//update student
async function removeStudent(id) {
    const result= await Student.deleteOne({_id: id})
    console.log(result)
}

// createStudent(student)
// getAllStudents()
// getAllStudentsContainsMo()
removeStudent("60ed87712ba3c7477424ffb3")
module.exports= Student