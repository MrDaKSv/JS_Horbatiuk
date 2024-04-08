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
 