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