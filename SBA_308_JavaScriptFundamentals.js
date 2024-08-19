// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

/**************************************************************************************************************
 ************************************************ MY CODE BEGINS HERE *****************************************
 *************************************************************************************************************/
//Defining Variables used throughout.
let LearnerIds = getLearnerID(LearnerSubmissions)
let AssignmentsDue = getAssignmentsDue(AssignmentGroup)
let GradesSum = getGradesSum(LearnerSubmissions, AssignmentGroup)
let Average = getAverage(AssignmentGroup)

/*
STEP 1: Get Learner ID 
*/
function getLearnerID(learnerSubmissions) {
  const learnerIdArray = [];

  learnerSubmissions.map(function (object) {
    if (!learnerIdArray.includes(object["learner_id"])) {
      learnerIdArray.push(object["learner_id"]);
    }
  });

  return learnerIdArray;
}
// console.log(getLearnerID(LearnerSubmissions));

/*
STEP 2: Get Assignments Due 
*/
function getAssignmentsDue(assignmentGroup) {
  dueAssignments = [];
  for (assignment of assignmentGroup.assignments) {
    if (assignment.due_at <= new Date().toISOString().slice(0, 10)) {
      dueAssignments.push(assignment.id);
    }
  }
  //Comparing Date objects is easier as Strings, and slicing out just the initial 10 characters(YYYY-MM-DD)
  return dueAssignments;
}
// console.log(getAssignmentsDue(AssignmentGroup));

/*
STEP 3: Get SumGrades For Each Student
*/
function getGradesSum(learnerSubmissions, assignmentGroup) {
  const learnerGrades = []            //array objects with keys of id, sum to be initialized after summing

  for (let learnerID of LearnerIds) {
    /*
    ¤A: gradeSum variable holds total sum for each Learner
    ¤B: LearnerIds is Array of LearnerIds, calculated by function in Step 1.
    ¤C: learnerSubmissions parameter is filtered to only include assignments due(where AssignmentsDue array defined by function in Step 2 includes the learnerSubmission element's assignment_id)
    ¤D: This parameter is then filtered to be only the learnerSubmission element's with matching learner_id to the learnerID element referenced in for-loop initialization (so only submissions for this learnerID)
    ¤E: Finally we use reduce to condense the scores for the learner into one sum (all the filters ensure we are doing it just for that student, and for assignments actually due)
    */
    const gradeSum = learnerSubmissions
      .filter(learnerSubmission => AssignmentsDue.includes(learnerSubmission.assignment_id))
      .filter(learnerSubmission => learnerSubmission.learner_id === learnerID)
      .reduce((accumulator, currentValue) => accumulator + currentValue.submission.score, 0);
    
    learnerGrades.push(           //pushing the learnerID and gradeSum values.
      {
        id: learnerID,
        sum: gradeSum
      });
  };

  filteredAssignments = assignmentGroup.assignments.filter(assignment => AssignmentsDue.includes(assignment.id))
  /*
  ¤A: filteredAssignments is array of assignment objects from AssignmentGroup that are actually due (AssignmentsDue variable is defined in Line 84, with the Function in Step 2)
  ¤B: Psuedocode logic of for loop is as follows:
      for each filteredAssignment:
        for each learnerSubmission:
          if learnerSubmission.assignment_id matches the assignment.id AND learner's submission is late:
            then learnerGrades array runs a map function through eachLearnerGrade:
              if learnerGrade.id is equal to the learner_id of the learner with late submission: 
                then that eachLearnerGrade.sum value subtracts the assignmeent.points_possible*.10
              if not:
                then subtract 0 AKA don't change score.
  */

  for (let assignment of filteredAssignments) {
    for (let learnerSubmission of learnerSubmissions) {
      if (learnerSubmission.assignment_id === assignment.id && learnerSubmission.submission.submitted_at > assignment.due_at) {
        learnerGrades.map(eachLearnerGrade => {
          eachLearnerGrade.sum -= (eachLearnerGrade.id == learnerSubmission.learner_id)? (assignment.points_possible *.10): 0;
        });
      }
    };
  };

  return learnerGrades;
}
// console.log(getGradesSum(LearnerSubmissions, AssignmentGroup))

/*
STEP 4: Get total Avg in AssignmentGroup
*/
function getAverage(assignmentGroup) {
  const gradesAverage = [...GradesSum]  //gradeAverage is copy of gradeSum declared at beginning of my code

  //Filter assignments to those due, then sum up the points_possible
  totalPointsPossible = assignmentGroup.assignments
    .filter(assignment => AssignmentsDue.includes(assignment.id))
    .reduce((accumulator, currentValue) => accumulator + currentValue.points_possible, 0);

  //take each object and create avg key with value of the object.sum/totalPointsPossible
  //Delete the sum key now as no longer needed.
  gradesAverage.map( eachGradeAverage => {
    eachGradeAverage['avg'] = eachGradeAverage.sum/totalPointsPossible
    delete eachGradeAverage.sum
  });

  return gradesAverage
}
// console.log(getAverage(AssignmentGroup))

/*
STEP 5: Get Actual Score for Each Assignment for Each Learner
*/
function getLearnerData(course, ag, submissions) {
  const results = [...Average]

    ag.assignments
      .filter(assignment => AssignmentsDue.includes(assignment.id))
      .forEach(assignment => {
        submissions.forEach(submission => {
            if (submission.assignment_id === assignment.id) {
              const learnerResult = results.find(result => result.id === submission.learner_id)

              const score = (submission.submission.submitted_at > assignment.due_at)? 
              (submission.submission.score - (assignment.points_possible *.10) ) / assignment.points_possible:
              (submission.submission.score) / assignment.points_possible;
              
              learnerResult[Number(submission.assignment_id)] = score;
            }
        });
      });
    return results
}
console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));

