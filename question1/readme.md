Program to check if two lines intersect on the x axis:

The followinf arrays are first declared:

x1_x2_array = []
x3_x4_array = []

Value of arrays are then defined. The logic is to loop across the start and end ranges of these arrays 
and see if any of the points overlap

x1 = 1
x2 = 5
x3 = 2
x4 = 6
i = x1

So, for loop is used to create array 1

for i in range(x1, x2+1):
    x1_x2_array.append(i)
print(x1_x2_array)

So, for loop is used to create array 2

for i in range(x3, x4+1):
    x3_x4_array.append(i)
print(x3_x4_array)


Now, for each index i in array 1, check if the same index in array 2 is greater than or equal to 0

for i in x1_x2_array:

    try:
        if x3_x4_array.index(i) >= 0:
            overlap = True
            break
    except Exception as e:
        e
