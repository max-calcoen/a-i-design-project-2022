# **Pokémon Green & Gold User Guide**

05.18.2022

Everett Villiger, Benjamin Wang, Maximilian Calcoen

Algorithms and the Internet 2022

Head-Royce School, Oakland, CA

**Table Of Contents:**

* Introduction
* Prerequisites
* Running the Game
* Playing the Game
* Tools Used

## Introduction

Pokémon Green and Gold is a 2d game based on the original Pokémon game, Pokémon Red and Blue. This game has multiple features, most prominently the database- you can play offline while saving your progress across multiple sessions. Everything that you do will be saved so you can come back to it another time. Pokémon Green and Gold also has an open-world tile-map that you can move around in and find wild Pokémon to catch or fight with.

## Prerequisites

In order to play Pokémon Green and Gold, you will have to have the following:



* Visual Studio Code installed on your computer
* Firefox or Chrome browser
* Have Javascript enabled on your computer
* The official Pokémon_Green_&_Gold.zip file

### Installing Visual Studio Code:

In order to run the program, you must have the latest version of Visual Studio Code  installed on your computer. You can download the latest version of this application at: [https://code.visualstudio.com/](https://code.visualstudio.com/). First you will need to choose the little down arrow next to the download button in order to choose your operating system.  Once you choose your operating system, you can download the file using the download button. Once you have finished downloading the file, open it and follow the steps in the Setup Wizard to finish installing.

## Running the Game

Now that you have finished installing Visual Studio Code, you are ready to start running the game! To start, you have to download the game, the file name should look like this, “Pokémon_Green_&_Gold” and it should be a folder on your computer(assuming that you got this user guide from our official zip file). After you have located the file, you should open Visual Studio Code and under the start menu, click on open (or press Command + O or Control + O).


Once you click the open button, you should navigate to the “Pokémon_Green_&_Gold” folder, click on it, then press open in the bottom right of the window. Now the project should be open in Visual Studio Code.

From here you should right click on the server.js file and click on the “Open in integrated terminal” option. The integrated terminal should open at the bottom of your window, click on it. At this point if you don't have node.js version 16.13.1 or higher installed, you will need to download that now at [https://nodejs.org/en/](https://nodejs.org/en/) (download newest version). Now that you have selected the integrated terminal, type “npm install” in the terminal area. You should now see some dependencies being installed at the bottom of your screen.

After everything is installed, you should type, “node server.js” into the terminal in order to start up the game. From there, open your browser(Firefox or Chrome) and type “[127.0.0.1:
](https://127.0.0.1:8080)” into the search bar.

*Congratulations, you have successfully started the game!*

## Playing the Game



1. Signing Up
    * When you first open the game, You will see two options, Login, or Create Account–click Create Account
    * Now you will see a screen prompting you to input a username and password, make sure they are memorable that way you can sign in later
    * Once you put in your username and password, just click the submit button, you will be redirected to our starter Pokémon menu
2. Starter Pokémon
    * After you create your account, you will see three images of Pokémon: Bulbasaur, Squirtle, and Charmander
    * Feel free to click on any one that you would like, but be aware that you cannot revert this change, so be sure!
    * Once you click on an image, click the submit button to start playing the game!
3. Tilemap
    * The tilemap is a fairly large area, where you, the player, can move around using the W, A, S, and D keys 
    * This tilemap has sparse rocks and items that you can collect, and even rarer Pokémon spreaded throughout!
    * You can interact with these Pokémon and Items by colliding with them 
    * You can collide with these items as much as you would like- every time you run into them, you will get an item and they will not disappear
    * Colliding with a Pokémon will redirect you to the battle interface
4. Logging In
    * If you want to log back in after closing the tab, on our homepage (found at [127.0.0.1:8080](http://127.0.0.1:8080/)) you just need to select the Login button
    * Once you select it, please input your username and password which you should have set when creating an account
5. Battle Interface
    * Healing Pokémon:
        * Click on Bag
        * Click on Potions
        * Click on Use
      * Click on the Pokémon you want to heal; keep in mind the fact that you can't heal a Pokémon that is either dead or at full health
    * Catching Pokémon:
      * Click on Bag
        * Click on Pokéballs
        * Click on the ball you want to use
        * Click on Use
        * If your ball by chance manages to catch the Pokémon, it will enter your pc; keep in mind that if your pc already contains four Pokémon, you will be prompted with a menu requiring you to let a Pokémon go
    * Switching out current Pokémon
      * Click on Pokémon
      * Click on the Pokémon you want to swap out for
      * Click “send to battle” to switch; keep in mind that it uses a turn



## Tools Used



* All of the code was written in Visual Studio Code
* We used many imported modules: Node.js, Express.js, Bcrypt, Body-Parser, fs, http, package, pug, socket.io, sql.js (SQLite), pixi.js
* We also used various websites to aid us while coding
    * [http://sqlfiddle.com/](http://sqlfiddle.com/)
    * [https://inloop.github.io/sqlite-viewer/](https://inloop.github.io/sqlite-viewer/) 
    * [https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
    * [https://api.pixijs.io/@pixi/tilemap/Tilemap.html](https://api.pixijs.io/@pixi/tilemap/Tilemap.html)
    * [https://bulbapedia.bulbagarden.net/wiki/Damage](https://bulbapedia.bulbagarden.net/wiki/Damage)
    * [https://www.npmjs.com/package/bcryptjs](https://www.npmjs.com/package/bcryptjs)
* Finally we used some forums and websites as reference for our code
    * [https://stackoverflow.com](https://stackoverflow.com)
    * [https://geeksforgeeks.org](https://geeksforgeeks.org)
    * [https://github.com](https://github.com)
    * [https://w3schools.com](https://w3schools.com)
