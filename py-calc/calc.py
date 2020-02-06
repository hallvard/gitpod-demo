operators = {
    '+': lambda n1, n2: n1 + n2,
    '-': lambda n1, n2: n1 - n2,
}

# find the position of the next token to apply in the tokens list, or -1 if no token can be found
def findNextOperator(tokens) :
    # complete the function

def compute(operand1, operator, operand2):
    if not isinstance(operand1, float):
        operand1 = float(operand1)
    if not isinstance(operand2, float):
        operand2 = float(operand2)
    return operators[operator](operand1, operand2)

list = []
while True:
    line = raw_input(" ".join(list) + " ")
    if len(line) == 0:
        break
    list = list + line.split()
    while len(list) > 0:
        pos = findNextOperator(list)
        if pos < 0:
            break
        operand1 = list[pos - 1]
        operator = list[pos]
        operand2 = list[pos + 1]
        # compute the result (and convert to a string)
        result = str(compute(operand1, operator, operand2))
        # reduce by assemling a new list where the operands and operator are replaced by the result
        list = # complete the statement
        print(list)
