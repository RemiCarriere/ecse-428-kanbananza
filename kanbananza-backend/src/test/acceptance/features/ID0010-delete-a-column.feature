Feature: 010 - Delete a Column

As a user I want to be able to delete a column from the board
Background:
Given user with username Fizbin is logged in
Given the user has one board
Given the user has selected that board
Given the selected board has three columns ordered as follows:
| columnName | columnOrder |
| To Do      | 1           |
| Doing      | 2           |
| Done       | 3           |

Scenario: Delete a column from the board (Normal Flow)
When the user attempts to delete column with name "To Do"
Then the board will have the following columns:
| columnName | columnOrder |
| Doing      | 1           |
| Done       | 2           |

Scenario: Delete column that does not exist (Error Flow)
When the user attempts to delete column with name "non existant name"
Then an error "The column does not exist" is issued
Then the board will have the following columns:
| columnName | columnOrder |
| To Do      | 1           |
| Doing      | 2           |
| Done       | 3           |




