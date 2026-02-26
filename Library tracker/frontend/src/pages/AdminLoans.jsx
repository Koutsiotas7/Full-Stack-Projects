import { useState, useEffect } from "react";
import api from "../api/axios";

function AdminLoans() {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState("");
  const [showOverdue, setShowOverdue] = useState(false);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const endpoint = showOverdue ? "/loans/overdue" : "/loans";
        const response = await api.get(endpoint);
        setLoans(response.data);
      } catch (err) {
        setError("Failed to load the loans!!!");
      }
    };

    fetchLoans();
  }, [showOverdue]);

  return (
    <>
      <h2>Admin DashBoard</h2>

      <button onClick={() => setShowOverdue(false)}>All Loans</button>
      <button onClick={() => setShowOverdue(true)}>Overdue Loans</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loans.length === 0 ? (
        <p>No loans found!!!!</p>
      ) : (
        loans.map((loan) => {
          // ✅ Overdue detection logic per loan
          const isOverdue =
            !loan.returnedAt && new Date(loan.dueDate) < new Date();

          return (
            <div key={loan._id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
              <h3>{loan.bookId.title}</h3>
              <p>
                User: {loan.userId.name} ({loan.userId.email})
              </p>
              <p>Due Date: {new Date(loan.dueDate).toLocaleDateString()}</p>
              <p>
                Status:{" "}
                {loan.returnedAt ? (
                  <span style={{ color: "green" }}>Returned!</span>
                ) : isOverdue ? (
                  <span style={{ color: "red", fontWeight: "bold" }}>Overdue</span>
                ) : (
                  <span style={{ color: "orange" }}>Active</span>
                )}
              </p>
            </div>
          );
        })
      )}
    </>
  );
}

export default AdminLoans;