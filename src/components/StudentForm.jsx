import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const StudentForm = forwardRef(({ initial = {}, onSubmit, submitLabel = "Save" }, ref) => {
  const empty = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
    college: "",
    qualification: "",
  };

  const [form, setForm] = useState(empty);

  useImperativeHandle(ref, () => ({
    resetForm() {
      setForm(empty);
    },
  }));

  useEffect(() => {
    if (initial && Object.keys(initial).length > 0) {
      setForm(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email) {
      alert("Please provide at least first name and email.");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Mobile</label>
          <input name="mobile" value={form.mobile} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">DOB</label>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">College</label>
          <input name="college" value={form.college} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-12">
          <label className="form-label">Qualification</label>
          <input name="qualification" value={form.qualification} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-12 mt-2 d-flex justify-content-end">
          <button type="submit" className="btn btn-success">{submitLabel}</button>
        </div>
      </div>
    </form>
  );
});

export default StudentForm;
