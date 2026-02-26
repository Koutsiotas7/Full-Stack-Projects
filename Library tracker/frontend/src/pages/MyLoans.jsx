import { useEffect, useState } from "react";
import api from "../api/axios";

function MyLoans() {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await api.get("/loans/my-loans");
        setLoans(response.data);
      } catch (err) {
        setError("Failed to load loans");
      }
    };

    fetchLoans();
  }, []);

  const handleReturn = async (loanId) => {
    try {
      await api.put(`/loans/return/${loanId}`);
      setLoans(loans.map(loan =>
        loan._id === loanId
          ? { ...loan, returnedAt: new Date() }
          : loan
      ));
    } catch (err) {
      alert(err.response?.data?.message || "Return failed");
    }
  };

  return (
    <div>
      <h2>My Loans</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loans.length === 0 ? (
        <p>No loans found.</p>
      ) : (
        loans.map((loan) => (
          <div key={loan._id} style={{ marginBottom: "20px" }}>
            <h4>{loan.bookId.title}</h4>
            <p>Author: {loan.bookId.author}</p>
            <p>Due Date: {new Date(loan.dueDate).toLocaleDateString()}</p>

            {loan.returnedAt ? (
              <p style={{ color: "green" }}>Returned</p>
            ) : (
              <button onClick={() => handleReturn(loan._id)}>
                Return
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyLoans;