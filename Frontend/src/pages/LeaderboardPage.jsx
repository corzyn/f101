import { useEffect, useState } from "react";
import { fetchScores } from "../services/leaderboardService";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function LeaderboardPage() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [limit, setLimit] = useState(10);         
  const [sortOrder, setSortOrder] = useState("desc");

  const loadScores = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchScores({ limit, sortOrder });
      setScores(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScores();
  }, [limit, sortOrder]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ maxWidth: 800, margin: "50px auto" }}>
      <Header />
      <h1>Leaderboard</h1>
      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <div>
          <label>Limit wyników: </label>
          <select value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}>
            {[5, 10, 20, 50].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Sortowanie: </label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Najwyższe wyniki</option>
            <option value="asc">Najniższe wyniki</option>
          </select>
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Miejsce</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Gracz</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Wynik</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((item, index) => (
            <tr key={item._id}>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{index + 1}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>
                <Link to={`/profiles/${item._id}`}>{item.name}</Link>
              </td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardPage;
