# Getting the Phone's Capacitance Values

## First Modification
The kernel input drivers reside in the android/system/kernel/lge/drivers/input folder. Most of these are loadable kernel modules that will be automatically loaded when different devices are present. The file we are concerned with is the one called touch_synaptics_ds5.c. This file contains the code that communicates with the touch screen controller over the I2C bus. 

This kernel module can log debugging information with the command TOUCH_INFO_MSG(). This command has the same syntax as the standard C print command. The synaptics_ts_get_data function is what we're going to be most concerned with. This is where commands are sent over the I2C bus and where their responses are read. This function is called whenever a touch event is triggered (like a finger moving on the touchscreen). Put the following line at the beginning of the function, but after the variables of course (in C variable declarations precede code). 

	TOUCH_INFO_MSG("Hello World!!!");

Now recompile the kernel. Now "Hello World!!!" will be written to the kernel logs every time you move your finger on the touchscreen. To view the touch logs, use the following command:

	adb shell dmesg | grep - i touch

Calling dmesg over adb gets all of the logs, and the grep command filters out anything that doesn't have the word touch in it.

## Reading Function 54 Data
Function 54 is a secret command you can send over I2C which has no documentation on the official synaptics specification. To learn about how I2C communication with the touch screen controller works, read the [Synaptics RMI4 Specification](http://www.synaptics.com/sites/default/files/511-000136-01-Rev-E-RMI4-Interfacing-Guide.pdf, "Synaptics RMI4 Specification"). Understanding these concepts is very important if you want to be able to get the raw capacitance data.

We will get the electrode dimensions from function 54. To do this, create a new function called get_electrode_dimensions, and put the following code in it:

	//setup the data
	char buffer[2];
	int PageSelectRegister = 0xFF; 
	int QueryRegister = 0x46;

	//switch to page 1
	touch_i2c_write_byte(client, PageSelectRegister, 1);

	//put the locations in buffer
	touch_i2c_read(client, QueryRegister,
			2,
			buffer);

	//write out the buffer to the screen
	TOUCH_INFO_MSG("RX: %i, TX: %i", buffer[0], buffer[1]); 

	//go back to page 0 so that touch works!
	touch_i2c_write_byte(client, PageSelectRegister, 0); 

The program begins by switching to page 1, because different functions are located in different pages. Function 54 is located on page 1. The program then reads from the QueryRegister. Each function has different registers, all of which provide different data. The bytes in a function's query register usually provide data about the sensor. Then we switch back to page 0, because this is the page the program was on before we interrupted it.

To run this code, call get_electrode_dimensions from the synaptics_ts_get_data function. When you download this kernel and look at the logs, you should see the output:

	RX: 20, TX: 32

### Errors

#### Making Sure that you have Function 54

If this didn't work for you, most likely the register addresses are different for your phone. It is also possible that your touch screen controller doesn't support function 54. You need to read the function descriptions to learn if your register addresses are different or you don't have function 54. Copy and past the following code into the top of your synaptics_ts_get_data program. 

	//setup the data
	char buffer[1];
	char standardlocation[1]; 
	int PageSelectRegister = 0xFF; 
	int StartRegister = 0xEF - 1;
	int Offset = 0;
	int Page = 0;

	restart:

	//select the page
	touch_i2c_write_byte(client, PageSelectRegister, Page);

	//write the page down
	TOUCH_INFO_MSG("***page %i***", Page);

	//read if the page select is in the standard location
	touch_i2c_read(client, 0xEF,
			1,
			standardlocation);
	//write the page select location
	TOUCH_INFO_MSG("standard location: %i\n", standardlocation[0]);

	top:

	//read the function name into memory
	touch_i2c_read(client, StartRegister + Offset,
			1,
			buffer);
	
	//if the function was not 0, log it and restart
	if(buffer[0] != 0 && Offset > -100)
	{
		//write the offset and the functions there
		TOUCH_INFO_MSG("at offset %i function %i declared\n", Offset, buffer[0]);

		//reduce the offset
		Offset -= 6;
		goto top; 	
	}
	else if(Page == 256)
	{
		//we're done
		TOUCH_INFO_MSG("***done***");
	} 
	else
	{
		//increment the page
		Page += 1;

		//reset offset for the new page
		Offset = 0;
		
		//restart
		goto restart;
	}

This code cycles through the function description register on each page. The code will output each function and the register that it is in to the kernel logs. If there is no function 54, you can't get the raw capacitance value on your phone.

#### Finding the Register Locations

If you have function 54 but the registers are still not working, try inserting this into the beginning of the synaptics_ts_get_data function.

	//setup the data
	char buffer[6];
	int PageSelectRegister = 0xFF; 

	//the count actually goes backwards.
	//the location of the function name register of 0xEF - 1
	int FunctionRegister = 0xEF - 1 - 5;

	//switch to page 1
	touch_i2c_write_byte(client, PageSelectRegister, 1);

	//put the locations in buffer
	touch_i2c_read(client, FunctionRegister,
			6,
			buffer);

	//write out the buffer to the screen
	TOUCH_INFO_MSG("Function %i: %i Interrupts. Data Register: %i. Control Register: %i. Command Register: %i. Query Register: %i.", buffer[5], buffer[4], buffer[3], buffer[2], buffer[1], buffer[0]); 

	//go back to page 0 so that touch works!
	touch_i2c_write_byte(client, PageSelectRegister, 0); 

This code will output the register locations for function 54. If the query register location isn't 70, the register locations are different. This just means that you will have to substitute your different register locations in for the ones I use in the duration of the tutorial.

## Reading the Raw Capacitance Data

To read the raw capacitance data from the phone, you just need to issue a series of commands like the one we just issued. All of these command are issued to different registers, whose locations need to be defined. Paste the following code at the beginning of the file. If your register locations were different for function 54, change these.


	//define these for everyone
	#define TX 27
	#define RX 15
	#define REPORT_TYPE 2
	#define DATA_POINTS (RX * TX * 2)

	#define F55_BASE_CONTROL 0
	#define PAGE_SELECT_REGISTER 0xFF
	#define INDEX_OFFSET 1
	#define DATA_OFFSET 3
	#define GET_REPORT_COMMAND 1

	//these are the values that some of you need to change
	#define F54_DATA_REGISTER 0x00
	#define F54_COMMAND_REGISTER 0x45
	#define F54_QUERY_REGISTER 0x46

	//this is the global client variable
	struct i2c_client *test_reporting_client;
	char DataBuffer[DATA_POINTS];
	char StringBuffer[(RX * TX * 7)];

Then create this function. Place it just above the synaptics_ts_get_data function. 

	static void get_image_data(void)
	{
		int Return = 0;
		//this is the max size, it may be smaller but not bigger
		unsigned char report_index[2];
		
		//setup report type
		unsigned char ReportType = REPORT_TYPE;

		//set the report index
		report_index[0] = 0;
		report_index[1] = 0;

		//switch to page 1
		touch_i2c_write_byte(test_reporting_client, PAGE_SELECT_REGISTER, 1);

		//write the report index
		Return += touch_i2c_write(test_reporting_client, F54_DATA_REGISTER + INDEX_OFFSET, sizeof(report_index), report_index);

		//write the report type
		Return += touch_i2c_write_byte(test_reporting_client, F54_DATA_REGISTER, ReportType);

		//write the get report command
		Return += touch_i2c_write_byte(test_reporting_client, F54_COMMAND_REGISTER, GET_REPORT_COMMAND);
		
		//read the data from the data register
		Return += touch_i2c_read(test_reporting_client, F54_DATA_REGISTER + DATA_OFFSET,
				DATA_POINTS,
				DataBuffer);

		if(Return != 0)
		{
			TOUCH_INFO_MSG("Error with I2C");
		}

		//switch to page 0
		touch_i2c_write_byte(test_reporting_client, PAGE_SELECT_REGISTER, 1);
	}

This function just gets the data. It sets the report index to 0, sets the report type to 2, and then issues the get report command. The function then reads the data into the DataBuffer array. To make the function work, add the following lines to the beginning of the synaptics_ts_get_data function:
	
	test_reporting_client = client;
	get_image_data();

The first line sets a global variable which allows you to write to the I2C bus. The second line calls the get_image_data function.

Now compile the kernel. Nothing will really happen yet. The report is being read, but there is no way to output it yet. 

### Printing the Raw Capacitance Data

To print the report, the data stored in the DataBuffer needs to be converted into a string and printed to the screen. This can be done with the print_image_report function, which is listed below. Copy this function into a position above the get_image_data function. 

	static void print_image_report(void)
	{
		//store the front location of the data buffer as a short
		short *Data = (short*)DataBuffer;

		unsigned int Position = 1;
		int i;
		short TempShort;
		char TempString[8];
		int StringLength;

		StringBuffer[0] = '[';

		// - (RX * 3) makes three less rows of RX happen here too
		for (i = 0; i < (RX * TX); i++) 
		{
			TempShort = *Data;
			
			sprintf(TempString, "%i,", TempShort);
			
			StringLength = strlen(TempString);
			
			//add the string to the master array
			strncpy(StringBuffer + Position, TempString, StringLength); 
			
			//increment the position in the string by the StringLength
			Position += StringLength;

			//increment the pointer by one short
			Data++;
		}
		
		//end the string
		StringBuffer[Position] = ']';
		StringBuffer[Position + 1] = '\0';

		TOUCH_INFO_MSG("%s", StringBuffer);
	}

Now call the print_image_report function at the end of the get_image_data function. All the print_image_report function does is convert the data, which is stored as a char array, to a string of comma separated values. Because this is C, it takes a lot of code ;).

Once you compile the kernel and view the touch-logs, you should see the capacitance matrix every time you touch the phone's screen. At this point, the values seem a bit messy. But if you build a tool to visualize them, you will see the touches clearly. The top part of the screen contains some very high values (in the 2000's range) which seem out of place. These can be filtered out by not looking at every frame. Some frames lack these 'noise' values and can be trusted. On my device, the top 3 rows of data were completely unusable. This was annoying but hardly mattered in the grand scheme of things. Since function 54 is entirely undocumented, some of its nuances still remain to be discovered. 