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

