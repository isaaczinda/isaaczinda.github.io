# Building the Kernel

## Device Specifics
This entire tutorial is only applicable for the Google Nexus 5. Any other phone will not work correctly. Additionally, you really need a Linux distribution to do this (preferable Debian or Ubuntu).   

## Building CyanogenMod
It is really pointless to detail all of the intricacies of building the kernel when CyanogenMod has done such a good job. Follow [this tutorial](http://wiki.cyanogenmod.org/w/Build_for_hammerhead, How to Build CyanogenMod) to the letter and you will have built  Cyanogenmod. This process will have created a zip file, which contains the CyanogenMod operating system. If you cd to the $OUT directory, like the tutorial explains, you will find it. To actually download the operating system onto the phone, follow [this tutorial](http://wiki.cyanogenmod.org/w/Install_CM_for_maguro "How to Install CyanogenMod"). The 'Installing CyanogenMod from recovery' section is what you care about. Once you have completed this, your phone is ready for a custom kernel!

## Downloading the Kernel
To download the new kernel, there are some slight changes from building the whole operating system. Follow [this tutorial](http://wiki.cyanogenmod.org/w/Doc:_integrated_kernel_building, "Building the CyanogenMod Kernel") to build the kernel. After you have completed this process once successfully, I recommend writing a script to do it. It is lengthy and you will have to do it hundreds of times to make kernel modifications. Here is the script I wrote: (just replace [rootdirectory] with your root directory).

	cd  [rootdirectory]/android/system
	source build/envsetup.sh
	breakfast hammerhead
	mka bootimage
	adb reboot bootloader
	sleep 10
	fastboot boot [rootdirectory]/android/system/out/target/product/hammerhead/boot.img

## Next Steps
Now that you have successfully build CyanogenMod and the kernel, you are ready to start making kernel modifications. If you aren't familiar with C, try reading up a bit before you start trying to [read the capacitance values](capacitance-values.html "How to Read the Capacitance Values").