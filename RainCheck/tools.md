# Tools and Code

All of the python code that I have written is documented here. All of the files are copiously commented, but more general information is laid out here.

## live.py

This program displays a live view of the data coming from the kernel. It displays what the phone thinks are touch points (in red) and touch points that have been processed with my algorithms (in green) on top of the capacitance matrix data.

### Usage

python live.py

## record.py

This program will record touch point data coming from the phone's kernel, encode it as a JSON string, and store it as a file in the DataFiles directory.

### Usage

python record.py [filename]

## play.py

This program will play any of the files created by record.py.


### Usage

python play.py [filename, all] [slow, medium, fast]

The first argument specified the file to playback, or all. All will play every file in the DataFiles directory. The second argument specified the speed with which the file should be played back.

## data.py

This program is a module, to be used by other programs and not run form the command line. It is responsible for getting data from the phone's /proc files over adb and formatting this data.

### Public Functions

	//gets the data from the phone and stores the unformatted data in a local variable.
	FetchData()

	//formats and return the matrix data. The data will be formatted as a 2D array. 
	GetMatrixData()

	//formats and returns the points data. The data will be formatted as a 2D array.
	GetPointsData()

## viewframe.py

Used to view and render a specific frame from any file.

### Usage

python viewframe.py [Filename] [Frame]

## rendering.py

This module used the graphics.py library to draw the capacitance matrix. It can also draw touch points, and highlight certain rows of the drawn capacitance matrix in red.

### Public Functions

	Update(MatrixData, TouchPointData, OptimizedTouchPointData, OutlineData, DrawOnChange);

Updates the data in the graphics window.

MatrixData: 2D array of capacitance values. Values should each be from -255 to 255.
TouchPointData: array of touch point arrays to be drawn in red.
OptimizedTouchPointData: array of touch point arrays to be drawn in green.
OutlineData: an array of numbers that indicated whether an outline should be drawn on this row or not. A value of 0 draws no outline, 1 draws one. An empty array disables outlines. 
DrawOnChange: bool that indicated whether all of the squares should be updated each frame, or if they should just be updated when they change. 

	Reset();

Restarts the graphics window.