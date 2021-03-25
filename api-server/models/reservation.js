const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	reservationName: String,
	store: String,
	status: String,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
