# TicTacToe Readme
<details>
  <summary>❓Why the page is not loading❓</summary>
  Due to usage of Flask for multiplayer I had to use hosting with support for this technology. 
  I have no money so I used a free hosting which unfortunately puts websites to sleep. Juts wait a few minutes and it should work.
</details>
<details>
  <summary>❓Why my commits often have no names and I'm not using branches❓</summary>
  <ul>
    <li>I often create with bursts many things at once</li>
    <li>I don't plan things ahead, I just create things that seems good at that moment</li>
    <li>Sometimes I have bad internet connection and it is troublesome to send commits</li>
    <li>I'm coding alone so creating branches and describing commits is not useful for me</li>
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
- [Prepros](https://prepros.io) (auto preview, processing scss)
  
----------------------------------

### Features
- Customizable game settings:
  - Starting player
  - Board size
  - Player marks
  - Auto switching sides
- Two types of game:
  - Standard - players try to make a line, first player making a line will win
  - Reversed - players try to avoid making a line, first player making a line will lose
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
- Install libraries from requirements.txt
- Run app.py file
- Install [Prepros](https://prepros.io)
- Add this project in Prepros
- Create config.py file in project folder
- Run this code in some online Python IDE
  - *import secrets*
  - *print(secrets.token_hex(16))*
- Put generated string in config.py eg. *SECRET_KEY = "generated_string"*
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
#### Every page
On every page there is: 
- Header:
  - Title which is a link to the main menu page
  - Language selection box that allows the user to change the language of the page without reloading
- Footer
  - Link to my github

#### Main menu
![main menu](/_for_readme/main_menu.png)
Main menu is basically a form for creating a game.

Click on the multiplayer option will take the player to the multiplayer lobby.<br>
Click on the back option will take the player to the previous step.<br>

![create game](/_for_readme/create_game.png)
Creating a game is a 3-step form:
1. Enemy (AI or player on the same device) and game mode
2. Starting player and type of game (standard, reversed)
3. Board size, players marks, changing sides every game

----------------------------------

#### Multiplayer lobby
![multiplayer lobby](/_for_readme/multi_lobby.png)
The lobby shows all existing games in the form of a list of rooms that the player can join or create a new one. When there is no players in the room, the room is deleted. If the room is full player can't join until some place becomes available. In that case the join button is disabled. Rooms protected by password has a join button with a lock icon. After clicking it player has to put the correct password in order to join to the game.

Each of the rooms in the lobby has:
- Unique ID
- Name consisting of:
  - Mode
  - Players marks
  - Board size
  - Type of a game
- Number of players in the room
- Join button

<img alt="multiplayer create game" src="/_for_readme/multi_create_game.png" width="300" align="right">

Creating a game is similar to creating a game in the main menu. The difference is that it is packed in one form and has option for setting password.

Player has to choose:
- Game mode
- Board size
- Type (uncheck = standard, check = reversed)
- Password (empty = no password)
- Players marks
- Starting player
- Switching sides every game

----------------------------------

#### Game
In game view has:
- Message info (player's turn, waiting for player in mulitplayer)
- Players info (marks of the players, which player is the user)
- Game board (with line in column, row or diagonal if one of the players win)
- Game info (name, marks, board size, type)
- Quit and Replay buttons (replay button is disabled until the game is over)

**Normal game**
![normal game](/_for_readme/normal_game.png)
Normal version of the tic tac toe, users puts their marks and try to make or avoid making a line depending on game type.

**Movable game**
![movable game](/_for_readme/movable_game.png)
In beginning players puts their mark like in normal game but after some moves they can't put more marks and they have to move already placed marks. 
The game has moves limit which is reached results in a draw.

**One mark game**
![one mark game](/_for_readme/one_mark_game.png)
Similar to normal version but both of the players have the same mark.

----------------------------------

#### Multiplayer game
<img alt="multiplayer game" src="/_for_readme/multi_game.png" width="50%" align="right">
  
Games in multiplayer are the same as normal games, the only differences are:
- Position of a player will be hilighted in red color if there is no given player or the player left the game
- If there is no enemy player the game will be stopped on unactive player turn.
- On the bottom there is a room id and button to copy invitation link. 

<br>
Password in invitation link is passed in the URL.
If both players leave the game then the room and its game is deleted.

----------------------------------

### Project structure
The project directory tree looks like this:
- :file_folder: TicTacToe (project folder)
  - :page_facing_up: *github and prepros config*
  - :page_facing_up: *readme file*
  - :page_facing_up: *requirements file*
  - :page_facing_up: *app.py and config.py - server in flask*
  - :page_facing_up: *Game.py - server side game object*
  - :file_folder: _for_readme - :page_facing_up: *files for readme*
  - :file_folder: templates - :page_facing_up: *single and multiplayer html files*
  - :file_folder: static
    - :file_folder: images - :page_facing_up: *images used in the project*
    - :file_folder: scripts
      - :page_facing_up: *top level script files (eg. global, menu, language)*
      - :file_folder: multiplayer - :page_facing_up: *scripts for mutiplayer*
      - :file_folder: game - :page_facing_up: *scripts for game itself (eg. modes, board, AI)*
    - :file_folder: style
      - :page_facing_up: *scss files*
      - :file_folder: css - :page_facing_up: *css files compiled by prepros*

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


