Feature: Move Column

As a user I want to be able to set the order of column in a board 
Background:
Given user with username Fizbin is logged in
Given the user owns one board
Given the user has selected that board
Given the selected board has three columns ordered as follows:
| columnName | columnOrder |
| To Do      | 1           |
| Doing      | 2           |
| Done       | 3           |


Scenario: Move the column in the board (Normal Flow)
When the user attempts to move column with name "To Do" to index 2
Then the board columns will look as follows:
| columnName | columnOrder |
| To Do      | 2           |
| Doing      | 1           |
| Done       | 3           |

Scenario: Move a column to the same position (Alternate Flow)
When the user attempts to move column with name "To Do" to index 1
Then the board columns will look as follows:
| columnName | columnOrder |
| To Do      | 1           |
| Doing      | 2           |
| Done       | 3           |


Scenario: Move a non-existent column (Error Flow)
When the user attempts to move card with name "non existent column" to index 1
Then the system shall report "Column does not exist"
Then the board columns will look as follows:
| columnName | columnOrder |
| To Do      | 1           |
| Doing      | 2           |
| Done       | 3           |




