---
layout: post
title: Character Recognition Neural Network
category: other
---

## Approach and Engine Specifics

I began the project by building a hidden-layer neural network engine from scratch. The engine that I created supports any number of input nodes, hidden layer nodes, and output nodes. The engine inputs data into the network, checks the error, and uses this to backpropagate. Once you have trained a network, the engine can save it as a JSON file so that it can be loaded later. The entire project was written in python for speed and readability, and as a result some performance compromises were made; it takes a few days for this network to train on very large data sets.

## Character Recognition

I used my engine to create a program capable of recognizing handwritten characters. To collect data for training, I drew letters via a python program, which compressed them to 10x16 images and automatically saved them to their correct folder. All in all, I collected 30-50 samples for each letter -- over 1000 images in all. The network itself has 160 input nodes, 20 hidden layer nodes, and 26 outputs (one for each character). After training the network and reducing the error as much as possible, it was able to identify letters correctly a large majority of the time.

## Examples

Here are some examples of letters identified by my neural network. The blue writing on the right -- the network's output -- shows which letters are the best matches. The decimal number is the likelihood from 0 to 1 (one being highest) that the letter is a match.

![example character recognition]({{base}}/img/neural-network.jpg "example character recognition")

## Download / Program Usage

To run this neural network for yourself, you need to download some software. You need to install [python version 2.78](https://www.python.org/download/releases/2.7.8/ "python download link") (other versions may work but I haven't checked) and [PIL Version 1.1.7](http://www.pythonware.com/products/pil/ "PIL download link"). I recommend using windows to run my neural network, but in any operating system *should* work.  

To download the program, unzip [this file]({{base}}/downloads/character-recognition-neural-network.zip "zipped neural network files") somewhere on your computer. Open a terminal, enter this folder, and you're ready to go! To draw a letter and see what the neural network's thinks it is, type the following command:

	python DrawLetters.py analyze [letter]

The [letter] argument is the letter you are about to type. The neural network **does not** look at this -- it is only there so that if the network incorrectly identifies the letter it can add to its training samples. Additionally, you should only write lowercase letters because these are all the network has been trained on.

If you want to retrain the network, you can delete the images located in the 'Letters' folder and add new ones with my python script. The following command will prompt you to draw a specified number of letters for each letter in the alphabet.

	python DrawLetters.py alphabet [number of letters to draw]

You can also use this command to save drawings of a specific letter:

	python DrawLetters.py series [letter] [number of letters to draw]

Once you have updated the training data to your liking, you will have to retrain the network with the following command. The training process will take quite a long time -- maybe a few days. However, after training has finished, the new network will automatically be used from then on. Here is the command to retrain the network:

	python Network.py

If you have any questions about specifics, feel free to shoot me an email.
