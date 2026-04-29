<h1 align="center">TicTacToe</h1>
<p align="center">
  <strong>
    A web-based Tic-Tac-Toe application featuring different game rules, local play, and real-time multiplayer functionality.
  </strong>
</p>

<!--
<div align="center">
  <img src="_for_readme/banner.png?">
</div>

<br>


# Table of Contents
* [Overview :sparkles:](#overview-sparkles)
  * [About](#about)
  * [Features](#features)
  * [Technologies](#technologies)
  * [Setup](#setup)
  * [Acknowledgements](#acknowledgements)
* [Details :scroll:](#details-scroll)
  * [User interface](#user-interface)
  * [Project structure](#project-structure)
  * [Code organization](#code-organization)
-->
<br>

# Overview :sparkles:

## About
This project is a collection of Tic-Tac-Toe variations built to practice full-stack development. It combines a JavaScript-based front-end with a Python back-end to handle real-time game states across different clients. Players can test different game modes against an AI, locally on one device, or online against others.

Check out the [live version](https://pasek108.github.io/BeFunge93Interpreter/).

<br>

![preview](/_for_readme/preview.png)

## Technologies
Languages:
- HTML 5
- CSS 3
- JavaScript
- Python 3.11

Libraries and frameworks:
- [SCSS](https://sass-lang.com)
- [FontAwesome](https://fontawesome.com) 6.2.1
- [GoogleFonts](https://fonts.google.com)
- [Socekt.IO](https://socket.io) 4.6.0
- [Flask](https://flask.palletsprojects.com/en/3.0.x/)
- [Flask SocketIO](https://flask-socketio.readthedocs.io/en/latest/)

## Features
### Game Rules & Modes
* **Multiple Rulesets:** Play the **Standard** game (connect a line to win) or **Reversed** (avoid making a line).
* **Game Variations:**
    * **Normal:** The classic 3x3 experience.
    * **Movable:** Players move their existing marks on the grid after a certain limit is reached.
    * **One Mark:** A simplified version using only one mark per player.
* **Customization:** Adjustable board sizes, starting player selection, and player icons.

### Ways to Play
* **AI Opponent:** Play solo against a basic computer player.
* **Local Play:** Two players can play on the same device.
* **Online Multiplayer:** Real-time matches via WebSockets, including a public lobby and private, password-protected rooms.

### Additional Functionality
* **State Management:** Automatic handling of player disconnections in online rooms.
* **Localization:** Full UI support for both English and Polish. 

<!--
<br>

> [!NOTE]  
> Room for improvements:  
> - In-game instructions for game modes.  
> - Inviting players via QR code.  
> - More game modes.  
> - User accounts for stats, custom marks, and achievements.  
> - Pagination, filtering, and searching for rooms in the multiplayer lobby.  
> - Adding more languages.  


## Setup
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

## Acknowledgements
- [tic tac toe wariants - wiki](https://en.wikipedia.org/wiki/Tic-tac-toe_variants)
- [tic tac toe wariants - whatdowedoallday](https://www.whatdowedoallday.com/tic-tac-toe-variations/)
- [tic tac toe wariants - byrdseed](https://www.byrdseed.tv/category/enrichment/games/tic-tac-toe-variants/)

-->

<br>

# Details :scroll:

## User interface

### Every page
On every page there is: 
- Header:
  - Title which is a link to the main menu page
  - Language selection box that allows the user to change the language of the page without reloading
- Footer
  - Link to my github

### Main menu
![main menu](/_for_readme/main_menu.png)
Main menu is basically a form for creating a game.

Click on the multiplayer option will take the player to the multiplayer lobby.<br>
Click on the back option will take the player to the previous step.<br>

![create game](/_for_readme/create_game.png)
Creating a game is a 3-step form:
1. Enemy (AI or player on the same device) and game mode
2. Starting player and type of game (standard, reversed)
3. Board size, players marks, changing sides every game

### Multiplayer lobby
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

### Game
In game view has:
- Message info (player's turn, waiting for player in mulitplayer)
- Players info (marks of the players, which player is the user)
- Game board (with line in column, row or diagonal if one of the players win)
- Game info (name, marks, board size, type)
- Quit and Replay buttons (replay button is disabled until the game is over)

<br>

**Normal game**

![normal game](/_for_readme/normal_game.png)
Normal version of the tic tac toe, users puts their marks and try to make or avoid making a line depending on game type.

<br>

**Movable game**

![movable game](/_for_readme/movable_game.png)
In beginning players puts their mark like in normal game but after some moves they can't put more marks and they have to move already placed marks. 
The game has moves limit which is reached results in a draw.

<br>

**One mark game**

![one mark game](/_for_readme/one_mark_game.png)
Similar to normal version but both of the players have the same mark.

### Multiplayer game
<img alt="multiplayer game" src="/_for_readme/multi_game.png" width="50%" align="right">
  
Games in multiplayer are the same as normal games, the only differences are:
- Position of a player will be hilighted in red color if there is no given player or the player left the game
- If there is no enemy player the game will be stopped on unactive player turn.
- On the bottom there is a room id and button to copy invitation link. 

Password in invitation link is passed in the URL.
When both players leave the game, the room and its game is deleted.

<!--
## Project structure
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

## Code organization

![program diagram](/_for_readme/program_diagram.png)

> [!WARNING]  
> Classes must be loaded from bottom to the top to avoid situation when class does not exist in the time of its objects creation

-->
