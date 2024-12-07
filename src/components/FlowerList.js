import React, { useEffect, useState } from "react";

const FlowerList = () => {
    const [flowers, setFlowers] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetch(`https://hana-florist.onrender.com/flowers${status ? `?status=${status}` : ""}`)
            .then((res) => res.json())
            .then((data) => setFlowers(data))
            .catch((err) => console.error("Error fetching flowers:", err));
    }, [status]);

    return (
        <div className="container">
            <h1>Flowers</h1>
            <div className="filter">
                <button onClick={() => setStatus("")}>All</button>
                <button onClick={() => setStatus("Available")}>Available</button>
                <button onClick={() => setStatus("Sold")}>Sold</button>
            </div>
            <ul className="flower-list">
                {flowers.map((flower) => (
                    <li key={flower._id}>
                        <h3>{flower.id}. {flower.name}</h3>
                        <p>Type: {flower.type}</p>
                        <p>Price: ${flower.price}</p>
                        <p>Quantity: {flower.quantity}</p>
                        <p>Status: {flower.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FlowerList;
