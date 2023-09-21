# Sprint 2 - t10 - Random Code Generators

## Goal
### *How far is it?*

## Scrum Master: 
### *Ben Saathoff*

## Definition of Done

* The release for `v2.x` created as a GitHub Release and deployed on black-bottle under TEAM.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate technical debt ratio < 5.
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before writing the code.
* Tests are fully automated.

### Processes
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

### Load Trip
The Load Trip epic will allow the user to load a previously saved trip from a file.

### Distance: Default
This feature allows for both calculating and displaying leg, cumulative, and total trip distances in a default measurement of miles. The calculation is done on the server, while the distances are displayed on the client.  


### Distance: Units
This feature will allow the user to preference their desired unit of distance when planning their trip. They can choose kilometers, nautical miles, or even set their own unique unit and Earth radius.

### Distance: Storage/Protocol
This will Support the protocol distance feature on the client and server, and upload user settings to local storage in order to save their changes

### Interoperability

The user would like to be able to use different services to plan their trip.

* The client must be able to operate with other servers that implement the protocol.
* The client should verify that the necessary features are available and let the user know if they are not.
* The client should not provide/advertise features that are not supported in its user interface.


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *3* |
| Tasks |  *24*   | *42* | 
| Story Points |  *29*  | *36* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 02/8/2022 | #126 | None | None | 
| 02/10/2022 | #173 | None | None | 
| 02/11/2022 | #176 | None | None | 
| 02/12/2022 | #181, 182, 179, 178 | None | None | 
| 02/14/2022 | #189, 191, 195, 190 | #193, 197 | None | 
| 02/15/2022 | #193, 197 | None | None |
| 02/16/2022 | #210, 212 | None | None |
| 02/17/2022 | #130 | None | None |
| 02/19/2022 | #216, 218, 220, 222, 131 | None | None |
| 02/21/2022 | #127, 133, 134, 175, 226, 240, 242 | None | None |
| 02/23/2022 | #195, 245, 247, 135, 139, 141, 244, 255, 256 | #259, 148, 140 | None |
| 02/24/2022 | #270, 148, 140, 267, 259  | None | None |

## Review

### Epics completed  

Load Trip, Distances: Client, Distances: Protocol

### Epics not completed 

Distances: Units, Interoperability

## Retrospective

### Things that went well

We made steady progress on the tasks in the sprint backlog.

### Things we need to improve

We need to improve planning and prioritization of tasks on the story board.
We need to improve task delegation.
We need to improve testing.

### One thing we will change next time

We will devote more effort to planning before the sprint and updating the plan during the sprint.
