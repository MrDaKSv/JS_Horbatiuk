//tast 1 funk 1
function fruitAction(fruits) {

    function compareAlpfavit(a, b){
        if (a > b) return -1;
        if (a == b) return 0;
        if (a < b) return 1;

    }

    fruits.pop();
    console.log("1.1: " + fruits);


    fruits.unshift("Ananas");
    console.log("1.2: " + fruits);


    fruits.sort(compareAlpfavit);
    console.log("1.3: " + fruits);

    
    console.log("1.4.1: index is "+fruits.indexOf('Apple'))
    console.log("1.4.2: index is "+fruits.findIndex(fruit => fruit == 'Apple'))
    return fruits;
}



//task 1 main 1
let fruits = ["Apple", "Orange", "Plum"];
console.log("1.0: " + fruits);

fruitAction(fruits);


//task 2 fun 2
function colorsAction(colors) {
    let min_str = colors[0], max_str = colors[0];

   for (let index = 1; index < colors.length; index++) {
        if (min_str.length > colors[index].length) {
            min_str = colors[index];
        }  
        if (max_str.length < colors[index].length) {
            max_str = colors[index];
        }  
   }
   console.log("2.1: min - "+min_str+"; max - "+max_str);


   
   for (let index = 0; index < colors.length; index++) {
        if (colors[index].toLowerCase() != 'blue') {            
            colors.splice(index,1);
            if (index === 1) {
                index = 0;
            }
            else{
                index = -1
            }   
        }
   }
   console.log("2.3: "+colors);
   let newStr = colors.join(';');
   console.log("2.4/2.5: "+newStr);
}

//task 2 main 2
let colors = ['Blue','Orange','Black','blue'];
console.log("2.0: "+colors);
colorsAction(colors);


//task 3 fun 3
function aktion_mit_emloyees(employees) {
   //sort alpfa
    employees.sort((a, b) => {
        if (a.name < b.name) {
            return -1; 
        }
        if (a.name > b.name) {
            return 1; 
        }
        return 0; 
    });
    console.log("3.1: ")
    console.table(employees);

    //developer
    let developers = [];
    employees.forEach(element => {
        if (element.position === "Розробник" ) {
            developers.push(element);
        }
    });
    console.log("3.2: ")
    console.table(developers);

    
    // del+check age
    let chekt_age = 35;
    employees.forEach((element, index) => {
        if (element.age === chekt_age) {
            employees.splice(index, 1);
        }
    });
    console.log("3.3: ")
    console.table(employees);


    //adding a employer
    let newEmploer = {
        name: "Емма", age: 45, position: "Директор"
    }

    employees.push(newEmploer);
    console.log("3.4: ")
    console.table(employees);
}


//task 3 maim 3
let employees = [
    { name: "Іван", age: 30, position: "Менеджер" },
    { name: "Марія", age: 25, position: "Аналітик" },
    { name: "Петро", age: 35, position: "Розробник" },
    { name: "Олег", age: 34, position: "Розробник" },
    { name: "Оксана", age: 28, position: "Дизайнер" }
];
console.log("3.0: ")
console.table(employees);
aktion_mit_emloyees(employees);



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


//task 5 fun 5
function action_numbers(numbers) {

    // 1. Піднесення кожного числа до квадрату за допомогою методу map()
    let squaredNumbers = numbers.map(num => num * num);
    console.log("5.1: Піднесення кожного числа до квадрату:", squaredNumbers);

    // 2. Отримання лише парних чисел за допомогою методу filter()
    let evenNumbers = numbers.filter(num => num % 2 === 0);
    console.log("5.2: Лише парні числа:", evenNumbers);

    // 3. Знаходження суми всіх елементів масиву за допомогою методу reduce()
    let sum = numbers.reduce((acc, cur) => acc + cur, 0);
    console.log("5.3: Сума всіх елементів масиву:", sum);

    // 4. Створення нового масиву з 5 додаткових чисел і додавання його до початкового масиву
    let additionalNumbers = [6, 7, 8, 9, 10];
    numbers.push(...additionalNumbers);
    console.log("5.4: Початковий масив з додатковими числами:", numbers);

    // 5. Видалення перших 3 елементів з масиву за допомогою методу splice()
    numbers.splice(0, 3);
    console.log("5.5: Масив після видалення перших 3 елементів:", numbers);
}


//task 5 main 5
let numbers = [1, 2, 3, 4, 5];
console.log("5.0:",numbers)
action_numbers(numbers)


//task 6 funk 6
function libraryManagement() {
    let books = []; // Масив книг

    // Функція для створення нової книги та додавання її до бібліотеки
    function addBook(title, author, genre, pages) {
        let newBook = {
            title: title,
            author: author,
            genre: genre,
            pages: pages,
            isAvailable: true // Нова книга доступна за замовчуванням
        };
        books.push(newBook);
    }

    // Функція для видалення книги з бібліотеки за назвою
    function removeBook(title) {
        books = books.filter(book => book.title !== title);
    }

    // Функція для пошуку книги за автором
    function findBooksByAuthor(author) {
        return books.filter(book => book.author === author);
    }

    // Функція для позначення книги як взятої чи повернутої
    function toggleBookAvailability(title, isBorrowed) {
        let book = books.find(book => book.title === title);
        if (book) {
            book.isAvailable = !isBorrowed;
        }
    }

    // Функція для сортування книг за кількістю сторінок
    function sortBooksByPages() {
        books.sort((a, b) => a.pages - b.pages);
    }

    // Функція для зведення статистики про книги
    function getBooksStatistics() {
        let totalBooks = books.length;
        let availableBooks = books.filter(book => book.isAvailable).length;
        let borrowedBooks = totalBooks - availableBooks;
        let totalPages = books.reduce((total, book) => total + book.pages, 0);
        let averagePages = totalBooks > 0 ? totalPages / totalBooks : 0;

        return {
            totalBooks: totalBooks,
            availableBooks: availableBooks,
            borrowedBooks: borrowedBooks,
            averagePages: averagePages
        };
    }

    return {
        addBook,
        removeBook,
        findBooksByAuthor,
        toggleBookAvailability,
        sortBooksByPages,
        getBooksStatistics
    };
}

//task 6 main 6

let library = libraryManagement();

library.addBook("Book 1", "Author 1", "Fiction", 200);
library.addBook("Book 2", "Author 2", "Non-fiction", 300);

console.log(library.getBooksStatistics()); // Перевірка статистики





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
