var numColors = 6;
var colors = generateRandomColors(numColors);

var squares = document.querySelectorAll("div.colors button");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");

var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#restart");
var modes = document.querySelectorAll(".mode");

var h1 = document.querySelector("h1");
var h2 = document.querySelector("h2");
var body = document.querySelector("body");

var easy = document.querySelector("#easy");
var medium = document.querySelector("#medium");
var hard = document.querySelector("#hard");

init();

function init(){
	initButtons();
	initColors();
	reset();
}

function initButtons(){

	for (var i = 0; i < modes.length; i++)
	{
		console.log(i);
		modes[i].addEventListener("click", function(){
			for (var j = 0; j < modes.length; j++)
			{
				modes[j].classList.remove("current");
			}
			this.classList.add("current");
			switch(this.textContent) {
				case "Easy":
					numColors = 3;
					break;
				case "Medium":
					numColors = 6;
					break;
				case "Hard":
					numColors = 9;
					break;
				default:
					numColors = 5;
			}
			reset();
		})
	}

	resetButton.addEventListener("click", function(){
		reset();
	})
}

function initColors(){

	for(var i = 0; i < squares.length; i++) {

		squares[i].addEventListener("click", function(){
			// compares clicked color to correct color
			var clickedColor = this.style.backgroundColor;

			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				// changes all squares to the correct color
				changeColors(pickedColor);
				body.style.backgroundColor = pickedColor;
				h1.style.backgroundColor = pickedColor;
				h2.style.backgroundColor = pickedColor;
			}
			else {
				messageDisplay.textContent = "Try again!";
				this.style.backgroundColor = body.style.backgroundColor;
			}
		})
	}

}

function changeColors(color) {
	// loop through all squares
	for (var i = 0; i < numColors; i++)
	{
		squares[i].style.backgroundColor = color;
	}
	// change each color to match given color
}

function pickColor() {
	var randNum = Math.floor(Math.random() * numColors);
	return colors[randNum];
}

function generateRandomColors(num){

	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}

function randomColor() {
	var r = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var color = "rgb(" + r + ", " + g + ", " + b + ")";
	return color;
}

function reset() {
	//generates new colors
	colors = generateRandomColors(numColors);
	pickedColor = pickColor();

	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	colorDisplay.style.color = "white";

	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
		if (i < numColors) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		}
		else {
			squares[i].style.display = "none";
		}
	}

	//h1.style.backgroundColor = "navy";
	//h2.style.backgroundColor = "navy";
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";

}