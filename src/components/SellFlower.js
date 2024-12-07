import React, { useState } from "react";

const SellFlower = () => {
    const [flowerId, setFlowerId] = useState("");
    const [customer, setCustomer] = useState("");
    const [dateSold, setDateSold] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://hana-florist.onrender.com/flowers/${flowerId}/sell`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ customer, dateSold }),
        })
            .then(() => alert("Flower marked as sold"))
            .catch((err) => console.error("Error selling flower:", err));
    };

    return (
        <div className="container">
            <h1>Sell Flower</h1>
            <form onSubmit={handleSubmit}>
                <label for="finame">Flower ID:</label>
                <input
                    type="text"
                    value={flowerId}
                    onChange={(e) => setFlowerId(e.target.value)}
                    required
                />
                <label for="cname">Customer Name:</label>
                <input
                    type="text"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    required
                />
                <label for="dname">Date:</label>
                <input
                    type="date"
                    value={dateSold}
                    onChange={(e) => setDateSold(e.target.value)}
                    required
                />
                <button type="submit">Sell Flower</button>
            </form>
        </div>
    );
};

export default SellFlower;
