function ToggleModal() 
{
	document.getElementById("modaloverlay").className += "active";
	document.getElementById("modalbackground").className += "active";
}
function Load()
{
	ToggleModal();
}

function AlertMessage()
{
	alert("Welcome!");
}
