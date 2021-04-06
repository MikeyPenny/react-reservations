import React from "react";
import { connect } from "react-redux";

import * as actions from "../../../Store/actions/index";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import WarningSharpIcon from "@material-ui/icons/WarningSharp";
import { red } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		justifyContent: "center",
		[theme.breakpoints.up("md")]: {
			"& .MuiPaper-elevation8": {
				width: "40%",
			},
		},
	},
	messageTitle: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",

		padding: theme.spacing(2),
	},
	message: {
		width: "90%",
		textAlign: "justify",
		margin: "0 auto",
		fontSize: 18,
	},
	footer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginBottom: "5px",
	},
	row: {
		display: "flex",
		justifyContent: "flex-end",
		width: "90%",
	},
}));

const DeletButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(red[600]),
		backgroundColor: red[500],
		"&:hover": {
			backgroundColor: red[700],
		},
		fontSize: "1rem",
	},
}))(Button);

const CancelButton = withStyles((theme) => ({
	root: {
		color: "#a3a3a3",
		backgroundColor: "transparent",
		"&:hover": {
			backgroundColor: "#e6d7d7",
		},
		fontSize: "1rem",
	},
}))(Button);

const PopOver = (props) => {
	const {
		modal,
		onDeleteModalOff,
		anchor,
		reservName,
		deleteId,
		onDeleteReservation,
	} = props;
	const styles = useStyles();
	const anchorEl = anchor;

	const id = modal ? "simple-popover" : undefined;

	return (
		<div>
			<Popover
				id={id}
				className={styles.container}
				open={modal}
				anchorEl={anchorEl}
				onClose={onDeleteModalOff}
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				<div className={styles.messageTitle}>
					<WarningSharpIcon
						fontSize="large"
						style={{ color: red[500], marginRight: "10px" }}
					/>
					<p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
						Delete reservation
					</p>
				</div>
				<div className={styles.message}>
					<p>
						{`You are about to delete the reservation '${reservName}'. If you proceed with
						this action the item will be permanently deleted.`}
					</p>
				</div>
				<div className={styles.footer}>
					<div className={styles.row}>
						<DeletButton
							variant="contained"
							color="primary"
							onClick={() => onDeleteReservation(deleteId)}
						>
							Delete
						</DeletButton>
						<CancelButton
							variant="contained"
							color="primary"
							onClick={onDeleteModalOff}
						>
							Cancel
						</CancelButton>
					</div>
				</div>
			</Popover>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		modal: state.modal,
		deleteId: state.deleteId,
		reservName: state.reservName,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onDeleteModalOff: () => dispatch(actions.deleteRequestModalClose()),
		onDeleteReservation: (id) => dispatch(actions.deleteReservationRequest(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PopOver);
