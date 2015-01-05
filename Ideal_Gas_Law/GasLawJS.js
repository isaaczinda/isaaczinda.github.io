function SetToDefault()
{

	//0.443
	document. getElementById ('Moles'). value = "0.443";
	document. getElementById ('Degrees'). value = "65";
	document. getElementById ('Volume'). value = "1";
	document. getElementById ('Constant'). value = "8.3144";
	Calculate();
}
function LoadContent()
{
	SetToDefault();
	Calculate();
}
function Calculate()
{
	var Moles = document.getElementById('Moles').value;
	var Volume = document.getElementById('Volume').value;
	var Degrees = document.getElementById('Degrees').value;
	var GasConstant = document.getElementById('Constant').value;
	var Kelvin = (Degrees - 32) * (5/9) + 273;
	var Pascal = (Moles / Volume) * (GasConstant * Kelvin);
	var PSI = 0.000145037738 * Pascal;
	$("#Pressure").text("Pressure = " + PSI);
}
