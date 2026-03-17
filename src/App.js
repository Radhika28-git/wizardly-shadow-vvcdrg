import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [houses, setHouses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
  });

  // Load houses
  useEffect(() => {
    axios
      .get("http://localhost:5000/houses")
      .then((res) => setHouses(res.data));
  }, []);

  // Add house
  const addHouse = async () => {
    const res = await axios.post("http://localhost:5000/houses", form);
    setHouses([...houses, res.data]);
    setForm({ title: "", location: "", price: "" });
  };

  // Delete house
  const deleteHouse = async (id) => {
    await axios.delete(`http://localhost:5000/houses/${id}`);
    setHouses(houses.filter((h) => h._id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏠 House Rent App</h1>

      <h2>Add House</h2>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <br />
      <br />

      <input
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <br />
      <br />

      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <br />
      <br />

      <button onClick={addHouse}>Add</button>

      <h2>Houses</h2>
      {houses.map((h) => (
        <div
          key={h._id}
          style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
        >
          <h3>{h.title}</h3>
          <p>{h.location}</p>
          <p>₹{h.price}</p>
          <button onClick={() => deleteHouse(h._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
