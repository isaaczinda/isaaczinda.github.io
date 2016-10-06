---
layout: default
title: Work Experience
---

## Software Developer Intern, Microsoft Research
**Spring 2016**

At Microsoft Research, I worked with my mentor Ashish Kapoor to test a high-altitude wind model called WindFlow that is generated from real-time data from planes. This new set of wind predictions serves as an alternative to the predictions made by NOAA (the National Oceanic and Atmospheric Administration). I personally wrote code in C# to stream plane position data from the FAA and make flight-time predictions with WindFlow using this data.

A client of Microsoft Research requested an analysis of WindFlow's accuracy contrasted with the NOAA predictions. Building on my earlier work, I wrote python scripts to assess the accuracy of predictions made with WindFlow and NOAA for over 800 flights. Using data science, I found that Windflow has a statistically significant advantage.I presented these findings to our client alongside my mentor Ashish and Head of Microsoft Research Eric Horowitz.

Our client was impressed with these results, and requested a way of accessing the WindFlow model, so I began working on a way for them to access the data. I wrote server-side code in C# to download data from the FAA, generate the appropriate models, and serve these models. My code also continued testing the models automatically, so that WindFlow's parameters could be continually improved. My original codebase has been built upon, and is currently being used to provide Microsoft's clients with access to the WindFlow model.

## Research Intern, University of Washington
**Summer 2015**

While interning at the University of Washington's Ubiquitous Computing Lab, I worked individually on a project called RainCheck. RainCheck makes it easy to use your phone in the rain and with wet hands. Instead of just looking at the touch points that the phone's touchscreen controller generates, RainCheck looks at the phone's raw capacitance values. These values can be requested from touch screen controller with a series of I2C commands. It then uses various heuristics to discern the difference between a water droplet and someone's finger. In order to get access to this kind of low-level data, I wrote a modified kernel module in C for the Nexus 5 smartphone. The process of building a custom kernel -- as well as a live demo of RainCheck -- is available [here](https://ubicomplab.cs.washington.edu/raincheck/).
