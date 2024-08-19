# Melvin Gonzalez | SBA 308: JavaScript Fundamentals | 2024-35-RTT

*The following code answers questions from the SBA. I have 5 main steps, which were generally my main functions to abstract pertinent pieces of information to answer questions. Essentially, I had the following procedure:*  
 * **Step 1:** Create getLearnerID() function to create an array that stores the ID's of current learners | *Starts @ Line 99*
 * **Step 2:** Create getAssignmentsDue() function to create array that stores the ID's of assignments due, and thus used in grading. After revising code towards the end, this function now uses the helper function filterAssignmentsDue(), *line 85*, in order to cut on redundacy. | *Starts @ Line 115*
 * **Step 3:** Create getGradesSum() function to create an array of objects. Each object has 1 learner's ID and the sum of all their grades, corrected for late submissions. | *Starts @ Line 127*
 * **Step 4:** Create getAverage() function to get each learner's average within the Assignment Group. Returns an array of objects. Each object has the learner's ide, and their average for the Assignment Group. | *Starts @ Line 199*
 * **Step 5:** Create getLearnerData() function to output the learners and their overall average in an Assignment Group, plus the actual percentage score for each assignment. This code utilizes a help function calculateScore(), *line 91*, that I added later to help condense this function and improve readability as it has lots of looping.
 * **Extra Steps:** I also went back to my code, and added the previously mentioned helper functions to improve reabability and follow DRY principles. I also improved comments to add clarity of my thought process and what my code does. 

 ---  

 ### Clarity on Some Rubric Items:
 *Here, I will detail SOME of the Rubric Requirements, particularly ones that may be hard to find in my code*  
 * **if/else statements:** I don't have two if/else statements, as most of my logic dealt with only doing a certain action if there is a condition, and then move on to do actions done regardless of if-statement. While I don't have exact if/else statements, I did use ternary operators, which work the same way as if-else statements for simpler conditions. Here are two examples:  
    * **Line 92:** Here's my calculateScore() function where I used ternary operator to see if a learner's submission is late; if true: take off points for being late | else: use the learner's score as the numerator.
    * **Line 247:** Here I defined the boolean variable agInCourse with ternary operator to see if course.id == ag.course_id. if true: agIncourse = true (ag is in course) | else: false (ag is not in the course)  

* **loops:** I didn't use two separate type of loops. I didn't use while loops as I couldn't see logically why I would use one. I knew I generally would run through every element of each array as I was grabbing and modifying data. Apart from for loops used several times, I also used different methods of iterating, including using:  
    * **.forEach() method** (Example: Line 265)
    * **.map() method** (Example: Line 229)
    * **.reduce() method** (Example: Line 216)

* **break/continue:** I never used a while loop, so I never saw a purpose in using break/continue. Generally, I would have to loop through every array element to get information I needed. As the arrays have defined lengths, my code wouldn't go on forever. Perhaps, I could have used a break statement in line 267, and do a for loop through my results array, and break when we find where the id's matched, and after breaking out, create new key-value pair for the learner's calculatedScore. But my way just made more since to me and seeing .find() helps someone know what exactly I'm doing there.

* **Program outputs:** While each of my objects in my final array have the same keys and values, the orders of the keys do not match. I know objects are technically not ordered, but I tried to see methods to organize it so the formatting matches the same as the output in CodeBox. I had no luck from my online searches (nothing worked for me), but all the specific information is correct and no matter what, one can use a .find() or other methods to find out pertinent information about a certain learner.

