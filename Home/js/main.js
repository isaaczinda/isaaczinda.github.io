function ImageHeight(URL)
{
	var image = new Image();
	image.src = URL;
	return image.height;
}

function ImageWidth(URL)
{
	var image = new Image();
	image.src = URL;
	return image.width;
}

$(document).ready(function(){
	for(var i = 0; i <= 22; i++)
	{
		//left is as a percent
		var Left = (i % 5) * 20;
		//top as a pixel value
		var Top = (i - (i % 5)) / 5 * 300;

		//resize the image based on its dimensions
		originalHeight = ImageHeight("img/" + i + ".jpg");
		originalWidth = ImageWidth("img/" + i + ".jpg");;
		var SizeClass = "";
		if(originalHeight / originalWidth > 1.5)
		{
			SizeClass = "tall";
		}
		else if(originalWidth / originalHeight < 1.5)
		{
			SizeClass = "wide";
		}
		else
		{
			SizeClass = "normal";
		}

		$("body").append("<img class = '" + SizeClass +"' style = 'Left:" + Left + "%; Top:" + Top + "px' src = 'img/" + i + ".jpg'/>");
	}
});