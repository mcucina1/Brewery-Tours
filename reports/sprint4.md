# Sprint 4 - *t10* - *Random Code Generators*

## Goal
### *Shorter tours!*

## Sprint Leader: 
### *Eric Tapia*

## Definition of Done

* The Increment release for `v4.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A (technical debt ratio==0).
* Minimize code smells and duplication.
* Use Single Responsibility Principle.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.
* Code coverage is 70%

### Processes
* Incremental development.  No big bangs.
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

### Find: Show Result / Select
We will display a list of locations that match the search results as well as the details for each place and add a select option for user preferences.

### Tour: Server
We will configure the server to accept a TourRequest and respond with an optimized trip. The trip will be optimized so as to reduce the distance travelled.

### Tour: Client
We will add the ability for the user to choose to optimize their trip. Upon selecting to optimize, their request will be sent to the server. The client will then display the optimized trip and allow the user to decide whether to accept or reject the changes.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 4 | *count* |
| Tasks |  25   | *count* | 
| Story Points |  26  | *sum* | 


## Metrics Summary:
We added our planed epics this sprint while thinking about our ability to complete the planned tasks/story points based on our previous sprint results.
We chose to plan for a reasonable amount of work that wouldn't overwhelm us. 
We will add more or remove tasks into the icebox when needed towards the end of our sprint. 
We feel confident starting off this sprint and will continue to work together in order to knock out as much tasks as possible

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *2022-03-30* | *#504, #485, #517* |  |  | 
| *2022-04-01* | *#294, #489, #515, #291* |  |  | 
| *2022-04-03* | *#486, #527, #514, #537* | ** |  |
| *2022-04-04* | *#524, #540, #488* |  |  |
| *2022-04-06* | *#523, #505, #490, #525, #487, #555* |  |  |
| *2022-04-07* | *#557, #548, #549, #494, #561, #563, #496* |  |  |
| *2022-04-08* | *#580, #583* |  |  |
| *2022-04-09* | *#590, #574* |  |  |
| *2022-04-10* | *#593, #594* |  |  |
| *2022-04-11* | *#592, #591, #508, #599, #604* |  |  |
| *2022-04-12* | *#492, #603, #602, #606, #601* |  |  |
| *2022-04-13* | *#568, #596, #493, #500, #611, #607* |  |  |
| *2022-04-14* | *#620, #612, #618, #498, #622, #625, #610, #615, #627, #629, #624, #613* |  |  |

## Review

### Epics completed  
Find: Show Result / Select
Tour: Server

### Epics not completed 
Tour: Client

## Retrospective

### Things that went well
- We communicated well throughout the sprint and made sure we all had something to work on. 
- The team's work was split up a little more evenly.
- Our attendance to group meetings were always consistent and we didn't have any conflicts
- Our code coverage was good

### Things we need to improve
- We didn't get as much work done as we would like


### One thing we will change next time
- Write more tests to continue to increase test coverage
