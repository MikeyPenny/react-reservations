import React, { useEffect, useMemo, useRef } from "react";
import { connect } from "react-redux";
import ReservationList from "./ReservationList/ReservationList";

import "@fontsource/roboto";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import * as actions from "../../Store/actions/index";
import classes from "./Reservation.module.css";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import PopOver from "../UI/PopOver/PopOver";

const useStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(green[600]),
		backgroundColor: green[500],
		"&:hover": {
			backgroundColor: green[700],
		},
		fontSize: "1rem",
	},
}));

export const Reservation = (props) => {
	// const [stateReservation, setReservations] = useState([]);
	const anchorELem = useRef();
	const { onFetchReservations, reservations, isLoading } = props;
	const styles = useStyles();
	const history = useHistory();

	useEffect(() => {
		if (isLoading) {
			const timer = setTimeout(() => {
				onFetchReservations();
			}, 1500);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [onFetchReservations, isLoading]);

	const reservList = useMemo(() => {
		return <ReservationList reservations={reservations} />;
	}, [reservations]);

	const createReservationHandler = (e) => {
		e.preventDefault();
		history.push("/create");
	};

	return (
		<div className={classes.Reservation}>
			<header className={classes.Header}>
				<Typography variant="h3" gutterBottom>
					Reservations
				</Typography>
			</header>
			<section
				ref={anchorELem}
				className={`${classes.Content} ${classes.Scrollbar} `}
			>
				<div className={classes.PopContainer}>
					<PopOver anchor={anchorELem.current} />
				</div>
				{isLoading ? <CircularProgress /> : reservList}
			</section>
			<footer className={classes.Footer}>
				<div className={classes.Row}>
					<Button
						className={styles.root}
						variant="contained"
						color="primary"
						onClick={(e) => createReservationHandler(e)}
					>
						Create Reservation
					</Button>
				</div>
			</footer>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		reservations: state.reservations,
		isLoading: state.loading,
		modal: state.modal,
		deleteId: state.deleteId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchReservations: () => dispatch(actions.fetchReservations()),
		onDeleteModalOn: (id) => dispatch(actions.deleteRequestModalOn(id)),
		onDeleteModalOff: () => dispatch(actions.deleteRequestModalClose()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);
