import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";

const StudentForm = forwardRef(({ initial, onChange }, ref) => {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
  });

  useEffect(() => {
    if (initial) setStudent(initial);
  }, [initial]);

  useImperativeHandle(ref, () => ({
    getStudentData: () => student,
    resetForm: () =>
      setStudent({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        dob: "",
      }),
  }));

  const update = (e) => {
    const updated = { ...student, [e.target.name]: e.target.value };
    setStudent(updated);
    onChange(updated);
  };

  return (
    <div className="form-card">
      <h2 className="form-title">Student Details</h2>

      <div className="form-row">
        <div className="col">
          <label>First Name</label>
          <input name="firstName" value={student.firstName} onChange={update} />
        </div>
        <div className="col">
          <label>Last Name</label>
          <input name="lastName" value={student.lastName} onChange={update} />
        </div>
      </div>

      <div className="form-row">
        <div className="col">
          <label>Email</label>
          <input name="email" value={student.email} onChange={update} />
        </div>
        <div className="col">
          <label>Mobile</label>
          <input name="mobile" value={student.mobile} onChange={update} />
        </div>
      </div>

      <div className="form-row">
        <div className="col">
          <label>Date of Birth</label>
          <input type="date" name="dob" value={student.dob} onChange={update} />
        </div>
      </div>
    </div>
  );
});

export default StudentForm;
