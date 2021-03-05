Feature: 008 - Rename a Column

[Feature description here]

Background:
Given user with username Fizbin is logged in
Given the user owns one board
Given the user has selected that board
Given the selected board has three columns ordered as follows:
| columnName | columnOrder |
| To Do      | 1           |
| Doing      | 2           |
| Done       | 3           |


Scenario: Rename a column with a valid name (Normal Flow)
When the user attempts to update column "To Do" with name "new To Do"
Then the board will look as follows:
| columnName | columnOrder |
| new To Do  | 1           |
| Doing      | 2           |
| Done       | 3           |

Scenario: Rename column to an already existing name (Alternate Flow)
When the user attempts to update column "To Do" with name "Doing"
Then the system shall report "column name already in use"	
Then the board will look as follows:
| columnName | columnOrder |
| To Do      | 1           |
| Doing      | 2           |
| Done       | 3           |

Scenario: Rename a column to empty name (Error Flow)
When the user attempts to update column "To Do" with name ""
Then the system shall report "column name cannot be empty"
Then the board will look as follows:
| columnName | columnOrder |
| To Do      | 1           |
| Doing      | 2           |
| Done       | 3           |





