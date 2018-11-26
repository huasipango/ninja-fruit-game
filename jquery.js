var playing=false;
var score;

var trialsLeft;
var fruits = ['apple', 'banana', 'cherry', 'grapes', 'mango', 'orange', 'peach', 'pera', 'watermelon', 'pine'];
var step;
var action; //useda por setInterval

$(function(){

// Iniciamos el juego    
$("#startreset").click(function(){
   //Estamos jugando
   if(playing == true){
       //recargar la pagina
       location.reload();

   }else{
       // No estamos jugando
       playing = true; //inicia el juego

       // setea el puntaje a 0
       score=0;
       $("#scorevalue").html(score);

       //muestra intentos
       $("#trialsLeft").show();

       trialsLeft=3;

      addHearts();
       // ocultar cuadro de game over
       $("#gameover").hide();

       // CAmbiar el texto del boton a reiniciar juego
       $("#startreset").html("Reiniciar juego");

       //Inciar el envio de frutas
       startAction();
   }
});

$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score);//actualizar puntaje
    //document.getElementById("slicesound").play();
    $("#slicesound")[0].play();//reproducir sonido
    //detener fruta fruit
    clearInterval(action);
    // ocultar fruta
    $("#fruit1").hide("explode", 100);
    //enviar una nueva fruta
    
    setTimeout(startAction, 500);
    
    
});

function addHearts(){
    $("#trialsLeft").empty();
     for(i=0; i<trialsLeft; i++){
               $("#trialsLeft").append('<img src="images/heart.png" class="life">');
           }
}

function startAction(){
    
    
    //generar una fruta.
    $("#fruit1").show();
    chooseFruit();// seleccionar una fruta de forma randomica
    
    //posicion randomica
    $("#fruit1").css({'left':Math.round(550*Math.random()), 'top':-50});
    
    //generar desplazamiento randomico
    step = 1 + Math.round(5*Math.random());
    
    //cambiar el paso
    
    //Mmover la fruta hacia abajo con pasos de 10ms
    action = setInterval(function(){
        //mover un paso la fruta 
        $("#fruit1").css('top', $("#fruit1").position().top + step);
        
        //verificar si la fruta esta abajo
        if($("#fruit1").position().top>$("#fruitsContainer").height()){
            // verificar si tenemos intentos restantes
                if (trialsLeft>1){
                    //generar una fruta.
    $("#fruit1").show();
    chooseFruit();// seleccionar una fruta de forma randomica
    
    //posicion randomica
    $("#fruit1").css({'left':Math.round(550*Math.random()), 'top':-50});
    
    //generar un paso randomico.
    step = 1 + Math.round(5*Math.random());
                    //reducir los intentos
                    trialsLeft--;
                    //publicar intentos
                    addHearts();
                    
    
                }else{//game over
                    playing=false; //no vamos a jugar más
                    $("#startreset").html("Iniciar juego"); //cambiamos el boton a Iniciar juego
                    $("#gameover").show();
                    $("#gameover").html('<p> Game over!!</p><p> Su puntaje es ' + score + '</p>');
                    $("#trialsLeft").hide();
                    stopAction();
                    
                }
           }
        
        
    },10);
    
}

//generar una fruta randomica
function chooseFruit(){
    
    $("#fruit1").attr('src', 'images/' + fruits[Math.round(9*Math.random())] +'.png');
    
}

    //detener fruta
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});