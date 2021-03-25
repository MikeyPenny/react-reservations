const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Reservation = require("../models/reservation");

router.get("/reservations", async (req, res) => {
	try {
		const reservations = await Reservation.find();
		res.status(200).json({ reservations: reservations });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post("/new-reservation", async (req, res) => {
	try {
		let newReservation = new Reservation({
			_id: new mongoose.Types.ObjectId(),
			reservationName: req.body.reservationName,
			store: req.body.store,
			status: req.body.status,
		});

		const reservation = await Reservation.create(newReservation);
		res.status(200).json({ message: "Reservation created", reservation });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.delete("/reservation/:id", async (req, res) => {
	try {
		const reservation = await Reservation.findOne({ _id: req.params.id });

		if (!reservation)
			return res.status(401).json({ message: "Reservation unreachable" });

		await Reservation.deleteOne({ _id: req.params.id });
		res.status(200).json({ message: "Reservation deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
