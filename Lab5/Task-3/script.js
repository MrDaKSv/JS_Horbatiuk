let clockInterval;




// Функція для відображення залишкового часу
function displayTimeLeft(seconds) {
    const countdownElement = document.getElementById('countdown');
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    const displayString = `${minutes}:${remainingSeconds}`;
    countdownElement.textContent = displayString;
}
  
// Функція для встановлення таймера
function setCountdown() {
   
    const userTime = prompt("Введіть час у секундах для таймера:");
    if (userTime === null || isNaN(userTime)) {
        alert("Будь ласка, введіть коректний час у секундах.");
        return;
    }
    const seconds = parseInt(userTime);
    countdown(seconds);
}
  
// Функція для запуску таймера зворотного відліку
function countdown(seconds) {
    let remainingTime = seconds;
    displayTimeLeft(remainingTime);
    const timer = setInterval(() => {
        remainingTime--;
        if (remainingTime < 0) {
            clearInterval(timer);
            alert("Таймер завершено!");
            displayTimeLeft(0);
        } else {
            displayTimeLeft(remainingTime);
        }
    }, 1000);
}

// Функція для запуску годинника
function setClock() {
    
    const clockElement = document.getElementById('clock');
    clockInterval = setInterval(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const displayString = `${hours}:${minutes}:${seconds}`;
        clockElement.textContent = displayString;
    }, 1000);
   
}

function displayCalendar() {
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const calendarDisplay = document.getElementById('calendarDisplay');

    // Отримуємо значення місяця та року з поля вводу
    const selectedMonth = parseInt(monthInput.value.split('-')[1]); // Розділяємо рядок YYYY-MM і отримуємо місяць
    const selectedYear = parseInt(yearInput.value);

    // Створюємо новий об'єкт Date з вибраним місяцем і роком
    const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
    const lastDayOfMonth = new Date(selectedYear, selectedMonth, 0);

    // Отримуємо день тижня першого дня місяця
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Створюємо рядок для відображення назв місяця та року
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const displayString = `${monthNames[selectedMonth - 1]} ${selectedYear}`;

    // Створюємо таблицю календаря
    let calendarHTML = '<table>';
    calendarHTML += '<caption>' + displayString + '</caption>';
    calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
    calendarHTML += '<tr>';

    // Додаємо порожні комірки перед першим днем місяця
    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarHTML += '<td></td>';
    }

    // Заповнюємо календар днями місяця
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        calendarHTML += '<td>' + i + '</td>';
        if ((firstDayOfWeek + i) % 7 === 0) { // Перевірка на кінець тижня
            calendarHTML += '</tr><tr>';
        }
    }

    // Закриваємо останні рядки таблиці
    calendarHTML += '</tr>';
    calendarHTML += '</table>';

    // Відображаємо календар у відповідному елементі
    calendarDisplay.innerHTML = calendarHTML;
}

function calculateTimeToBirthday() {
    const birthdayInput = prompt("Введіть свою дату народження у форматі YYYY-MM-DD:");
    if (!birthdayInput) {
        alert("Ви не ввели дату народження.");
        return;
    }

    const birthday = new Date(birthdayInput);

    if (isNaN(birthday.getTime())) {
        alert("Ви ввели неправильний формат дати.");
        return;
    }

    // Отримуємо поточну дату
    const today = new Date();

    // Змінюємо рік наступного дня народження на поточний рік
    const nextBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

    // Перевіряємо, чи наступний день народження вже минув у цьому році
    if (nextBirthday < today) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    // Різниця між поточною датою та наступним днем народження
    const timeDifference = nextBirthday.getTime() - today.getTime();

    // Переводимо різницю в місяці, дні, години, хвилини та секунди
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const millisecondsInHour = 1000 * 60 * 60;
    const millisecondsInMinute = 1000 * 60;
    const millisecondsInSecond = 1000;

    const monthsDifference = Math.floor(timeDifference / (millisecondsInDay * 30));
    const daysDifference = Math.floor((timeDifference % (millisecondsInDay * 30)) / millisecondsInDay);
    const hoursDifference = Math.floor((timeDifference % millisecondsInDay) / millisecondsInHour);
    const minutesDifference = Math.floor((timeDifference % millisecondsInHour) / millisecondsInMinute);
    const secondsDifference = Math.floor((timeDifference % millisecondsInMinute) / millisecondsInSecond);

    // Повертаємо об'єкт з результатами
    return {
        months: monthsDifference,
        days: daysDifference,
        hours: hoursDifference,
        minutes: minutesDifference,
        seconds: secondsDifference
    };
}

const timeToBirthday = calculateTimeToBirthday();
if (timeToBirthday) {
    alert(`Час до вашого наступного дня народження: ${timeToBirthday.months} місяців, ${timeToBirthday.days} днів, ${timeToBirthday.hours} годин, ${timeToBirthday.minutes} хвилин, ${timeToBirthday.seconds} секунд.`);
}

