import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [tokens, setTokens] = useState([]);

  const fetchTokens = async () => {
    const res = await axios.get("http://localhost:5000/api/tokens");
    setTokens(res.data);
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const addToken = async () => {
    if (!name || !service) {
      alert("Enter all fields");
      return;
    }

    await axios.post("http://localhost:5000/api/tokens/add", {
      name,
      service
    });

    setName("");
    setService("");
    fetchTokens();
  };

  const markDone = async (id) => {
    await axios.put(`http://localhost:5000/api/tokens/${id}`);
    fetchTokens();
  };

  const removeToken = async (id) => {
    await axios.delete(`http://localhost:5000/api/tokens/${id}`);
    fetchTokens();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
       background: "linear-gradient(135deg, #d4c1ec, #a1c4fd)",
        fontFamily: "Segoe UI",
        color: "#1e293b"
      }}
    >
      <h1 style={{ marginBottom: 20 }}>QueueLess System</h1>

      {/* INPUT SECTION */}
      <div style={{ marginBottom: 30 }}>
        <input
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            marginRight: 10,
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
        />

        <input
          placeholder="Enter Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          style={{
            marginRight: 10,
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={addToken}
          style={{
            padding: 10,
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Get Token
        </button>
      </div>

      <h3 style={{ marginBottom: 15 }}>Queue</h3>

      {/* TOKEN BOXES */}
      <div style={{ width: "420px" }}>
        {tokens.length === 0 ? (
          <p style={{ textAlign: "center" }}>No tokens</p>
        ) : (
          tokens.map((t) => (
            <div
              key={t._id}
              style={{
                marginBottom: 15,
                padding: 15,
                borderRadius: 10,
                backgroundColor:
                  t.status === "done" ? "#d1fae5" : "#ffffff",
                borderLeft:
                  t.status === "done"
                    ? "6px solid #16a34a"
                    : "6px solid #f59e0b",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
              }}
            >
              <strong style={{ fontSize: 16 }}>
                Token #{t.tokenNumber}
              </strong>
              <br />

              <span>{t.name}</span> — <span>{t.service}</span>
              <br />

              Status:{" "}
              <b style={{ color: t.status === "done" ? "green" : "orange" }}>
                {t.status}
              </b>

              <div style={{ marginTop: 10 }}>
                {/* DONE BUTTON */}
                {t.status === "waiting" && (
                  <button
                    onClick={() => markDone(t._id)}
                    style={{
                      marginRight: 10,
                      padding: "6px 10px",
                      backgroundColor: "#22c55e",
                      color: "white",
                      border: "none",
                      borderRadius: 5,
                      cursor: "pointer"
                    }}
                  >
                    Done
                  </button>
                )}

                {/* REMOVE BUTTON */}
                {t.status === "done" && (
                  <button
                    onClick={() => removeToken(t._id)}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: 5,
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;