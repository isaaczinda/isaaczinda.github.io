function LoadContent()
{
	GettinSwole();
}

function GettinSwole()
{
	HideAll();
	$("#GettinSwole").show();
	$("#GettinSwoleMenu").addClass("active");
}
function CardioKillsGains()
{
	HideAll();
	$("#CardioKillsGains").show();
	$("#CardioKillsGainsMenu").addClass("active");
}
function EatinRight()
{
	HideAll();
	$("#EatinRight").show();
	$("#EatinRightMenu").addClass("active");
}

function HideAll()
{
	$("#EatinRight").hide();
	$("#CardioKillsGains").hide();
	$("#GettinSwole").hide();

	$("#EatinRightMenu").removeClass("active");
	$("#CardioKillsGainsMenu").removeClass("active");
	$("#GettinSwoleMenu").removeClass("active");
}