Function check_versions(a, b) accepts two version strings a and b of any length 
and detemine if versions are equal or if one is greater than the other:

Steps:

1. Input from user as a and b
4. Using "." limiter, both strings are converted to arrays
2. Length of a and b is determined to check which one is shorter and by how mucht the version with max length (correction factor)
3. Correction factor is aplied and 0's are added to the shorter array to make both arrays same length
4. Each of the numbers are parsed as Int to enable comparisions
5. Until the for loop is satisfied, each of the numbers in the arrays are comapred to each other repectively
6. If one of the digits is greater, the loop breaks and sets the correponsing variable to True
7. If both variables oneisgreater or twoisgreater are not True then it means they are equal!
