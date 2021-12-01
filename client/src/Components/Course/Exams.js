import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../../UserContext";

const Exams = (props) => {
  console.log(props.userInfo.role);

  const [xxx, setX] = useContext(UserContext);

  const exams = [];

  const deleteExam = (id) => {
    axios
      .delete(`${props.userInfo.role}/exam/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (props.courseData.cqExams) {
    props.courseData.cqExams.forEach((exam, j) => {
      if (exam.examId)
        if (
          new Date(exam.examId.date).getTime() + exam.examId.totalTime * 1000 <
          new Date().getTime()
        )
          exams.push({
            _id: exam.examId._id,
            name: exam.examId.name,
            courseName: props.courseData.name,
            date: new Date(exam.examId.date),
            totalMarks: exam.examId.totalMarks,
            examType: "cq",
            when: "previous",
            totalTime: exam.examId.totalTime,
            createdBy: props.courseData.createdBy.firstName
              ? props.courseData.createdBy.firstName
              : "" + " " + props.courseData.createdBy.lastName
              ? props.courseData.createdBy.lastName
              : "" + " " + props.courseData.createdBy.username,
          });
        else {
          exams.push({
            _id: exam.examId._id,
            name: exam.examId.name,
            courseName: props.courseData.name,
            date: new Date(exam.examId.date),
            totalMarks: exam.examId.totalMarks,
            totalTime: exam.examId.totalTime,
            examType: "cq",
            when: "upcoming",
            createdBy: props.courseData.createdBy.firstName
              ? props.courseData.createdBy.firstName
              : "" + " " + props.courseData.createdBy.lastName
              ? props.courseData.createdBy.lastName
              : "" + " " + props.courseData.createdBy.username,
          });
        }
    });
  }

  if (props.courseData.mcqExams) {
    props.courseData.mcqExams.forEach((exam, j) => {
      if (exam.examId)
        if (
          new Date(exam.examId.date).getTime() + exam.examId.totalTime * 1000 >
          new Date().getTime()
        )
          exams.push({
            _id: exam.examId._id,
            name: exam.examId.name,
            courseName: props.courseData.name,
            date: new Date(exam.examId.date),
            totalMarks: exam.examId.totalMarks,
            totalTime: exam.examId.totalTime,
            examType: "mcq",
            when: "upcoming",
            createdBy: props.courseData.createdBy.firstName
              ? props.courseData.createdBy.firstName
              : "" + " " + props.courseData.createdBy.lastName
              ? props.courseData.createdBy.lastName
              : "" + " " + props.courseData.createdBy.username,
          });
        else {
          exams.push({
            _id: exam.examId._id,
            name: exam.examId.name,
            courseName: props.courseData.name,
            date: new Date(exam.examId.date),
            totalMarks: exam.examId.totalMarks,
            totalTime: exam.examId.totalTime,
            examType: "mcq",
            when: "previous",
            createdBy: props.courseData.createdBy.firstName
              ? props.courseData.createdBy.firstName
              : "" + " " + props.courseData.createdBy.lastName
              ? props.courseData.createdBy.lastName
              : "" + " " + props.courseData.createdBy.username,
          });
        }
    });
  }

  exams.sort(function (a, b) {
    return b.date.getTime() - a.date.getTime();
  });

  let x = 1;
  const tableBody = exams.map((exam) => {
    console.log("exam->", exam);
    return (
      <>
        <tr>
          <td>{x++}</td>
          <td>{exam.name}</td>
          <td>{exam.examType}</td>
          <td>{exam.totalMarks}</td>
          <td>{`${Math.round(exam.totalTime / 60)} min : ${
            exam.totalTime % 60
          } sec`}</td>
          <td>{exam.when}</td>
          <td>{exam.date.toString()}</td>
          {props.userInfo.role === "Teacher" ? (
            <td>
              <Button
                disabled={exam.examType === "mcq" ? true : false}
                href={`/examine/${exam._id}`}
                variant="primary"
              >
                Examine
              </Button>
            </td>
          ) : null}

          <td>
            <Button href={`/${exam.when}-exam/${exam._id}`} variant="info">
              View
            </Button>
          </td>
          {props.userInfo.role === "Teacher" ? (
            <td>
              <Button onClick={() => deleteExam(exam._id)} variant="danger">
                Delete
              </Button>
            </td>
          ) : null}
        </tr>
      </>
    );
  });

  return (
    <table
      className="table table-hover table-striped table-light"
      style={{ textAlign: "center" }}
    >
      <thead className="thead-dark">
        <tr>
          <th>#</th>
          <th>Exam Name</th>
          <th>Exam Type</th>
          <th>Total Marks</th>
          <th>Total Time</th>
          <th>Condition</th>
          <th>Date</th>
          {props.userInfo.role === "Teacher" ? <th>Check</th> : null}
          <th>Action</th>
          {props.userInfo.role === "Teacher" ? <th>Delete</th> : null}
        </tr>
      </thead>

      <tbody>{tableBody}</tbody>
    </table>
  );
};

export default Exams;
