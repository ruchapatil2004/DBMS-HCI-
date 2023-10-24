const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const booknowSchema = new Schema({
    Check_in: {
        type: String,
        required: true,
    },
    Check_out: {
        type: String,
        required: true,
    },
    Adults: Number,
    Children: Number,
});

const Booking = mongoose.model("Booking", booknowSchema);

module.exports = Booking;
