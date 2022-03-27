const container = document.querySelector('#container');
const resetBtn = document.querySelector('.reset');

let num1 = 5;
let num2 = 5;

let array1 = [];
let array2 = [];

const toArray1 = function(num1){
    for (let i = 1; i <= num1; i++){
        array1.push(i);
    }
}

const toArray2 = function(num2){
    for (let i = 1; i <= num2; i++){
        array2.push(i);
    }
}
toArray1(num1);
toArray2(num2);

const createCol = function(){
    array1.forEach(num => {
        const column = document.createElement('div');
        column.classList.add('column');
        container.appendChild(column);
    });
}
createCol();
const createRows = function(){
        document.querySelectorAll('.column').forEach(
            function(element){
                array2.forEach(num => {
                    const row = document.createElement('div');
                    row.classList.add('row');
                    element.appendChild(row);
            });    
            });
}
createRows();

//function for coloring modifying the squares
document.querySelectorAll('.row').forEach(element => {
    element.addEventListener('mousedown', function(){
    element.classList.add('active');
    });
})

//logic for reset button
resetBtn.addEventListener('click', function (){
    document.querySelectorAll('.row').forEach(element => {
        element.classList.remove('active');
    })
})