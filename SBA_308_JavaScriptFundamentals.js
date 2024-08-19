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
  return dueAssignments;
}
// console.log(getAssignmentsDue(AssignmentGroup));

/*
STEP 3: Get SumGrades For Each Student
*/
function getGradesSum(learnerSubmissions, assignmentGroup) {
  const learnerGrades = []

  for (let learnerID of LearnerIds) {
    const gradeSum = learnerSubmissions
      .filter(learnerSubmission => AssignmentsDue.includes(learnerSubmission.assignment_id))
      .filter(learnerSubmission => learnerSubmission.learner_id === learnerID)
      .reduce((accumulator, currentValue) => accumulator + currentValue.submission.score, 0);
    
    learnerGrades.push(
      {
        id: learnerID,
        sum: gradeSum
      });
  };

  filteredAssignments = assignmentGroup.assignments.filter(assignment => AssignmentsDue.includes(assignment.id))

  for (assignment of filteredAssignments) {
    for (learnerSubmission of learnerSubmissions) {
      if (learnerSubmission.assignment_id === assignment.id && learnerSubmission.submission.submitted_at > assignment.due_at) {
        learnerGrades.map(eachLearnerGrade => {
          eachLearnerGrade.sum -= (eachLearnerGrade.id == learnerSubmission.learner_id)? (assignment.points_possible *.10): 0;
        });
      }
    };
  };

  return learnerGrades;
}
console.log(getGradesSum(LearnerSubmissions, AssignmentGroup))
