# Python calculator

This project contains a very simple Python calculator supporting simple expressions with + and - operators.
The algorithm is simple:

- read a line of text and split into a list of tokens, that are appended to whatever is left from earlier
- reduce the list of tokens by selecting one operator and applying it to the operands before and after it
- continue until the list is empty or no operator can be found

Some small parts of the code has been removed, as noted in comments.

## Configuraiton

This project is just a plain folder and the single Python file is run directly.

## Usage

The code can be run using `python calc.py`. Enter the expression with spaces between operands and operators, e.g. `1 + 2 - 3`.
The list of (remaining) tokens will be printed after each reduction step, e.g. `[3.0 - 3]` and `[0.0]`.

But to run it you must complete the code in [calc.py](calc.py), as follows:

- Implement the `findNextOperator` function so it correctly reduces the expression. Hint: Use the `operators` dictionary.
- Complete the line that reduces the evaluated sub-expression.

After making it work, try the following improvement:
- Add more (binary) operators, e.g. `*`  and `/` operators.
- Modify the `findNextOperator` function so it selects the left-most operator with the highest precedence.
This may require adding a data structure for representing precedence.
- Add support for unary (prefix) operators (difficult).
