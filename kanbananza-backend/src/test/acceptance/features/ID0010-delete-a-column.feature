Feature: 010 - Delete a Column

As a user I want to be able to delete a column from the board
Background:
Given user with username Fizbin is logged in
Given the user owns one board
Given the user has selected that board
Given the selected board has three columns ordered as follow
| columnName | columnOrder |
| To Do      | 1           |
| Doing      | 2           |
| Done       | 3           |


Scenario: Delete a column from the board (Normal Flow)
When the user attempts to delete column with name <columnName>
| columnName | 
| To Do      | 
| Doing	     | 
| Done       | 

Then the board will only contain two columns


Scenario: Delete a column from a board with one column (Alternate Flow)
When the user attempts to the only column of a board with one <column>
| column     | order       |
| One        | 1           |

Then a warning "are you sure you want to procede with this operation? A board without columns will be deleted" will be issued

Scenario: Delete column that does not exist (Error Flow)
When the user attempts to delete a <column> that does not exist 
| column		 |
| Unknown   	 |

Then an error "The column does not exist" is issued





