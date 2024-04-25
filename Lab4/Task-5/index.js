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