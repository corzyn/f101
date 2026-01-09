import { useEffect, useState } from "react";
import { fetchUser, deleteUser, updateUser } from "../services/profileServices";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";

function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(id)
      .then((data) => setUser(data))
      .catch(() => setError("Wystąpił błąd podczas ładowania użytkownika."));
  }, [id]);

  const handleDelete = () => {
    console.log("Usuwam użytkownika o ID:", id);
    deleteUser(id)
      .then(() => {
        navigate("/users");
      })
      .catch(() => {
        setError("Nie udało się usunąć użytkownika.");
      });
  };

  const handleUpdate = () => {
    if (!newName) {
      setError("Nazwa nie może być pusta.");
      return;
    }
    updateUser(id, newName)
      .then((updatedUser) => {
        setUser(updatedUser);
        setIsEditing(false);
      })
      .catch(() => {
        setError("Nie udało się zaktualizować użytkownika.");
      });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Ładowanie...</p>;
  }

  return (
    <div>
      <Header />
      <div>
        {!isEditing ? (
          <>
            <h1>{user.name}</h1>
            <button onClick={() => setIsEditing(true)}>Zaktualizuj nazwę</button>
            <button onClick={handleDelete}>Usuń użytkownika</button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Wpisz nową nazwę"
            />
            <button onClick={handleUpdate}>Zapisz nazwę</button>
            <button onClick={() => setIsEditing(false)}>Anuluj</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
