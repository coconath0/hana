import React, { useState } from "react";

const AddFlower = () => {
    const [flower, setFlower] = useState({
        name: "",
        type: "",
        price: "",
        quantity: "",
        status: "Available",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/flowers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(flower),
        })
            .then(() => alert("Flower added successfully"))
            .catch((err) => console.error("Error adding flower:", err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlower({ ...flower, [name]: value });
    };

    return (
        <div className="container">
            <h1>Add Flower</h1>
            <form onSubmit={handleSubmit}>
                <label for="fname">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={flower.name}
                    onChange={handleChange}
                />

                <label for="tname">Type:</label>
                <input
                    type="text"
                    name="type"
                    value={flower.type}
                    onChange={handleChange}
                />

                <label for="pname">Price:</label>
                <input
                    type="number"
                    name="price"
                    value={flower.price}
                    onChange={handleChange}
                />

                <label for="qname">Quantity:</label>
                <input
                    type="number"
                    name="quantity"
                    value={flower.quantity}
                    onChange={handleChange}
                />
                <button type="submit">Add Flower</button>
            </form>
        </div>
    );
};

export default AddFlower;
