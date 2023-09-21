# Inspection - Team *T10* 

The goal of an Inspection is to find defects.
We first identify the code we wish to inspect, determine the time we wish to meet, and determine the checklist we will use to find faults in our code during the preparation before the meeting.

|  | Details |
| ----- | ----- |
| Subject | LoadTrip.js and FileLoaderApp.js:FileLoaderApp() |
| Meeting | *2021-03-09 -- 7:00 PM -- MS Teams* |
| Checklist | *reference, URL, etc.* |

### Roles

We note the amount of time each person spent reviewing the code in preparation for the meeting.

| Name | Preparation Time |
| ---- | ---- |
| Eric Tapia | 8 minutes |
| Daniel Garon | 10 minutes |
| Michael Cucina | 10 minutes |
| Ben Saathof | ~10 minutes |
| Josh Ellis  | ~5 minutes  |



### Problems found

We list each potential defect we found in the code during our preparation so we can discuss them in the meeting.
We add a GitHub issue for each defect that requires a modification to the system.

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| LoadTrip.js:1 | Unused useEffect import | low | mcucina | #398 |
| LoadTrip.js:43 | Pop-up modal does not toggle off upon confirmation | low | dgaron | #407 |
| FileLoaderApp.js | Very poor test coverage | med | dgaron | #413 |
| LoadTrip.js:1 | Unused useEffect import | low | bensaat | #398 |
| FileLoaderApp.js:10 | Unused 'file' parameter | low | bensaat | #401 |
| LoadTrip.js:41 | Sloppy attribute formatting | low | dgaron | # |
| usePlaces.js:24 | Unused 'distances' variable in append() | low | #409 |
| LoadTrip.js:41 | Sloppy attribute formatting | low | dgaron | #410 |
| FileLoaderApp.js:19 | Unneeded `<>` | low | joshlsastro | #415 |
| FileLoaderApp.js:26 | Complicated nested functions | low | joshlsastro | #416 |
| FileLoaderApp.js | Add test cases to increase code coverage | med | erictg | #413 |
| LoadTrip.js | Add test cases to increase code coverage | med | erictg | #418 |
