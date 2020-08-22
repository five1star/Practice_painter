const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
//canvas는 context를 갖는다. 
//요소 안에서 픽셀을 다룰 수 있다.
//캔버스 사이즈는 css 사이즈와 pixcel manipulating 사이즈가 있어야 한다. 

canvas.width = 700;
canvas.height =700;
//fixcel modifier

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;;
    //client X,Y는 전체 윈도우에서의 위치
    //offsetX,Y가 이 캔버스에서의 x,y 위치

    if(!painting){
        //path는 라인이다
        ctx.beginPath();
        //마우스를 움직이는 모든 순간에 path를 만든다 시작점은 마우스가 움직이는점 
        //움직이느동안 path가 만들어졌지만 시작되지 않는다. 
        ctx.moveTo(x,y);
    } else {
        //클릭하는 순간, painting이 true가 되면, lineTo가 실행됨 라인투는 path의
        //현재의 sub-path에서 마지막 지점을 특정 좌표로 연결한다.
        //마우스를 조금이라도 움직이면, (패스 위치가 바뀌면) 이전 지점과 현재 지점이 연결된다.
        ctx.lineTo(x,y);
        //스트로크는 그러져지는 sub path에 선을 입혀준다.
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

if (canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
}


Array.from(colors).forEach(function(color){
    color.addEventListener('click', handleColorClick)
})
//array.from은 object로부터 array를 만든다.