const container = document.querySelector('#container');
const resetBtn = document.querySelector('.reset');
const slider = document.getElementById('myRange');
let gridSize = document.querySelector('.gridSize');
let colorSelect = document.getElementById('colorSelect');
const background = document.getElementById('backgroundColor');
const eraser = document.querySelector('.eraser');
const rainbow = document.querySelector('.rainbow');
const lighten = document.querySelector('.lighten');
const shade = document.querySelector('.shade');

let eraserOn = false;
let rainbowOn = false;
let lightenOn = false;
let shadeOn = false;

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
                    row.style.backgroundColor = background.value;
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

//function for eraser toggle
eraser.addEventListener('click', () => {
    if(eraserOn){
        eraserOn = false;
        eraser.classList.remove('toggled');
    }else {
        let array = [rainbow, shade, lighten]
        array.forEach((element) => {
            element.classList.remove('toggled')
        })

        eraserOn = true;
        rainbowOn = false;
        lightenOn = false;
        shadeOn = false;

        eraser.classList.add('toggled');
    }
})

//function for rainbow toggle
rainbow.addEventListener('click', () => {
    if(rainbowOn){
        rainbowOn = false;
        rainbow.classList.remove('toggled');
    }else {
        let array = [eraser, shade, lighten]
        array.forEach((element) => {
            element.classList.remove('toggled')
        })

        rainbowOn = true;
        lightenOn = false;
        shadeOn = false;
        eraserOn = false;

        rainbow.classList.add('toggled');
    }
})

//function for shade toggle
shade.addEventListener('click', () => {
    if(shadeOn){
        shadeOn = false;
        shade.classList.remove('toggled');
    }else {
        let array = [eraser, rainbow, lighten]
        array.forEach((element) =>{
            element.classList.remove('toggled');
        })

        rainbowOn = false;
        lightenOn = false;
        shadeOn = true;
        eraserOn = false;

        shade.classList.add('toggled');
    }
})

//function for lighten toggle
lighten.addEventListener('click', () => {
    if(lightenOn){
        lightenOn = false;
        lighten.classList.remove('toggled');
    }else {
        let array = [eraser, rainbow, shade]
        array.forEach((element) =>{
            element.classList.remove('toggled');
        })
        
        rainbowOn = false;
        lightenOn = true;
        shadeOn = false;
        eraserOn = false;

        lighten.classList.add('toggled');
    }
})

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
let selectedColor = colorSelect.value;

colorSelect.onchange = function(){
    selectedColor = colorSelect.value
}

//function for random color generation
let randomColor = null;
const rgbGen = () => {
    let colorVal = Math.floor(Math.random()*16777215).toString(16);
    randomColor = '#' + colorVal;
}

const darkenColor = (col) => {
    let usePound = false;
    if (col[0] == '#'){
        col = col.slice(1);
        usePound = true;
    }

    let num = parseInt(col, 16);
    let r = Math.max(0, Math.min(255, (num >> 16) - 20));
    let g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) - 20));
    let b = Math.max(0, Math.min(255, (num & 0x0000FF) - 20));

    return (usePound?"#":"") + ((g | (b << 8) | (r << 16))).toString(16).padStart(6, '0');
}

const lightenColor = (col) => {
    let usePound = false;
    if (col[0] == '#'){
        col = col.slice(1);
        usePound = true;
    }

    let num = parseInt(col, 16);
    let r = Math.max(0, Math.min(255, (num >> 16) + 20));
    let g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + 20));
    let b = Math.max(0, Math.min(255, (num & 0x0000FF) + 20));

    return (usePound?"#":"") + ((g | (b << 8) | (r << 16))).toString(16).padStart(6, '0');
}
//function for coloring modifying the squares
const paintGrid = function (element){
    if (element.buttons == 1){
        if (element.target.classList.contains('row')){
            let square = element.target;
            if(eraserOn){
                square.style.backgroundColor = background.value;
            }else if(rainbowOn){
                square.style.backgroundColor = randomColor;
            }else if(shadeOn){
                let backgroundColor = square.style.backgroundColor;
                if (backgroundColor && backgroundColor!== '') {
                    let rgb = backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    if (rgb) {
                        let r = parseInt(rgb[1]);
                        let g = parseInt(rgb[2]);
                        let b = parseInt(rgb[3]);
                        let hexColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                        let base = darkenColor(hexColor);
                        square.style.backgroundColor = base;
                        setTimeout(paintGrid, 2000)
                    }
                }
            }else if(lightenOn){
                let backgroundColor = square.style.backgroundColor;
                if (backgroundColor && backgroundColor!== '') {
                    let rgb = backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    if (rgb) {
                        let r = parseInt(rgb[1]);
                        let g = parseInt(rgb[2]);
                        let b = parseInt(rgb[3]);
                        let hexColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                        let base = lightenColor(hexColor);
                        square.style.backgroundColor = base;
                        setTimeout(paintGrid, 2000)
                    }
                }
            }else {
                square.style.backgroundColor = selectedColor;
            }
        }else {
            return;
        }
    }
}
document.addEventListener('mousedown', event => {
    if(eraserOn){
        paintGridEvent = paintGrid(event);
    }else {
        paintGridEvent = paintGrid(event);
    }
    if(event.buttons == 1){
        window.addEventListener('mouseover', (e) => {
            if(rainbowOn){
                rgbGen();
                paintGrid(e);
            }else {
                paintGrid(e);
            }
        });
    } else {
        return;
    }
});


//logic for reset button
resetBtn.addEventListener('click', function (){
    document.querySelectorAll('.row').forEach(element => {
        element.style.backgroundColor = background.value;
    })
});