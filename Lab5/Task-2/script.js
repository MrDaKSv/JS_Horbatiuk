let redDuration = 5000,yellowDuration = 3000,greenDuration = 7000;
function change(){
    redDuration = parseInt(prompt("Введіть тривалість червоного світла (у секундах):")) * 1000;
    yellowDuration = parseInt(prompt("Введіть тривалість жовтого світла (у секундах):")) * 1000;
    greenDuration = parseInt(prompt("Введіть тривалість зеленого світла (у секундах):")) * 1000;

    if (isNaN(redDuration) || redDuration <= 0) {
        redDuration = 5000; // Стандартна тривалість червоного світла - 5 секунд
    }

    if (isNaN(yellowDuration) || yellowDuration <= 0) {
        yellowDuration = 3000; // Стандартна тривалість жовтого світла - 3 секунди
    }

    if (isNaN(greenDuration) || greenDuration <= 0) {
        greenDuration = 7000; // Стандартна тривалість зеленого світла - 7 секунд
    }
    
}
let secondYellow = 0;

function manualSwitch() {
    
    // Отримуємо поточний стан світлофора
    const redLight = document.getElementById('redLight');
    const yellowLight = document.getElementById('yellowLight');
    const greenLight = document.getElementById('greenLight');
   
        if (redLight.style.display !== 'none') {
            redLight.style.display = 'none';
            yellowLight.style.display = 'block';
            statusDisplay.textContent = "Жовтий";
            secondYellow = 0; 
        } else if (yellowLight.style.display !== 'none' && secondYellow == 0) {
            yellowLight.style.display = 'none';
            greenLight.style.display = 'block';
            statusDisplay.textContent = "Зелений"; 
        } else if (greenLight.style.display !== 'none') {
            greenLight.style.display = 'none';
            yellowLight.style.display = 'block';
            statusDisplay.textContent = "Жовтий"; 
            secondYellow = 1;
        } else if(yellowLight.style.display !== 'none' && secondYellow == 1){
            yellowLight.style.display = 'none';
            redLight.style.display = 'block';
            statusDisplay.textContent = "Червоний";
            secondYellow = 0;
        }
        
    
    
}

function trafficLight() {

    // Отримуємо посилання на блок для виведення статусу
    const statusDisplay = document.getElementById('statusDisplay');
    
    
    //Показуємо червоне світло та ховаємо інші
    document.getElementById('redLight').style.display = 'block';
    document.getElementById('yellowLight').style.display = 'none';
    document.getElementById('greenLight').style.display = 'none';
    document.getElementById('noneLight').style.display = 'none';
    if (secondYellow == 0) {
        statusDisplay.textContent = "Червоний";
    }
    else
    {
        statusDisplay.textContent = "petyx"; 
    }
    

    // Червоне світло - 5 секунд
    setTimeout(() => {
      // Показуємо жовте світло та ховаємо інші
      document.getElementById('redLight').style.display = 'none';
      document.getElementById('yellowLight').style.display = 'block';
      document.getElementById('greenLight').style.display = 'none';
      document.getElementById('noneLight').style.display = 'none';
      statusDisplay.textContent = "Жовтий"; 
  
      // Жовте світло - 3 секунди
      setTimeout(() => {
        
        // Показуємо зелене світло та ховаємо інші
        document.getElementById('redLight').style.display = 'none';
        document.getElementById('yellowLight').style.display = 'none';
        document.getElementById('greenLight').style.display = 'block';
        document.getElementById('noneLight').style.display = 'none';
        statusDisplay.textContent = "Зелений"; 
        // Зелене світло - 7 секунд 

        setTimeout(() => {
          // Миготливий жовтий - мигає 3 рази
          let count = 0;
          const blinkYellowTimer = setInterval(() => {
            if (count % 2 === 0) {
              document.getElementById('yellowLight').style.display = 'block';
              document.getElementById('redLight').style.display = 'none';
              document.getElementById('greenLight').style.display = 'none';
              document.getElementById('noneLight').style.display = 'none';
              statusDisplay.textContent = "Мигаючий жовтий"; 
            } else {
              document.getElementById('yellowLight').style.display = 'none';
              document.getElementById('greenLight').style.display = 'none';
              document.getElementById('redLight').style.display = 'none';
              document.getElementById('noneLight').style.display = 'block';
              statusDisplay.textContent = "Мигаючий жовтий"; 
              secondYellow = 0;
            }
            count++;
            if (count >= 6) {
              clearInterval(blinkYellowTimer);
              // Повторно викликаємо функцію для наступного циклу
              redDuration = 5000,yellowDuration = 3000,greenDuration = 7000;
              trafficLight();
            }
          }, 500); // Інтервал між миганням жовтого - 500 мілісекунд
        }, greenDuration);
      }, yellowDuration); 
    },redDuration); 
  }
  
  // Запускаємо програму
  trafficLight();
  