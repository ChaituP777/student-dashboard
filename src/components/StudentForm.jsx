import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const StudentForm = forwardRef(({ initial = {}, onSubmit, submitLabel = "Save" }, ref) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
    college: "",
    qualification: "",
  });

  // 👇 Expose a reset method to parent
  useImperativeHandle(ref, () => ({
    resetForm() {
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        dob: "",
        college: "",
        qualification: "",
      });
    },
  }));

  useEffect(() => {
    if (initial && Object.keys(initial).length > 0) {
      setForm(initial);
    }
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
    <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
      <div>
        <label>First Name<br />
          <input name="firstName" value={form.firstName} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>Last Name<br />
          <input name="lastName" value={form.lastName} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>Email<br />
          <input name="email" value={form.email} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>Mobile<br />
          <input name="mobile" value={form.mobile} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>DOB<br />
          <input type="date" name="dob" value={form.dob} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>College<br />
          <input name="college" value={form.college} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>Qualification<br />
          <input name="qualification" value={form.qualification} onChange={handleChange} />
        </label>
      </div>
      <div style={{ marginTop: 12 }}>
        <button type="submit">{submitLabel}</button>
      </div>
    </form>
  );
});

export default StudentForm;
