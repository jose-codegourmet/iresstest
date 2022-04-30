## 🚀 Getting started

This is a React Gatsby project. The purpose of choosing gatsby is to be able to deploy to netlify fast.

follow the ff commands to run the program:
1. `yarn`;
2. `yarn start`;

This is also best viewed in a mac machine. As I am using a mac emoji for the robot 🤖

To view the project you can open `http://localhost:8000`.

## 🤖 App Commands

###### PLACE
place the robot to coordinates ( x , y , f )
- x is the x axis up to number nth tile
- y is the y axis up to number nth tile
- f is the Robot's direction with allowed parameters: "NORTH","EAST","SOUTH" and "WEST"
###### MOVE
The robot will move 1 tile depending on the direction it is facing

###### LEFT
will rotate the robot counter clockwise
###### RIGHT
will rotate the robot clockwise

###### REPORT
show robot's current coordinates

###### CLEAR
Reset's the grid and terminal


## 🎉 BONUS

###### SET_ORIGIN
CHANGE THE ORIGIN OF THE PLACE COORDINATE ( x , y )
- x is the x axis up to number nth tile
- y is the y axis up to number nth tile

## 🤖 App Configurations
The app's config is mostly done in the [source code](src/constants/index.ts)

## 💻 WORKING [DEMO](https://aesthetic-elf-01cae2.netlify.app)
