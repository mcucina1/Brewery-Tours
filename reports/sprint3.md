# Sprint 3 - *t10* - *Random Code Generators*

## Goal
### *Where should we go?*

## Sprint Leader: 
### *Michael Cucina*

## Definition of Done

* The Increment release for `v3.x` created as a GitHub Release and deployed on black-bottle under TEAM.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate technical debt ratio less than the class mean.
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.
* Code coverage is greater than the class mean.

### Processes
* Incremental development.  No big bangs.
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

### Find: Protocol / Server
We will add a find feature to allow the user to find places matching an input string. We will provide this feature on the server by providing a means to process find requests. The requests will be validated to ensure that they conform to the specified protocol to allow interoperability. The server will then respond with a list of places matching the request.

### Find: Show Input
We will display a pop-up which will allow the user to enter a search term. They will then have the option to submit or to cancel their search. That search request will then be sent to the server to be processed.

### Find: Show Result / Select
We will display a list of locations that match the search results as well as the details for each place and add a select option for user preferences.

### Type: Client
We will update our UI to allow the client to add a type to their search query. It will allow them to search for any of the following: "airport","balloonport","heliport","other".

### Type: Server
The server should accept a valid find request that includes a type feature, and process that request correctly.

### Where: Client
We will update our UI to allow the client to give a specified country, state, location, etc. that will find places within the specified location. For example, the client could use "Canada" or "United States" to find places within these specified locations.

### Where: Server
The server will accept an incoming API find request with the where feature, and return a response to the client with desired locations.

### LoadTrip: CSV
The user will be able to load trips from .csv files. The .csv files will be parsed by the client and the resulting list of places will be passed to the server. The server will respond with the distances. The client will then populate the itinerary with the trip loaded from the file.

### Distances: Units - M, km, NM 
The user will be able to select from miles, kilometers, or nautical miles as the unit for the distances displayed on the trip itinerary. The selected unit will be passed to the server which will return the corresponding distances.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *9* | *2* |
| Tasks |  *34*   | *57* | 
| Story Points |  *35*  | *57* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *2021-03-01* | *#274* |  |  | 
| *2021-03-02* | *#286* | *#287* |  | 
| *2021-03-03* | *#287, 302* |  |  | 
| *2021-03-04* | *#335, 303, 289, 280, 351* |  |  | 
| *2021-03-05* | *#353, 343* |  |  | 
| *2021-03-05* | *#360, 342, 364, 300, 301* |  |  | 
| *2021-03-07* | *#279* |  |  | 
| *2021-03-08* | *#379, 369, 372, 321, 383, 363, 386, 371, 370, 365, 366* |  |  | 
| *2021-03-21* | *#295, 394, 403, 288, 367, 368, 420, 426, 428, 430, 431, 292, 293* |  |  | 
| *2021-03-22* | *#442* |  |  | 
| *2021-03-23* | *#415, 401, 398, 446, 450, 451, 453, 455, 457, 299* |  |  | 
| *2021-03-22* | *#461, 290, 462* |  |  | 


## Review

### Epics completed  

Find: Protocol / Server  
Find: Show Input

### Epics not completed 

Find: Show Result / Select  
Type: Server  
Type: Client  
Where: Server  
Where: Client  
LoadTrip: CSV  
Distances: Units - M, NM, km  
Distances: Units - custom

## Retrospective

### Things that went well

We maintained a steady pace throughout the sprint.

### Things we need to improve

We need to improve group communication and coordination.

### One thing we will change next time

We will coordinate better and make a greater effort to include our remote team member.
