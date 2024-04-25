// Створення об'єкта з даними про студента
let student_test = {
    name: "Іван",
    age: 20,
    course: 3
};


student_test.subject = ["Математика", "Фізика", "Хімія"];


delete student_test.age;
// Виведення оновленого об'єкту у консоль
console.table(student_test);