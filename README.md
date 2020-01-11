# test-arachnid-robotics

A multi part challenge of navigating remotely controlled spiders on a test surface

## How do the spiders work

A robot spider has the following public methods

- A setter for versioning the robot (`mk1`, `mk2`)
- A setter for the surface it is navigating
- A `processInput` method to process the command string provided
- A `getCoordinates` method to return its location

A robot spider has the following Classes that control its behaviour

- Command interpreter - it converts the provided input string to commands that the spider understands
- Command validator - checks if moving to a location on the surface is safe
- State manager - converts the commands to coordinates and vectors to manage the robot's movement to neighbouring coordinates and the direction it is facing

## Project folder structure

| Key Files/Folders | What is inside                                             |
| ----------------- | ---------------------------------------------------------- |
| dev               | scripts for quick validation / TODO - add real tests later |
| src/constants     | Constants definitions                                      |
| src/entities      | Entity classes for the application                         |
| src/run           | entrypoint for running the application                     |
| Makefile          | Entrypoint scripts                                         |
| tests             | test scripts                                               |

### Setup project

have Node.js installed on your machine
run the following commands

```
npm install
```

### to run Part 1

```
make mk1
```

### to run Part 2

```
make mk2
```
