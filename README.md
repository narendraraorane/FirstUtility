First-Utility Coding Task - Senior Software Engineer
======================================================

This project/app is cross platform app which can run on android and ios.

It fetch data from Marvel public API and shows in listview format. In order to fetch creators info, you need to signup on Marvel. Once you signed in, you will get public key and private key. You have to use this keys while fetching data through REST API. [Here](https://developer.marvel.com/documentation/getting_started) is am example of how to call REST API.

Note - Please don't share your private key with anyone.

## iPhone

![](First-Utility-iPhone.gif)

## iPad

![](First-Utility-iPad.gif)

## Android phone

![](First-Utility-AndroidPhone.gif)

## Android tablet

![](https://imgflip.com/gif/1kv377.gif)

## Features of the app   

* To store data locally model has been used. This project has implemented model-view binding. Formated data throgh dataTransform function of model. moment.js is used to show relative time.

* It has custom search feature to filter data as per your requirement. To create search bar icons, unicode are used instead of images by keeping in mind UI rendring time.

* Tried to achieve alomst similar UI for Andorid and iOS.

* Zoomout animation on click of display letter.

* Unit testing using ti-mocha framework

* Documented source code using Ti-JSDuck

## Requirements   

* iOS 9.3 or later
* Xcode 7.3.1 or higher
* Appc SDK 5.5.1.GA or higher
* Appc CLI 
* Andorid 4.4.0 or higher
* Marvel publci and private keys
* Ti-mocha framework
* Ti-JSDuck framework

## Installation

* You need to download repository from github.
* Import into you appc workspace.
* Run the project.

### Clone the repository
git clone https://github.com/narendraraorane/firstutility

### How does it work? ###

* It checks whther data is present locally or not through length of colletion.
* Based on length, it make decision to call REST API or not.
* Once data is arrived (either thorugh REST API or through Model), it shows in listview format.
* While rendering, it addes few extra proeprties to model which is used in UI.

### Author

### Narendra Raorane ###
------------------------

### References ###

* http://www.tidev.io/2014/05/14/duckumentation/

* http://tonylukasavage.com/ti-mocha/

* http://tonylukasavage.com/blog/2014/01/13/ti-mocha-mocha-testing-support-for-titanium/

* https://gist.github.com/lbrenman/0c18239184cec1c8c74b

* http://titaniumninja.com/testing-titanium-mobile-applications-with-jasmine-and-sinon-part-i/

* https://github.com/denvers/unit-test-titanium-alloy-project

* http://www.innovapptive.com/blog/alloy-model-view-binding/

* http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Data_Binding
