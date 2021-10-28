var drawing = false;
var context;


class Drawing {
  constructor(context) {
    this.drawing = false;
    this.context = context;
  }

  clearDrawing = () => {
    this.context.clearRect(0,0, this.context.canvas.width, this.context.canvas.height);
  }

  backDrawing = () => {
    document.getElementById('myCanvas').style.display = "block";
    document.getElementById('saveArea').style.display = "none";
    document.getElementById('tools').style.display = "block";
  }

  setLineWidth = () =>{
    this.context.lineWidth = document.getElementById('lineWidth').value;
  }

  setColorChange = (event) => {
    this.context.strokeStyle = event.target.value;
  }

  saveDrawing = () =>{
    document.getElementById('myCanvas').style.display = "none";
    document.getElementById('saveArea').style.display = "block";
    
    var dataURL = document.getElementById('myCanvas').toDataURL();
    document.getElementById('canvasImg').src = dataURL;
  }

  handleMouseMove = (e) => {
    const [x,y] = this.getCursorPosition(this.context.canvas, e);
    if(this.drawing) {
     
        console.log(this.getCursorPosition(this.context.canvas, e));
        console.log([e.clientX, e.clientY]);
        this.context.lineTo(x, y);
        this.context.closePath();
        this.context.stroke();
        this.context.moveTo(x, y);
    } else {
        this.context.moveTo(x, y);
    }
  }

   getCursorPosition = (canvas,event) => {
    var x, y;
    console.log(canvas);
    x = event.clientX - canvas.offsetLeft;
    y = event.clientY - canvas.offsetTop;
    return [x,y];
  }

  handleDown = (e) => {
    this.drawing = !this.drawing;
    this.context.moveTo(e.clientX, e.clientY);
    this.context.beginPath();
  }

  handleUp = () =>{
    this.drawing = !this.drawing;
  }

  setDimensions = () => {
    this.context.canvas.width = window.innerWidth - 100;
    this.context.canvas.height = window.innerHeight - 100;
  }

  addEventListeners = () => {
    document.getElementById('clear-drawing').addEventListener('click', this.clearDrawing , false);
    document.getElementById('save-drawing').addEventListener('click', this.saveDrawing, false);
    document.getElementById('back-to-drawing').addEventListener('click', this.backDrawing)
    document.getElementById('color-input').addEventListener('change', this.setColorChange)
    document.onmousemove = this.handleMouseMove;
    document.onmousedown = this.handleDown;
    document.onmouseup = this.handleUp;
  }
  
}

window.onload = () => {
  context = document.getElementById('drawing-app').getContext("2d");
  const drawingInstance = new Drawing(context);

  drawingInstance.setDimensions();
  drawingInstance.addEventListeners();
  context.strokeStyle = "#930FFF";
  context.lineJoin = "round";
  context.lineWidth = 5;
}
