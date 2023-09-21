# Introduction

This document describes the architecture and design of a single page web application that interacts with microservices via RESTful APIs.
The key elements in this document include the architecture, user interface, client components, and server classes.

This is a living document that is updated as changes are made each sprint.
The initial document describes the Base code students are given as a starting point for the semester.
Students are expected to update this document as changes are made each sprint to reflect the evolution of their application and key decisions they make.
The Base section serves as an example.


# Base

The Base is a simple application to provide the architecture to the students at the beginning of the semester.
The JavaScript code will be useful examples for students to learn from and leverage in the code they write for sprint 1.
The progressive display of information using collapsible sections and popups will serve as examples of good user interface design.
The overall design is somewhat minimalist/simple for the intended mobile device audience.

### Architecture

The Base architecture is a JavaScript single page web application in an HTML5 browser that uses RESTful APIs to access Micro-services provided by a Java server running on Linux.
The client consists of a minimal index.html file that loads and executes the bundled JavaScript application.
The client and server files are bundled into a single JAR file for execution on the Linux server at a specified port.
The browser fetches the client files from the server on the specified port.

![overview](images/BaseArchitecture.png)

The browser loads the index.html file (by default) which in turn loads the bundled JavaScript single page application bundle.js.
* The single page application makes RESTful API requests to the server on the same port using  JavaScript's asynchronous fetch.  
* A protocol document describes the JSON format for the RESTful API requests and responses.
* JSON Schemas are used to verify requests on the server side and responses on the client side.
* On the client, ReactJS renders the application using ReactStrap, Leaflet, and application defined components.
* GSON is used on the server to convert JSON requests to Java objects and Java objects to JSON responses.
* The client (ulog) and server (SLF4J) logging mechanisms control debugging output during development and production - print statements and console logging should never be used. 

The following architecture elements are not included in the Base system.
They will be added later in the semester.
* Client filesystem.
* Server SQL.
* Server concurrency.


### User Interface
![base](images/Map.png)

The basic screen in black shows the view on a mobile device, with a header, footer, and trip.
The header contains a earth logo and the team name obtained from the server when the client was loaded.
The footer contains a connection icon along with the current server name and server URL the client is connected to.
The trip shows a map and the current list of destinations.

Rather than buttons or icons to signify actions, we are associating actions with elements that are already on the screen to reduce the clutter.
We are using both popups and collapsible sections in this design rather than choosing to use one exclusively.
* Collapsible/Hidden sections are used for the map and about sections since they have a significant amount of content and we don't need to see them at the same time.
* A popup is used for the URL change since we want to control the interaction until the operation is completed. It seemed more natural than another collapsible section.

#### Clicking on the team name in the header displays an empty about screen.
Clicking again restores the trip screen.
We will fill this in later.

#### Clicking on the map adds to the trip.
Whenever a user clicks on the map, the client should display a marker with latitude, longitude, and a description at that location.
The description is obtained from reverse geocoding.
The location information is also added to the trip list below the map.
We only maintain a single marker at this point displaying the most recently clicked location.

#### Clicking the hamburgers (&#8942;) displays a menu of options.
At the trip level you can add the home (CSU Oval) location or clear the list.
At the destination level you can remove that destination from the list.

#### Clicking on the URL in the footer should let me change the server.
Whenever a user clicks on the URL a popup should open showing the team name, the URL in an input text box, and a Cancel button.
When the user modifies the URL, the client will attempt to connect to the new server and update the configuration.
When the Test button is clicked, it will attempt to connect to the server.
If not successful, nothing changes and the user may continue to make URL changes or click the Cancel button to return to the original sever (it shouldn't change).
If successful, the new server name should appear and a Save button should replace the Test button.
When the user clicks the Save button, the server connection should change and the popup closes, revealing the new servername and URL in the footer.

### Component Hierarchy
The component hierarchy for the base application depicted below shows the our top level App component with four children components.
* App renders the major components on the screen.
* Header renders an icon and a team name in the top banner.
* Footer renders the current server connection in the bottom footer.
* Atlas renders a map.
* About renders information about the team.

![base component hierarchy](images/ComponentsBase.png)

We do not show the many ReactStrap components in this hierarchy, even though they will appear when you are debugging on the client.

### Class Diagram
The class diagram for the base application depicted below shows the basic structure of the web server application.

![class diagram](images/serverclasses.png )

The classes in blue represent the classes specific to this application.  
* WebApplication processes command line parameters and creates MicroServer.
* MicroServer start a web server on the given port, configures the server for security, static files, and APIs for different types of requests, and processes the requests as they arrive.
* JSONValidator verifies a request is properly formatted before attempting to process it using JSON Schemas.
* ConfigRequest is a specific request that allows the server to respond with its configuration to allow interoperability between clients and servers. 
* Request defines the basic components of all requests.
* BadReqeustException allows us to distinguish bad requests from other types of exceptions that may occur.

These test classes provide automated tests for unit testing.
* TestWebApplication
* TestConfigRequest
* TestJSONValidator


# Sprint 1


### User Interface

In this sprint, we will focus on team information.
There are two primary parts:
* browser tab, header, and footer.
* about page which includes team and member information,

Whenever a user clicks the team name in the header, a collapsible section should appear under the header with information about the team.
The collapsible map should disappear so only the about or map are displayed.
A simple toggle in state should be able to control this rendering.
The about page should contain the team name as a heading. 

![base](images/About.png)

The team name in the browser tab, header and are simple changes to constants in the client and server.

### Client Components

We will add 3 new components to the base architecture on the client to support the about page.
* Team component will render the team information
* Person component will render the individual information for a team member
* AboutCard component will render the team/individual information in a consistent fashion.

The existing About component will be modified to control the layout of the Team and Person components on the page.

![components1](images/ComponentsSprint1.png)

### Server Classes
There are no changes to the server class structure in this sprint.
Only minor changes to text constants are required.



# Sprint 2


### User Interface

In this sprint we will add several features:
* The ability to load a file
* Customizable distance units

In the main hamburger menu, the user will see an additional icon which allows loading a file.

Upon clicking the disk icon, a pop-up will appear allowing the user to select a file to load.

![For Displaying Distances](images/loadTrip.png)

![Load File Pop Up](images/disp-and-calc.png)

### Distance: Units

![units](images/DistanceUnits.png)

The application will allow the user to select what units they would like to use for their trip. It will display the distance on the map (and/or on location list). This is a rouch sketch design and the implementation will be as accurate as possible.

# Sprint 3


### User Interface

In this sprint we will add this feature: <!--We may update this-->
* The ability to find places by name

Above the trip area, there will be a section for actions that have nothing to do with the trip directly, such as the ability to find places by name.

The "find" option will be a magnifying glass to communicate it's purpose intuitively to the user.
Upon clicking on the find option, a window will appear where the user can enter a search string.
Upon clicking submit, the user will be presented with a list of places matching the string.
Additional options will also be provided including the type of places returned as well as the location.

![Find Places By Name](images/ShowInputInterface.png)

### Client Components

The new components are shown in green.

![Basic Hierarchy Change in Green](images/ShowInputHierarchy.png)

### Server Classes

The following class will be added to the server as part of the planned epics:
* The FindRequest class will allow the server to respond with a list of places matching the provided argument string. Additional options for specifying the type and location will also be processed by the findRequest class.

This test class provides automated tests for unit testing:
* TestFindRequest

![class diagram](images/ServerClassesSprint3.png )

# Sprint 4

### User Interface

![UI for shorter tour feature](images/OptimizeTripInterface.png)

The shorter trip feature will add a pop up component to aid the user with less distance in their trip. They will have the option to either accept or decline the new trip recommendation.
### Component Hierarchy

![Basic Hierarchy](images/ComponentsSprint4.png)

### Server Classes

The following class will be added to the server as part of the planned epics:
* The TourRequest class will allow the server to respond with an optimized version of the provided trip. The trip will be optimized to reduce the distance travelled.

This test class provides automated tests for unit testing:
* TestTourRequest

![class diagram](images/ServerClassesSprint4.png )  
  
  
# Sprint 5

### User Interface
The user will be able to customize the distance units displayed on the map. By clicking on the intuitive units icon, a window will be toggled which will enable the user to choose from one of three provided units. The user will also have the option to enter a custom unit of their choice using an input field.  
  
The user will also be able to save their trip to a file. In the main itinerary actions dropdown, by clicking on the disk icon, the user will be presented with the option to save their trip.  
  
The dropdown for place actions next to each item in the itinerary will be extended to provide additional options to the user. They will be able to select any place in the itinerary as the new starting place, while maintaining the original trip order. 
  
The dropdown which contains trip customization options such as selectable units and optimization will be extended to provide the user with the functionality to reverse the trip order at the click of a button.  
  
![class diagram](images/UXDiagramSprint5.png )   
 
The user will be able to select from several background maps using the selection buttons at the corner of the map screen.  
  
![class diagram](images/Map_Options.png )   
### Component Hierarchy

![Basic Hierarchy](images/ComponentsSprint5.png)

### Server Classes  
There are no changes to the server class structure in this sprint.
