
x1_x2_array = []
x3_x4_array = []

x1 = 1
x2 = 5
x3 = 2
x4 = 6
i = x1

for i in range(x1, x2+1):
    x1_x2_array.append(i)
print(x1_x2_array)


for i in range(x3, x4+1):
    x3_x4_array.append(i)
print(x3_x4_array)


overlap = False

for i in x1_x2_array:

    try:
        if x3_x4_array.index(i) >= 0:
            overlap = True
            break
    except Exception as e:
        e


if overlap:
    print("x1x2 is overlapping with x2x4")
else:
    print("x1x2 are not overlapping")
