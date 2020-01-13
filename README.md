# test-arachnid-robotics

A multi part challenge of navigating remotely controlled spiders on a test surface

## How does the application work

A robot spider has the following public methods

- A `setVersion` method for versioning the robot (`mk1`, `mk2`, `mk3`)
- A `setTerrain` method for the terrain it is navigating
- A `processInput` method to process the command string provided
- A `getCoordinates` method to return its location

A robot spider has the following `sections` that control its behaviour

- states managers - manages the spider robot's and terrain's state
- sensors - there are three types of sensors `terrain`, `fuel`, `temperature`, they share the same interface and check if a move to a location is possibile
- commands managers - these classes break up the input data received by the spiders and determine where they have to go
- ai - a core class making decisions of which engine to use, and whther its safe to move to a location or whether a fallback plan hs to be generated

## Project folder structure

| Key Files/Folders | What is inside                                             |
| ----------------- | ---------------------------------------------------------- |
| dev               | scripts for quick validation / TODO - add real tests later |
| src/configs       | configuration files                                        |
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

### to run Part 3

```
make mk3
```
