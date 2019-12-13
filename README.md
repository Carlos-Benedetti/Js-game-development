# Game Development in TS/JS
I started this project as a means to learn how to apply clean code in the right way.
## methods:
i'm using typescript since the whole point was to use a type oriented language, applying object oriented programming. all objects extends of a generic object, that implements an interface,focusing on code reuse.

For the interface i opted to use [Electron](https://electronjs.org/), just to test the framework, after i discovered that
<img title="discord" src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-01.png" height="30"> and
<img title="Visual Studio Code" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Visual_Studio_Code_1.18_icon.svg/64px-Visual_Studio_Code_1.18_icon.svg.png" height="30"> both use it, and it  permits me to easily use npm modules in a browser.

And drawing the game screen in an HTML5 Canva.
## What i wanted to learn
 - Develop an Electron app
 - When and how to use Generic classes
 - When to use Interfaces
 - Applying modular programing 
# Objectives:
Replicate basic games like:
 - Snake 
 - ![snake](https://www.coolmathgames.com/sites/cmatgame/files/snake.png) 
 - Asteroids 
 - ![Asteroids](https://i.pinimg.com/originals/81/32/d5/8132d5799c51b28a841063f5339b5844.jpg).
 *PS: not my version, i'm still working on it*

Creating the games code in classes that extends the generics, making the generics capable of generating criantions tools for all kind os 2d games trying to not add too much additional code. i'm trying to not reinvent the wheel, it's not gonna be an game engine, i'm just testing how long it takes for me to generate a mini SKD.

# install
### pre-requirements:
- node
- git
- typescript

### clone the project 
```bash
git clone git@github.com:Carlos-Benedetti/Js-game-development.git
cd Js-game-development
```
### install it
```bash
 npm i
 ```
### run it 
```bash
 npm start 
 ```
then just click a canvas to start playing
## develop 
### start typescript 
```bash
 tsc
 ```
### run electron in another console
```bash
 npm start
 ```
the ts code can be found in the src folder.

if you have any tips/advices/correction feel free to send a pull request or a issue,or if you wanna talk about it just contact me at [cbjrcadu@gmail.com](mailto:cbjrcadu@gmail.com)
