import { useState } from "react";
import "./page5.css";

const hobbies = [
  { value: "music", name: "Music" },
  { value: "movie", name: "Movies" },
  { value: "plastic-model", name: "Plastic Model" },
];

const genders = [
  { value: "male", name: "Male" },
  { value: "female", name: "Female" },
  { value: "others", name: "Others" },
];

const departments = {
  IT: ["Developer", "System Analyst", "QA Engineer"],
  HR: ["Recruiter", "HR Officer"],
  Finance: ["Accountant", "Financial Analyst"],
};

const defaultForm = {
  username: "",
  firstname: "",
  lastname: "",
  gender: "male",
  hobbies: [],
  department: "IT",
  jobPosition: "Developer",
};

function Page5() {
  const [form, setForm] = useState(defaultForm);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      setForm({
        ...form,
        department: value,
        jobPosition: departments[value][0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleHobbyChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({
        ...form,
        hobbies: [...form.hobbies, value],
      });
    } else {
      setForm({
        ...form,
        hobbies: form.hobbies.filter((hobby) => hobby !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(form);
  };

  const handleReset = () => {
    setForm(defaultForm);
    setSubmittedData(null);
  };

  return (
    <div className="container">
      <h2>User Registration</h2>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Firstname</label>
          <input
            type="text"
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Lastname</label>
          <input
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Gender</label>

          <div className="options">
            {genders.map((gender) => (
              <label key={gender.value}>
                <input
                  type="radio"
                  name="gender"
                  value={gender.value}
                  checked={form.gender === gender.value}
                  onChange={handleChange}
                />
                {gender.name}
              </label>
            ))}
          </div>
        </div>

        <div className="form-row">
          <label>Hobbies</label>

          <div className="options">
            {hobbies.map((hobby) => (
              <label key={hobby.value}>
                <input
                  type="checkbox"
                  value={hobby.value}
                  checked={form.hobbies.includes(hobby.value)}
                  onChange={handleHobbyChange}
                />
                {hobby.name}
              </label>
            ))}
          </div>
        </div>

        <div className="form-row">
          <label>Department</label>

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
          >
            {Object.keys(departments).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Job Position</label>

          <select
            name="jobPosition"
            value={form.jobPosition}
            onChange={handleChange}
          >
            {departments[form.department].map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>
        </div>

        <hr />

        <div className="buttons">
          <button type="button" onClick={handleReset}>
            Reset
          </button>

          <button type="submit">Submit</button>
        </div>
      </form>

      {submittedData && (
        <div className="result">
          <h3>Submitted Information</h3>

          <p>
            <strong>Username:</strong> {submittedData.username}
          </p>

          <p>
            <strong>Firstname:</strong> {submittedData.firstname}
          </p>

          <p>
            <strong>Lastname:</strong> {submittedData.lastname}
          </p>

          <p>
            <strong>Gender:</strong> {submittedData.gender}
          </p>

          <p>
            <strong>Department:</strong> {submittedData.department}
          </p>

          <p>
            <strong>Job Position:</strong> {submittedData.jobPosition}
          </p>

          <p>
            <strong>Hobbies:</strong>{" "}
            {submittedData.hobbies.length > 0
              ? submittedData.hobbies.join(", ")
              : "None"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Page5;
