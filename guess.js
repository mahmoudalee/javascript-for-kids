var header = document.getElementById("guessWord");
var input = document.getElementById("letters");
var btn = document.getElementById("checkBtn");
var res = document.getElementById("wrongLetters");

var secret =[];
var strikes = 0;
var wrongLetters = [];
var out = "";
var word ="";

function start() {
    input.focus();
    btn.innerHTML = "Add Word";
    res.style.margin = "30px";
    res.style.fontSize ="50px";
    input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            btn.click();
        }
    });
}
function check() {
    if(input.value == "" && strikes < 3)
    {
        res.innerHTML = "You need to enter any thing ^_^";
    }
    else if(word == null || word == ""){
        res.innerHTML = " ";
        begain();
    }else{
        if (strikes < 3 && secret.indexOf("_") >= 0) {
            if(input.value != "")
                play();
        }else{
            //play again
            gameOver();
        }
        
    }

}

function begain() {
    word = input.value
    input.value= ""
    input.placeholder ="Enter a letter . . . "
    input.maxLength=1;
    btn.innerHTML= "Guess"
    header.innerHTML = ""
    var frag = "<ul class='word'>";
    for (let i = 0; i < word.length; i++) {
        secret.push("_");
        header.innerHTML += "<li data-pos='" +  i  + "' title = ' ' class='letter'>*</li>";
    }
    frag += "</ul>";
}

function play() {
    if (word.indexOf(input.value) < 0) {
        // bad guesses
        if(wrongLetters.includes(input.value) === false){
            wrongLetters.push(input.value);
            strikes++;
        }
        input.value= "";
        input.focus();
        alert("Bad guess!");
        wrongGuesses();
    } else {
        for (i = 0; i < word.length; i++) {
          if (word[i] === input.value) {
            secret[i] = input.value;
          }
        }
        header.innerHTML = ""
        frag = "<ul class='word'>";
        for (let i = 0; i < word.length; i++) {
            if(secret[i] != "_")
                header.innerHTML += "<li data-pos='" +  i  + "' title = '*' class='letter'>"+secret[i]+"</li>";
            else
                header.innerHTML += "<li data-pos='" +  i  + "' title = ' ' class='letter'>"+secret[i]+"</li>";
        }
        frag += "</ul>";
        input.value= "";
        input.focus();

        out = secret.toString().replace(',','');
        if(out == word)
        {
            // alert("Congratulations on your win!");
            btn.innerHTML= "Restart ^_^";
            res.innerHTML = "Perfect ^_^ you win with "+strikes+"strikes";
            res.style.color =  "green";
        }
    }
}

function wrongGuesses() {
    var frag = "<ul class='wrongLetters'>";
        frag += "<p>Wrong Letters: </p>";
        for (let i = 0; i < wrongLetters.length; i++) {       
          frag += "<li>" + wrongLetters[i] + "</li>";
        }
        frag += "</ul>";
        res.innerHTML = frag;
    if (strikes >= 3){
        btn.innerHTML= "Restart ^_^";
        res.innerHTML = "Try Again  <br/> Push Enter to Restart";
        res.style.color =  "firebrick";
    }
}
function gameOver() {
    location.reload();
}