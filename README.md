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
  - Starting player
  - Board size
  - Player marks
  - Auto switching sides
- Two types of game:
  - Standard - plyers try to make a line, first player making a line will win
  - Reversed - plyers try to avoid making a line, first player making a line will lose
- Three game modes
  - Normal - typical tic tac toe
  - Movable - players put N marks on NxN grid, then in each turn, they have to move one of their marks until one of them win or moves limit is reached
  - One mark - tic tac toe with one mark
- Three ways of playing:
  - With computer
  - With player on the same device
  - With player over the internet
- Real-time multiplayer:
  - Public lobby
  - Password protected rooms
  - Handling disconnections
- Multiple languages:
  - Polish
  - English

<br>
 
> [!NOTE]  
> Room for improvements:
> - In-game instruction about game modes
> - Inviting by QR code
> - More game modes
> - Users accounts for stats, custom mark and achievements
> - Pagination, filtering and searching for rooms in multiplayer lobby
> - Add more languages

----------------------------------

### Setup
Ways to run this program: 
1. Use the [live demo](https://tic-tac-toe-alqu.onrender.com)
2. Follow the same steps as for editing the program

To edit this program:
- Download this repo
- Download and install Python
- Run app.py file
- Install [Prepros](https://prepros.io)
- Add this project in Prepros
- Create config.py file in project folder
- Run this code in some online Python IDE
  - *import secrets*
  - *print(secrets.token_hex(16))*
- Put generated string in config.py eg. *SECRET_KEY = generadted_string*
- Start coding

----------------------------------

### Acknowledgements
- [tic tac toe wariants - wiki](https://en.wikipedia.org/wiki/Tic-tac-toe_variants)
- [tic tac toe wariants - whatdowedoallday](https://www.whatdowedoallday.com/tic-tac-toe-variations/)
- [tic tac toe wariants - byrdseed](https://www.byrdseed.tv/category/enrichment/games/tic-tac-toe-variants/)

<br>

## Details
This section is a general description of the project required to understand how it works, the exact details are in the code or simply are the code.

### User interface
#### Main menu
![main menu](/_for_readme/main_menu.png)
In the main menu user can:
- Change the language
- Go to multiplayer
- Start a game with an AI or with a player on the same device
- Check my github

Creating a game is a 3-step form:
1. Enemy (AI or player on the same device) and game mode
2. Statring player and type of game (standard, reversed)
3. Board size, players marks, changing sides every game

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


