const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/BookDB";
const Booking = require("./models/book.js");
const Order = require("./models/order.js"); 
const path = require("path");

app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log("Cannot connect to DB");
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "hotel.html")); 
});


app.post("/", async (req, res) => {
    const booknow = new Booking(req.body);

    try {
        await booknow.save();
        console.log("Booking saved:", booknow);
        res.redirect("/");
    } catch (error) {
        console.error("Error saving booking:", error);
        res.status(500).send("Error saving booking");
    }
});

app.get("/order", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "order.html")); 
});

app.post("/order", async (req, res) => {
    const order = new Order(req.body);
    const orderName =req.body.name;
    const cancel=req.body.cancel;
    if(cancel==="YES"){
        const deletedOrder = await Order.findOneAndDelete({ name: orderName });
        res.redirect("/"); 
    }
    else{
        try {
            const savedOrder = await order.save();
            console.log("Order Saved:", savedOrder); 
            res.redirect("/"); 
        } catch (error) {
            console.error("Error saving order:", error);
            res.status(500).send("Error saving order");
        }
    }
 
});

app.delete("/order/:name", async (req, res) => {
    const orderName = req.params.name;

    try {
         const deletedOrder = await Order.findOneAndDelete({ name: orderName });

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order canceled successfully", canceledOrder: deletedOrder });
    } catch (error) {
        console.error("Error canceling order:", error);
        res.status(500).json({ message: "Error canceling order" });
    }
});



app.listen(port, () => {
    console.log("App running on port:", port);
});
