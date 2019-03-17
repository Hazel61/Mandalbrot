// Create Canvas
let myCanvas = document.createElement("canvas");
myCanvas.width=1420;
myCanvas.height=1000;
document.body.appendChild(myCanvas);
let ctx = myCanvas.getContext("2d");
let colorSlider = document.getElementById('colorRange');
let sizeSlider = document.getElementById('sizeRange');

function generateSpinner(entryPoint) {
    let entryPointElement = document.querySelector(entryPoint);
    entryPointElement.classList.add('sk-circle');
    entryPointElement.style.display = 'none';
    for (let i = 0; i < 12; i++) {
        let child = document.createElement('div');
        child.classList.add(`sk-circle${i+1}`, 'sk-child');
        entryPointElement.appendChild(child);
    }
    return entryPointElement;
}

let spinner = generateSpinner('#loader');

function toggleDisplay(element) {
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

function checkIfBelongsToMandelbrotSet(x,y) {
    let realComponentOfResult = x;
    let imaginaryComponentOfResult = y;
    let maxIterations = 50;
    for(let i = 0; i < maxIterations; i++) {
        let tempRealComponent = realComponentOfResult * realComponentOfResult
            - imaginaryComponentOfResult * imaginaryComponentOfResult
            + x;
        let tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
            + y;
        realComponentOfResult = tempRealComponent;
        imaginaryComponentOfResult = tempImaginaryComponent;
        // Return a number as a percentage
        if(realComponentOfResult * imaginaryComponentOfResult > 5)
            return (i/maxIterations * 100);
    }
    return 0;   // Return zero if in set
}


const panX = 2;
const panY = 1;

function drawMandelbrotLine(y) {

    let magnificationFactor = sizeSlider.value;
    for (let x = 0; x < myCanvas.width; x++) {
        let belongsToSet =
            checkIfBelongsToMandelbrotSet(x / magnificationFactor - panX,
                y / magnificationFactor - panY);
        if (belongsToSet === 0) {
            ctx.fillStyle = '#000';
            ctx.fillRect(x, y, 1, 1); // Draw a black pixel
        } else {
            let colorValue = colorSlider.value;
            ctx.fillStyle = `hsl(${colorValue}, 100%, ${belongsToSet}%)`;
            ctx.fillRect(x, y, 1, 1); // Draw a colorful pixel
        }
    }
    let nextY = y + 1;
    if (nextY < myCanvas.height) {
        setTimeout(() => drawMandelbrotLine(nextY), 0);
    } else {
        toggleDisplay(spinner);
    }

}
function draw() {
    toggleDisplay(spinner);
    myCanvas.width = window.innerWidth;
    setTimeout(() => drawMandelbrotLine(0), 0);
}

