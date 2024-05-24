let lampState = false; // false for off, true for on
let timer; // Змінна для зберігання таймеру вимкнення лампочки

function toggleLamp() {
  const lampImg = document.getElementById('lampImg');
  lampState = !lampState;
  if (lampState) {
    lampImg.src = "img/photo_2_2024-04-08_20-09-14.jpg"; 
    timer = setTimeout(turnOffLamp, 10000); 
  } else {
    lampImg.src = "img/photo_1_2024-04-08_20-09-14.jpg"; 
    clearTimeout(timer);
  }
}

function changeBrightness() {
  const lampDiv = document.getElementById('lamp');
  const lampState = lampDiv.querySelector('img').src.endsWith("photo_2_2024-04-08_20-09-14.jpg"); // Перевірка, чи включена лампочка
  if (!lampState) {
    alert("Спочатку увімкніть лампочку, щоб змінити яскравість.");
    return; 
  }
  const brightness = parseFloat(prompt("Введіть значення яскравості від 1 до 10:"));
  if (!isNaN(brightness) && brightness >= 1 && brightness <= 10) {
    lampDiv.style.opacity = brightness / 10;
  } else {
    alert("Будь ласка, введіть коректне значення яскравості від 1 до 10.");
  }
}


function turnOffLamp() {
  const lampImg = document.getElementById('lampImg');
  lampState = false; 
  lampImg.src = "img/photo_1_2024-04-08_20-09-14.jpg"; 
}


document.getElementById('lamp').addEventListener('click', function() {
  toggleLamp();
});


document.getElementById('lamp').addEventListener('mouseover', function() {
  clearTimeout(timer);
});

document.getElementById('lamp').addEventListener('mouseout', function() {
  
  if (lampState) {
    timer = setTimeout(turnOffLamp, 10000); 
  }
});
