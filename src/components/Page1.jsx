import { useRef, useState } from "react";

const hobbies = [
  {
    value: "music",
    name: "Music",
  },
  {
    value: "movie",
    name: "Movies",
  },
  {
    value: "plastic-model",
    name: "Plastic Model",
  },
];

const genders = [
  {
    value: "male",
    name: "Male",
  },
  {
    value: "female",
    name: "Female",
  },
  {
    value: "others",
    name: "Others",
  },
];

const departments = [
  {
    value: "accounting",
    name: "Accounting",
    jobs: [
      { value: "accountant", name: "Accountant" },
      { value: "auditor", name: "Auditor" },
      { value: "finance-manager", name: "Finance Manager" },
    ],
  },
  {
    value: "engineering",
    name: "Engineering",
    jobs: [
      { value: "developer", name: "Developer" },
      { value: "qa-engineer", name: "QA Engineer" },
      { value: "devops-engineer", name: "DevOps Engineer" },
    ],
  },
  {
    value: "sales",
    name: "Sales",
    jobs: [
      { value: "sales-executive", name: "Sales Executive" },
      { value: "account-manager", name: "Account Manager" },
    ],
  },
];

const defaultFormState = {
  username: "",
  firstname: "",
  lastname: "",
  gender: genders[0].value,
  hobbies: [],
  department: departments[0].value,
  job: departments[0].jobs[0].value,
};

function Page1() {
  const [form, setForm] = useState(defaultFormState);
  const [submittedData, setSubmittedData] = useState(null);
  const formRef = useRef(null);

  const selectedDepartment = departments.find(
    (dept) => dept.value === form.department,
  );

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "department") {
      const newDept = departments.find((dept) => dept.value === value);
      setForm((prev) => ({
        ...prev,
        department: value,
        job: newDept.jobs[0].value,
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleHobbyChange(e) {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      hobbies: checked
        ? [...prev.hobbies, value]
        : prev.hobbies.filter((h) => h !== value),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmittedData(form);
  }

  function handleReset() {
    setForm(defaultFormState);
    setSubmittedData(null);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>User Registration</h2>
        <hr style={styles.hr} />

        <form onSubmit={handleSubmit} onReset={handleReset} ref={formRef}>
          <div style={styles.formGrid}>
            <div style={styles.row}>
              <label htmlFor="username" style={styles.label}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.row}>
              <label htmlFor="firstname" style={styles.label}>
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.row}>
              <label htmlFor="lastname" style={styles.label}>
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.row}>
              <label style={styles.label}>Gender</label>
              <div style={styles.inlineGroup}>
                {genders.map((g) => (
                  <label key={g.value} style={styles.inlineLabel}>
                    <input
                      type="radio"
                      id={`gender-${g.value}`}
                      name="gender"
                      value={g.value}
                      checked={form.gender === g.value}
                      onChange={handleChange}
                    />
                    {g.name}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.row}>
              <label style={styles.label}>Hobbies</label>
              <div style={styles.inlineGroup}>
                {hobbies.map((h) => (
                  <label key={h.value} style={styles.inlineLabel}>
                    <input
                      type="checkbox"
                      id={`hobby-${h.value}`}
                      name="hobbies"
                      value={h.value}
                      checked={form.hobbies.includes(h.value)}
                      onChange={handleHobbyChange}
                    />
                    {h.name}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.row}>
              <label htmlFor="department" style={styles.label}>
                Department
              </label>
              <select
                id="department"
                name="department"
                value={form.department}
                onChange={handleChange}
                style={styles.select}
              >
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.row}>
              <label htmlFor="job" style={styles.label}>
                Job Position
              </label>
              <select
                id="job"
                name="job"
                value={form.job}
                onChange={handleChange}
                style={styles.select}
              >
                {selectedDepartment.jobs.map((job) => (
                  <option key={job.value} value={job.value}>
                    {job.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <hr style={styles.hr} />

          <div style={styles.buttonRow}>
            <button type="reset" style={styles.resetButton}>
              Reset
            </button>
            <button type="submit" style={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>

        {submittedData && (
          <div style={styles.resultBox}>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Username</span>
              <span>{submittedData.username}</span>
            </div>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Firstname</span>
              <span>{submittedData.firstname}</span>
            </div>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Lastname</span>
              <span>{submittedData.lastname}</span>
            </div>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Hobbies</span>
              <span>{submittedData.hobbies.join(", ") || "-"}</span>
            </div>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Gender</span>
              <span>{submittedData.gender}</span>
            </div>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Department</span>
              <span>{submittedData.department}</span>
            </div>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Job</span>
              <span>{submittedData.job}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "30px",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    padding: "30px",
    boxSizing: "border-box",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    color: "#374151",
    fontWeight: "bold",
  },

  hr: {
    border: "none",
    borderTop: "1px solid #d1d5db",
    margin: "20px 0",
  },

  formGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "180px 1fr",
    alignItems: "center",
    gap: "20px",
  },

  label: {
    fontSize: "18px",
    color: "#4b5563",
    fontWeight: 500,
  },

  input: {
    width: "100%",
    maxWidth: "500px",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    outline: "none",
    boxSizing: "border-box",
  },

  select: {
    width: "300px",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    background: "#fff",
    boxSizing: "border-box",
  },

  inlineGroup: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
    flexWrap: "wrap",
    fontSize: "17px",
  },

  inlineLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
  },

  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    marginTop: "10px",
  },

  resetButton: {
    padding: "12px 30px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    background: "#f3f4f6",
    cursor: "pointer",
  },

  submitButton: {
    padding: "12px 30px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  resultBox: {
    marginTop: "30px",
    padding: "25px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    background: "#f9fafb",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  resultRow: {
    display: "grid",
    gridTemplateColumns: "180px 1fr",
  },

  resultLabel: {
    fontWeight: "bold",
    color: "#374151",
  },
};

export default Page1;
