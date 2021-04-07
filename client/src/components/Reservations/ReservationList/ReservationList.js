import React from "react";
import ReservationItem from "./ReservationItem/ReservationItem";

import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	reservationList: {
		width: "100%",
		height: "100%",
		color: "white",
		boxSizing: "border-box",
	},
	listItems: {
		heigth: "100px",
	},
	emptyList: {
		boxSizing: "border-box",
		paddingLeft: "20px",
	}
});

const ReservationList = (props) => {
	const classes = useStyles();

	return (
		<List className={classes.reservationList}>
			{props.reservations.length > 0
				? props.reservations.map((reservation) => (
						<ReservationItem
							data-test="item-list"
							key={reservation._id}
							deleteId={reservation._id}
							name={reservation.reservationName}
							status={reservation.status}
						/>
				  ))
				: <div className={classes.emptyList}>There are no reservations</div>}
		</List>
	);
};

export default ReservationList;
