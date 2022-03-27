const container = document.querySelector('#container');
const resetBtn = document.querySelector('.reset');
const slider = document.getElementById('myRange')
let gridSize = document.querySelector('.gridSize')

let num = 16;
gridSize.textContent = `${num} X ${num}`

let array = [];

const toArray = function(num){
    for (let i = 1; i <= num; i++){
        array.push(i);
    }
}

toArray(num);

const createCol = function(){
    array.forEach(num => {
        const column = document.createElement('div');
        column.classList.add('column');
        container.appendChild(column);
    });
}
createCol();
const createRows = function(){
        document.querySelectorAll('.column').forEach(
            function(element){
                array.forEach(num => {
                    const row = document.createElement('div');
                    row.classList.add('row');
                    element.appendChild(row);
            });    
            });
}
createRows();

const removeGrid = function(parent){
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild)
    }
    return
}

//function for coloring modifying the squares
document.querySelectorAll('.row').forEach(element => {
    element.addEventListener('mousedown', function(){
    element.classList.add('active');
    });
})

//logic for slider to change grid size
slider.oninput = function(){
    removeGrid(container);
    let num = this.value;
    gridSize.textContent = `${num} X ${num}`;
    createCol();
    createRows();
}


//logic for reset button
resetBtn.addEventListener('click', function (){
    document.querySelectorAll('.row').forEach(element => {
        element.classList.remove('active');
    })
})