import React, { useState } from "react";

const RestockFlower = () => {
    const [flowerId, setFlowerId] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://hana-florist.onrender.com/flowers/${flowerId}/restock`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: parseInt(quantity, 10) }),
        })
            .then(() => alert("Flower restocked successfully"))
            .catch((err) => console.error("Error restocking flower:", err));
    };

    return (
        <div className="container">
            <h1>Restock Flower</h1>
            <form onSubmit={handleSubmit}>
                <label for="finame">Flower ID:</label>
                <input
                    type="text"
                    value={flowerId}
                    onChange={(e) => setFlowerId(e.target.value)}
                    required
                />

                <label for="qname">Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
                <button type="submit">Restock Flower</button>
            </form>
        </div>
    );
};

export default RestockFlower;
