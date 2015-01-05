var CurrentPage = "Home";

function ElementSelection()
{
	var NavbarElements = $("#navbar").children();

	console.log(NavbarElements);

	for(var i = 0; i < NavbarElements.length; i += 1)
	{
		console.log(i)
		$(NavbarElements[i]).mouseover(NavbarElements[i], function(e)
		{
			console.log($(e.data).html())
		  	$(e.data).addClass("active");
		});

		$(NavbarElements[i]).mouseleave(NavbarElements[i], function(e)
		{
		  	$(e.data).removeClass("active");
		});
	}
}

function HideAllPages()
{
	var NavbarElements = $("#Content").children();

	for(var i = 0; i < NavbarElements.length; i += 1)
	{
		$(NavbarElements[i]).hide();
	}
}

function RemoveCurrentFromOtherPages()
{
	var NavbarElements = $("#navbar li");

	for(var i = 0; i < NavbarElements.length; i += 1)
	{
		$(NavbarElements[i]).removeClass("Current")
	}
}

function LoadPage(Page, Element)
{
	console.log("Load: " + Page)

	// add and remove the current class
	RemoveCurrentFromOtherPages();
	$(Element).addClass("Current");

	$("#" + CurrentPage).hide("fast", function()
	{
		$("#" + Page).show("fast", function()
		{
			CurrentPage = Page;
		});
	});
}

$(document).ready(function()
{
	console.log("Running");
	ElementSelection();
	HideAllPages();
	LoadPage("Home", $("#navbar li")[0]);
});