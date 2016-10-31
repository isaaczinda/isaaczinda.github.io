# Tools and Code

All of the files related to RainCheck are located in [the project's git repository](https://github.com/isaaczinda/RainCheck "RainCheck git Repository"). If you have followed all of the steps in the building the kernel and getting the capacitance matrix sections, you should be able to use my modified touch driver, located in the git repository in the Kernel folder. To use it, just replace the kernel's touch_synaptics_ds5.c file with my touch_synaptics_ds5.c file.

My version of the synaptics_ds5.c file is not described below because it is so copiously commented. My modifications to this file are on lines 813 - 1183, 2146 - 2152, 2403 - 2454, 2457, 2458, and 2465 - 2470.

Once you built and flashed the new kernel, you can use my python scripts to get the capacitance data from it. These scripts are in the Python folder of the git repository. Running live.py will display a live rendering of the capacitance matrix.

In order to develop more with my codebase, you may want to learn more about its nuances. All of the python files that I have written and descriptions of the their usage are listed below. These files are used to record and analyze the raw capacitance matrix.  

## live.py

This program displays a live view of the data coming from the kernel. It displays what the phone thinks the touch points are on top of the capacitance matrix data. To run the program use the command below.

	python live.py

## record.py

This program will record touch point data coming from the phone's kernel, encode it as a JSON string, and store it as a file in the DataFiles directory. To run the program use the command below, specifying the name of the file to save the recording to.

	python record.py [filename]

## play.py

This program will play any of the files created by record.py. Run it with the command below. The first argument specifies the file to playback; this can be a specific file or all files.  The second argument specifies the speed with which the file should be played back.

	python play.py [filename, all] [slow, medium, fast]

## data.py

This program is a module, to be used by other programs and not run from the command line. It is responsible for getting capacitance data from the phone's /proc files via adb and formatting this data. Its functions are listed below.

	FetchData()

Gets the unformatted capacitance data from the phone and stores it. This function has no returns.

	GetMatrixData()

Formats and return the capacitance data matrix. The data will be formatted as a 2D array. 

	GetPointsData()

Formats and returns the touch points data. The data will be formatted as a 2D array.

## viewframe.py

This program is used to view and render a specific frame from any file saved with record.py. The program's usage is shown below. The Filename argument is the name of the file to be searched. The Frame argument is the frame within the file to be played.

	python viewframe.py [Filename] [Frame]

## rendering.py

This module uses the graphics.py library to draw the capacitance matrix. It can also draw touch points, and highlight certain rows of the drawn capacitance matrix in red. It has a few public functions, which are shown below.

	Update(MatrixData, TouchPointData, OptimizedTouchPointData, OutlineData, DrawOnChange);

Updates the data in the graphics window and initializes it if necessary. MatrixData is a 2D array of capacitance values. Each individual value should each be from -255 to 255. TouchPointData is an array of touch point arrays to be drawn in red. OptimizedTouchPointData is an array of touch point arrays to be drawn in green. OutlineData is an array of numbers that indicated whether an outline should be drawn on this row or not. A value of 0 draws no outline, 1 draws one. An empty array disables outlines. DrawOnChange is a bool that indicated whether all of the squares should be updated each frame, or if they should just be updated when they change. 

	Reset();

Restarts and clears the graphics window.