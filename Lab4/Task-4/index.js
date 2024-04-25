//task 4 fun 4
function student_action(students) {
    //del students for his name
    students = students.filter(student => student.name !== "Олексій");

    //adding new student
    let newStudent = { name: "Петро", age: 19, course: 2 };
    students.push(newStudent);

    //sort by age
    students.sort((a, b) => b.age - a.age);

    //find a first student of 3 course
    let thirdYearStudent = students.find(student => student.course === 3);

    
    console.log("4.0: Масив студентів після видалення Олексія та додавання Петра:");
    console.table(students);
    console.log("4.4: Студент на 3-му курсі:", thirdYearStudent);
}


//task 4 main 4
let students = [
    { name: "Олексій", age: 20, course: 2 },
    { name: "Іван", age: 22, course: 3 },
    { name: "Марія", age: 21, course: 1 }
];

student_action(students);