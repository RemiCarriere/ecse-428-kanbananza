Feature: 008 - Rename a Column

[Feature description here]

Background:
Given user with username Fizbin is logged in
Given the user owns one board
Given the user has selected that board
Given the selected board has three columns ordered as follow
| columnName | columnOrder |
| To Do      | 1           |
| Doing      | 2           |
| Done       | 3           |


Scenario: Rename a column with a valid name (Normal Flow)
When the user attempts to update column <columnNumber> with name <newName>
Then the board contains a column with name <newName>
| newName | columnOrder |
| New Name| 1           |
Then the board will look as follows
| columnName | columnOrder |
| New Name   | 1           |
| Doing      | 2           |
| Done       | 3           |

Scenario: Rename column to an already existing name (Alternate Flow)
When the user attempts to update column <columnNumber> with name <newName> that already exists
| newName   |
| To Do    	| 
| Doing   	| 
| Done      | 	
Then the board remains the same

Scenario: Rename a column to empty name (Error Flow)
When the user attempts to rename the column with column with <columnNumber> to empty name 
Then a message "Column name cannot be empty" is issued





