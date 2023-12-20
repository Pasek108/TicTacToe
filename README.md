# TicTacToe Readme
<details>
  <summary>❓Why the page is not loading❓</summary>
  Due to usage of Flask for multiplayer I had to use hosting with support for this technology. 
  I have no money so I used a free hosting which unfortunately puts websites to sleep. Juts wait a few minutes and it should work.
</details>
<details>
  <summary>❓Why my commits often have no names❓</summary>
  <ul>
    <li>I tend to create with bursts many things at once</li>
    <li>Sometimes I have bad internet connection and I can't send separate commits</li>
    <li>Describing commits doesn't matter when I'm coding alone</li>
  <ul>
</details>
<details>
  <summary>❓Why am I using only one branch❓</summary>
  It's for the similar reasons as with commits.  
  <ul>
    <li>I do many things at once</li>
    <li>I don't plan things ahead, I just go in and create things that seems good</li>
    <li>I'm coding alone so I know the code and there is nothing I can break</li>
  <ul>
</details>

## Table of Contents
* [Informations](#informations)
  * [Technologies](#technologies)
  * [Features](#features)
  * [Setup](#setup)
  * [Acknowledgements](#acknowledgements)
* [Details](#details)
  * [User interface](#user-interface)
  * [Project structure](#project-structure)
  * [Code organization](#code-organization)

<br>

## Informations
Three tic-tac-toe versions in two modes. Player can play vs AI, vs player locally or over the internet in real-time. <br>
See [live demo](https://tic-tac-toe-alqu.onrender.com).

> [!TIP]  
> Room for improvements:
> - In-game instruction about game modes
> - Inviting by QR code
> - Two new game modes:
>   - nested - to place a mark, player has to win a game in choosen place
>   - bigger - players have 3 sizes of marks and they can place bigger mark on any smaller mark
> - Users accounts for:
>   - stats
>   - custom mark
>   - achievements
> - Pagination, filtering and searching for rooms in multiplayer lobby

![preview](/_for_readme/preview.png)

----------------------------------

### Technologies
Languages:
- HTML5
- CSS3
- JS ES2018
- Python 3.11

Libraries and frameworks:
- [SCSS](https://sass-lang.com)
- [FontAwesome](https://fontawesome.com) 6.2.1
- [GoogleFonts](https://fonts.google.com)
- [Socekt.IO](https://socket.io) 4.6.0
- [Flask](https://flask.palletsprojects.com/en/3.0.x/)
- [Flask SocketIO](https://flask-socketio.readthedocs.io/en/latest/)
  
Programs:
- [VSCode](https://code.visualstudio.com)
- [PyCharm](https://www.jetbrains.com/pycharm/)
  
----------------------------------

### Features
- Customizable game settings:
  - starting player
  - board size
  - player marks
  - auto switching sides
- Two types of game:
  - standard - plyers try to make a line, first player making a line will win
  - reversed - plyers try to avoid making a line, first player making a line will lose
- Three game modes
  - normal - typical tic tac toe
  - movable - players put N marks on NxN grid, then in each turn, they have to move one of their marks until one of them win or moves limit is reached
  - one mark - tic tac toe with one mark
- Three ways of playing:
  - vs computer
  - vs player on the same device
  - vs player over the internet
- Real-time multiplayer:
  - public lobby
  - password protected rooms
  - handling disconnections

----------------------------------

### Setup
Ways to run this program: 
1. Use the [live demo](https://tic-tac-toe-alqu.onrender.com)
2. Follow the same steps as for editing the program

To edit this program:
- Download this repo
- Download [XAMPP](https://www.apachefriends.org/pl/index.html)
- Run Apache and MySQL in XAMPP Control Panel
- Move the project to XAMPP's htdocs folder
- Open [phpMyAdmin](http://localhost/phpmyadmin/index.php)
- Click on Import tab
- Choose deerkiller.sql file from PHP folder in project
- Click import button at the bottom of the page
- Open [localhost](http://localhost) and open folder that you previously moved to htdocs
- Start coding

----------------------------------

### Acknowledgements
#### Images
- [Menu logo](https://pixabay.com/vectors/traffic-sign-road-sign-caution-deer-3015221/)
- [Menu blood](https://www.transparentpng.com/download/blood-splatter-cut-out_14064.html)
- [Menu underline](https://www.dreamstime.com/red-highlighter-marker-red-highlighter-marker-strokes-vector-brush-pen-underline-lines-image129437064)
- [Deer skull](https://www.deviantart.com/seansan1/art/First-Attempt-at-Pixel-Art-Deer-Skull-644362445)
- [Cars](https://www.spriters-resource.com/nes/supercars/sheet/102985/)
- [Blood](http://pixelartmaker.com/art/a3c176205942be4)
- [Car explosion](https://nyknck.itch.io/explosion)
- [Forest background](https://elthen.itch.io/2d-pixel-art-forest-tileset)

#### Music
- [Menu music](https://www.youtube.com/watch?v=k68thGEDlx8)
- [Game music](https://www.youtube.com/watch?v=XkDZxO-Fn3E)

#### Fonts
- [Royal fighter](https://fontmeme.com/fonts/royal-fighter-font/)
- [Edit undo](https://www.1001fonts.com/edit-undo-font.html)

#### Sounds
- [Car crush](https://www.freesoundslibrary.com/car-crash-sound-effect/)
- [Car explosion](https://www.freesoundeffects.com/free-track/bomb-2-466478/)
- [Tires screech](https://bigsoundbank.com/detail-2370-screeching-tires-3.html)
- [Car crash on tree](https://www.youtube.com/watch?v=Go19ucS43OM)
- [Points count](https://freesound.org/people/xtrgamr/sounds/253546/)
- [Deer laugh 1](https://mixkit.co/free-sound-effects/laugh/)
- [Deer laugh 2](https://mixkit.co/free-sound-effects/laugh/)
- [Deer laugh 3](https://mixkit.co/free-sound-effects/laugh/)
- [Deer laugh 4](https://mixkit.co/free-sound-effects/laugh/)
- [Deer laugh 4](https://mixkit.co/free-sound-effects/laugh/)

<br>

## Details
This section is a general description of the project required to understand how it works, the exact details are in the code or simply are the code.

### User interface
#### Main menu
![main menu](/_for_readme/main_menu.png)


----------------------------------

#### Top score
![top_score](/_for_readme/top_score.png)


----------------------------------

#### Credits
![credits](/_for_readme/credits.png)


----------------------------------

#### Difficulty
![difficulty](/_for_readme/difficulty.png)


----------------------------------

#### Game
![game](/_for_readme/game.png)
![game_hit](/_for_readme/game_hit.png)


----------------------------------

#### Game over
![game over](/_for_readme/game_over.png)


----------------------------------

### Project structure
The project directory tree looks like this:
- :file_folder: DeerKiller (project folder)
  - :page_facing_up: *git config*
  - :page_facing_up: *readme*
  - :page_facing_up: *index.html file*
  - :file_folder: _for_readme - :page_facing_up: *files for readme*
  - :file_folder: Sounds - :page_facing_up: *sounds and music used in project*
  - :file_folder: Images
    - :file_folder: UI - :page_facing_up: *images for user interface*
    - :file_folder: Game - :page_facing_up: *images used in the game*
  - :file_folder: PHP
    - :page_facing_up: *mysql database file*
    - :page_facing_up: *php files for saving and getting the score*
  - :file_folder: Scripts
    - :file_folder: Menu - :page_facing_up: *scripts for menu*
    - :file_folder: Game
      - :page_facing_up: *scripts for game*
      - :file_folder: UI - :page_facing_up: *scripts for user interface in game*
  - :file_folder: Styles
    - :page_facing_up: *css files*
    - :file_folder: fonts - :page_facing_up: *fonts used in the project*

----------------------------------

### Code organization

![program diagram](/_for_readme/program_diagram.png)

> [!WARNING]  
> Classes must be loaded from bottom to the top to avoid situation when class does not exist in the time of its objects creation

Menu is entry of the program.

Menu creates and manages one instance of each of the classes:
- MenuWindow (Credits)
- Difficulty
- TopScore
- Game

Difficulty and TopScore classes are extension of MenuWindow class which is responsible for showing and hiding menu window with transition

Game class creates and manages:
- One instance of RoadBackground class
- Two instances of treesBackground class (left and right side)
- One instance of classes:
  - HealthBar
  - EnergyBar
  - PointsCounter
  - GameOver
- One instance of Player class
- Many instances of classes:
  - Enemy
  - Deer
  - HappyDeer


