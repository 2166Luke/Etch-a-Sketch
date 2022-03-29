const container = document.querySelector('#container');
const resetBtn = document.querySelector('.reset');
const slider = document.getElementById('myRange');
let gridSize = document.querySelector('.gridSize');
let colorSelect = document.getElementById('colorSelect');
const background = document.getElementById('backgroundColor');

//default grid size upon page load
let num = 16;
gridSize.textContent = `${num} X ${num}`

let array = [];
//turns the number into an array so we can make the grid
const toArray = function(num){
    for (let i = 1; i <= num; i++){
        array.push(i);
    }
}
toArray(num);

//functions for creating the columns, rows, and combining them into the grid
const createCol = function(){
    array.forEach(num => {
        const column = document.createElement('div');
        column.classList.add('column');
        container.appendChild(column);
    });
}
const createRows = function(){
        document.querySelectorAll('.column').forEach(
            function(element){
                array.forEach(num => {
                    let row = document.createElement('div');
                    row.classList.add('row');
                    element.appendChild(row);
            });    
            });
}
const createGrid = function(){
    createCol();
    createRows();
}
createGrid();

//function to clear the grid and the array
const removeGrid = function(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
    return
}
const watchColorPicker = function (event){
    container.style.background = event.target.value
}

background.addEventListener('change', watchColorPicker, false);

//logic for slider to change grid size
slider.oninput = function (){
    array = [];
    let num = this.value;
    toArray(num);
    gridSize.textContent = `${num} X ${num}`;
}

slider.onchange = function(){
    removeGrid(container);
    if (!container.firstChild){
        createGrid();
    }
}

//function for coloring modifying the squares

const paintGrid = function (color){
    document.querySelectorAll('.row').forEach(element=>{
        element.style.backgroundColor = color;
    })
}     
     
const selectedColor = colorSelect.value

/*
const modify = function(){
    document.querySelectorAll('.row').forEach(element => {
        element.addEventListener('mouseenter', paintGrid(element, selectedColor));
    })
}

document.addEventListener('mousedown', modify)


container.addEventListener('mousedown', event => {
    if(event.buttons == 1){
        window.addEventListener('mouseenter', (e) => {
            paintGrid(e, selectedColor)
        })
    }
})
*/
document.addEventListener('mousedown', function (){
    document.querySelectorAll('.row').forEach(element =>{
        element.addEventListener('mouseenter', function (){
             paintGrid(selectedColor);
        })
    })
})




//logic for reset button
resetBtn.addEventListener('click', function (){
    document.querySelectorAll('.row').forEach(element => {
        element.style.backgroundColor = null;
    })
})