

def check_versions(a, b):
    v1 = a
    v2 = b
    array_1 = v1.split(".")
    array_2 = v2.split(".")
    # Routine to check size of both arrays and equalize length
    max_array_size = max(len(array_1), len(array_2))
    min_array_size = min(len(array_1), len(array_2))
    correction_factor = max_array_size - min_array_size
    print("Correction factor is", correction_factor)
    # Correct arrays
    if len(array_1) > len(array_2):
        for i in range(correction_factor):
            array_2.append("0")
    elif len(array_1) < len(array_2):
        for i in range(abs(correction_factor)):
            array_1.append("0")

    oneisgreater = False
    twoisgreater = False
    iq = 0
    for iq in range(len(array_1)):
        if int(array_1[iq]) > int(array_2[iq]):
            oneisgreater = True
            break
        elif int(array_1[iq]) < int(array_2[iq]):
            twoisgreater = True
            break
    if oneisgreater:
        print("Version ", v1, " is greater than version ", v2)

    elif twoisgreater:
        print("Version ", v2, " is greater than version ", v1)
    else:
        print("Version ", v1, " and version ", v2, " are equal")


check_versions("1.2.1", "1.3")
