operators = {
    '+': lambda n1, n2: n1 + n2,
    '-': lambda n1, n2: n1 - n2,
    '*': lambda n1, n2: n1 * n2,
    '/': lambda n1, n2: n1 / n2,
}

def findNextOperator(tokens) :
    for idx, token in enumerate(tokens):
        if token in operators:
            return idx
    return -1

def compute(operand1, operator, operand2):
    if not isinstance(operand1, float):
        operand1 = float(operand1)
    if not isinstance(operand2, float):
        operand2 = float(operand2)
    return operators[operator](operand1, operand2)

list = []
while True:
    line = raw_input(" ".join(list))
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
        list = list[0 : pos - 1] + [str(compute(operand1, operator, operand2))] + list[pos + 2 :]
