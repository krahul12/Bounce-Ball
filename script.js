const canvas=document.getElementById("game");
const ct= canvas.getContext("2d");


var max=0;



const colors =["#ff6666","#66b3ff","#66ff66"];


var left=false;
var right=false;
var score=0;
var high;
var check;


var paddle={
    x:canvas.width/2-100,
    y:canvas.height-25,
    dx:5,
    



}
var ball ={
    x:canvas.width/2,
    y:canvas.height-40,
    dx:3,
    dy:-5,
    color:"#FFF8DC",
    speed:5,
}
const bg = new Image();
bg.src="file:///D:/git%20test/Break-occer/i4.jpg";

function outline(){
    ct.beginPath();
    ct.strokeRect(canvas.width/2-125,0,250,100);
    
    ct.moveTo(0, canvas.height/2); 
       
    ct.lineTo(canvas.width, canvas.height/2);
    ct.strokeStyle="#FFF8DC";
    ct.stroke();
    ct.closePath();
}
    

    
function reset()
{   alert("                                                    GAME OVER!!!");
    
    ball ={
        x:canvas.width/2,
        y:canvas.height-40,
        dx:3*(Math.random()*2 -1),
        dy:-5,
        color:"#FFF8DC",
    }
    paddle={
        x:canvas.width/2-100,
        y:canvas.height-25,
        dx:5,
        
    
    
    }
    score=0;
    document.getElementById("score").innerHTML=score;
    //console.log(ball.x,ball.y);
}


   


function drawp(x,y)
{   
    ct.beginPath();
    ct.arc(x+200,y+12.5,12.5,-Math.PI/2,Math.PI/2);
    ct.stroke();
    ct.closePath();
    ct.beginPath();
    ct.arc(x,y+12.5,12.5,Math.PI/2,1.5*Math.PI);
    ct.stroke();
    ct.closePath();
    

}
function rep(x,y)
{
   
    ct.moveTo(x,y);
    ct.lineTo(x-50,y+25);
    ct.clearstroke();
    ct.moveTo(x+200,y);
    ct.lineTo(x+250,y+25);
    ct.stroke();

}
function drawlog(x,y){

ct.fillStyle="#333300"
ct.fillRect(x,y, 200,25 );

ct.strokeStyle="#FFF8DC";
ct.lineWidth=3;
ct.strokeRect(x,y, 200,25);


}

function drawcircle(x,y,col){
ct.beginPath();
ct.arc(x,y,15,0,2*Math.PI);
ct.fillStyle =col;
ct.fill();



ct.strokeStyle="#000000"
ct.stroke();
ct.closePath();

ct.beginPath();
ct.arc(canvas.height/2,canvas.height/2,20,0,2*Math.PI);
ct.strokeStyle="#FFF8DC";
ct.stroke();
ct.closePath();
}
function moveCircle(){

    
    if(ball.x+15 > canvas.width || ball.x-15 < 0 ) {
        ball.dx=-ball.dx;
    }
    if(ball.y+15 > canvas.height || ball.y-15 < 0) 
    {
        ball.dy=-ball.dy;
    }
    if(ball.x-15>=paddle.x-12.5 && ball.x+15<paddle.x+212.5  && ball.y+15==paddle.y && ball.x!=paddle.x+100)
    {   let collide=ball.x-(paddle.x+100);
        collide=collide/100;
        console.log(collide);
        var angle=collide*(Math.PI/3);
        console.log(angle);
        ball.dx=ball.speed*Math.sin(angle);
        ball.dy=-ball.dy*Math.cos(angle);

    }
    if(ball.x==canvas.width/2+1 )
    {
        ball.dy=-ball.dy;
    }
    
  


        ball.x+=ball.dx;
        ball.y+=ball.dy;
        //console.log(canvas.height);

        
    }

    


document.addEventListener("keydown", function(e){
if(e.key =="Right"|| e.key =="ArrowRight")
{
    right=true;
}
else if(e.key =="Left"|| e.key =="ArrowLeft")
{
    left=true;
}    
} );

document.addEventListener("keyup",function(e)
{
    if(e.key =="Right"|| e.key =="ArrowRight")
    {
        right=false;
    }
    else if(e.key =="Left"|| e.key =="ArrowLeft")
    {
        left=false;
    }    
} );

function draw(){
    
    drawlog(paddle.x,paddle.y);
    outline();
    drawp(paddle.x,paddle.y);
    drawcircle(ball.x,ball.y,ball.color);
    
}
function update()
{
    if(right)
    {
        if(paddle.x+200+12.5>canvas.width)
            paddle.x=canvas.width-200-12.5;
        else     
            paddle.x+=paddle.dx;
        
    }
    else if(left)
    {
        if(paddle.x-12.5<0)
            paddle.x=12.5;
        else
            paddle.x-=paddle.dx;
    }
    
    

   moveCircle();
   if(ball.y+15>=canvas.height)
   {   if(score>=max)
    {   max=score;
          high=localStorage.setItem('high',max);
             
         console.log(high);
         document.getElementById("hs").innerHTML=localStorage.getItem('high');
    }
       reset();
      
   }
    console.log(ball.x,ball.y);
   if((ball.x-15>=canvas.width/2-125 && ball.x+15<=canvas.width/2+125) && ( ball.y>=99 && ball.y-15<=100))
   {
    
        score+=1;
        document.getElementById("score").innerHTML=score;
   }
   
         
    
       
       
   }
   
    


function  blueball(){
    ball.color="#6495ED";
    drawcircle(ball.x,ball.y,ball.color);

}
function redball(){
    ball.color="#DC143C";
    drawcircle(ball.x,ball.y,ball.color);

}
function  yellowball(){
    ball.color="#FFA500";
    drawcircle(ball.x,ball.y,ball.color);

}
function bk(){
    ct.fillRect(0,0,canvas.width,canvas.height);
    ct.fillStyle ="#66ff66";
    ct.fill();

}

function loop(){
    console.log(score);
    
    ct.drawImage(bg,0,0);
    
    
    
    draw();
    update();
    
    requestAnimationFrame(loop);
    
}
loop();

