//setup canvas
CanvasPointer = document.getElementById("myCanvas");
Canvas = CanvasPointer.getContext("2d");

// globals
var Sum = 0;
var PastPosition = 0;
var Ball = {"Position": 15.0, "Speed": 0.0, "Acceleration": 0.0};
var Time = 0;
var FirstStartup = true;
var ErrorMagnitude = 0;
var SystematicError = 1;

var PConstant = 1; //make it positive and large
var IConstant = -.1; //make it negative and small
var DConstant = -1; //make it negitive and large

//resize the canvas when the window size changes and on load
(function($, viewport)
{
    $(window).bind('resize load', function() 
    {
        viewport.changed(function()
        {
        	console.log("Resize");
            if(viewport.is('xs')) 
            {
                //update the canvas width
				Canvas.canvas.width  = window.innerWidth - 75;
			  	Canvas.canvas.height = 400;
            }
            else
            {
				//update the canvas width
				Canvas.canvas.width  = window.innerWidth / 2 - 40;
			  	Canvas.canvas.height = 400;
            }
        });
    });

})(jQuery, ResponsiveBootstrapToolkit);


function Start()
{
	//reset stuff
	Time = 0;
	Sum = 0;
	Ball = {"Position": 10.0, "Speed": -20.0, "Acceleration": 0.0};
	PastPosition = 0;
	Canvas.clearRect(0, 0, CanvasPointer.width, CanvasPointer.height);

	// get constants from text boxes
    PConstant = $("#P").val();
    IConstant = $("#I").val();
    DConstant = $("#D").val();

    //make sure all the content was filled out
	if(PConstant == "" || IConstant == "" || DConstant == "")
    {
    	alert("Please fill out all of the required fields.");
    	return;
    }

	if(FirstStartup)
	{
		// sets the update event caller
		setInterval(Update, 20);
		setInterval(Randomize, 100);
	}

    //draw the initial line
    DrawLine(-CanvasPointer.width / 2, 100, CanvasPointer.width / 2, 100);

    ErrorMagnitude = $("#ErrorMagnitude").val();
    SystematicError = $("#SystematicError").val() / 10;

    FirstStartup = false;
}

$(document).ready(function()
{
	console.log("set mag");
	$("#ErrorMagnitudeNumber").html($("#ErrorMagnitude").val());
	$("#SystematicErrorNumber").html($("#SystematicError").val() / 10);

	$("#SystematicError").change(function(){
		$("#SystematicErrorNumber").html($("#SystematicError").val() / 10);
	});

	$("#ErrorMagnitude").change(function(){
		$("#ErrorMagnitudeNumber").html($("#ErrorMagnitude").val());
	});
});



function PID(CurrentPosition, TargetPosition)
{
	// difference between current and correct
	var P = TargetPosition - CurrentPosition;

	// sum of the historic error
	var I = Sum;

	// current slope (want it to be 0)
	var D = (CurrentPosition - PastPosition) / .020;

	// calculates stuff for the algorithm in the future
	Sum += (CurrentPosition - TargetPosition) * .020;
	PastPosition = CurrentPosition;

	// changes the acceleartion based on the equation
	var Acceleration = P * PConstant + I * IConstant + D * DConstant;
	Ball["Acceleration"] = Acceleration;
}

// function to draw a ball
function DrawCircle(X, Y, Radius)
{
	//this part converts X and Y to canvas coordinates
	X += CanvasPointer.width / 2;
	Y = -Y + CanvasPointer.height / 2;

	//this part draws the circle
    Canvas.fillStyle = 'blue';
    Canvas.beginPath();
    Canvas.arc(X, Y,Radius, 0, Math.PI * 2, true);
    Canvas.fill();
}

function DrawLine(XOne, YOne, XTwo, YTwo)
{
	XOne += CanvasPointer.width / 2;
	YOne = -YOne + CanvasPointer.height / 2;

	XTwo += CanvasPointer.width / 2;
	YTwo = -YTwo + CanvasPointer.height / 2;

    Canvas.beginPath();
    Canvas.moveTo(XOne, YOne);
    Canvas.lineTo(XTwo, YTwo);
    Canvas.stroke();
}


// updates simulation
function Update()
{
	// clear canvas
	Canvas.clearRect(0, CanvasPointer.height / 2 - 10, CanvasPointer.width, 20);

	//draw line
	DrawLine(0, 15, 0, -15);

	// draw circle
	DrawCircle(Ball["Position"], 0, 10);

	// calculate ball position
	Ball["Position"] += Ball["Speed"] * .020;
	Ball["Speed"] += Ball["Acceleration"] * .020;

	//increment the time
	Time += 20;

	//graph the stuff
	DrawCircle(Time / 100 - CanvasPointer.width / 2, Ball["Position"] + 100, 1)

	//use the PID
	PID(Ball["Position"], 0);
}

function Randomize()
{
	//we gotta randomize some of it to make it more lifelike
	Ball["Speed"] += (Math.random() - SystematicError -.5) * ErrorMagnitude;
}