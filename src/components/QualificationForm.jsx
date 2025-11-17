import React, { useState, useEffect } from "react";

const emptyQualification = () => ({
  college: "",
  qualification: "",
  yearPassing: "",
  percentage: "",
  startDate: "",
  endDate: "",
});

export default function QualificationForm({ initial = [], onChange }) {
  const [list, setList] = useState(initial.length ? initial : [emptyQualification()]);

  useEffect(() => {
    onChange(list);
  }, [list]);

  const updateField = (index, e) => {
    const { name, value } = e.target;
    setList((old) =>
      old.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const addRow = () => setList((old) => [...old, emptyQualification()]);

  const removeRow = (index) => {
    setList((old) => {
      const newArr = old.filter((_, i) => i !== index);
      return newArr.length ? newArr : [emptyQualification()];
    });
  };

  return (
    <div>
      {list.map((q, i) => (
        <div
          key={i}
          style={{
            background: "#f8faff",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <h4>Qualification #{i + 1}</h4>

          <div className="form-row">
            <div className="col">
              <label>College</label>
              <input
                name="college"
                value={q.college}
                onChange={(e) => updateField(i, e)}
              />
            </div>

            <div className="col">
              <label>Qualification</label>
              <input
                name="qualification"
                value={q.qualification}
                onChange={(e) => updateField(i, e)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="col">
              <label>Year of Passing</label>
              <input
                name="yearPassing"
                value={q.yearPassing}
                onChange={(e) => updateField(i, e)}
              />
            </div>

            <div className="col">
              <label>Percentage / CGPA</label>
              <input
                name="percentage"
                value={q.percentage}
                onChange={(e) => updateField(i, e)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="col">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={q.startDate}
                onChange={(e) => updateField(i, e)}
              />
            </div>

            <div className="col">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={q.endDate}
                onChange={(e) => updateField(i, e)}
              />
            </div>
          </div>

          <button
            type="button"
            className="btn btn-danger"
            style={{ marginTop: "10px" }}
            onClick={() => removeRow(i)}
          >
            Remove
          </button>
        </div>
      ))}

      <button type="button" className="btn btn-success" onClick={addRow}>
        + Add Qualification
      </button>
    </div>
  );
}
