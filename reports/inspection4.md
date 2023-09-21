# Inspection - Team *T10*

The goal of an Inspection is to find defects.
We first identify the code we wish to inspect, determine the time we wish to meet, and determine the checklist we will use to find faults in our code during the preparation before the meeting.

|  | Details |
| ----- | ----- |
| Subject | *FindPopup.js, TourRequest.java* |
| Meeting | *2022-04-07, 7:00 PM, MS Teams* |
| Checklist |  |

### Roles

We note the amount of time each person spent reviewing the code in preparation for the meeting.

| Name | Preparation Time |
| ---- | ---- |
| Daniel Garon | 15 minutes |
| Eric Tapia | 12 minutes |
| Josh Ellis   | 15 minutes |
| Ben Saathoff | 10 minutes |
| Michael Cucina | 10 minutes |



### Problems found

We list each potential defect we found in the code during our preparation so we can discuss them in the meeting.
We add a GitHub issue for each defect that requires a modification to the system.

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| FindPopup.js:26 | poor attribute formatting | low | Daniel | #576 |
| FindPopup.js:67 | poor attribute formatting | low | Daniel | #576 |
| FindPopup.js:79 | poor attribute formatting | low | Daniel | #576 |
| FindPopup.js:113-118 | multiselect feature causes UX confusion | low | Eric | #568 |
| FindPopup.js:49 | long function | low | Daniel | #581 |
| FindPopup.js:113 | need better react component | low | Ben | #575 |
| TourRequest.java:37 | nearest neighbor should be in separate file | hi | Josh | #574 |
| FindPopup.js:113 | need better react component | low | Michael | #575 |
