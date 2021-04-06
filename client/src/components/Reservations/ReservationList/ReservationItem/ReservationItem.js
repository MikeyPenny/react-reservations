import React from "react";
import { connect } from "react-redux";

import * as actions from "../../../../Store/actions/index";

import Button from "@material-ui/core/Button";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

const ColorButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(red[700]),
		backgroundColor: red[500],
		"&:hover": {
			backgroundColor: red[700],
		},
		fontSize: "1rem",
	},
}))(Button);

const ReservItem = withStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		height: "90px",
		borderBottom: "1px dotted #fff",
	},
}))(ListItem);

const TextStatus = withStyles((theme) => ({
	root: {
		color: green[500],
		fontSize: "1rem",
	},
}))(Typography);

const TextTitle = withStyles((theme) => ({
	root: {
		color: "#fff",
		fontSize: "1.5rem",
		fontWeight: 500,
	},
}))(Typography);

const useStyles = makeStyles({
	itemTitle: {
		display: "flex",
		justifyContent: "flex-start",
		paddingLeft: "10px",
		boxSizing: "border-box",
		width: "50%",
	},
	itemStatus: {
		width: "20%",
	},
	itemSecond: {
		display: "flex",
		justifyContent: "center",
		width: "30%",
	},
});

const ReservationItem = (props) => {
	const { onDeleteModalOn } = props;

	const classes = useStyles();

	return (
		<ReservItem>
			<ListItemText className={classes.itemTitle}>
				<TextTitle>{props.name}</TextTitle>
			</ListItemText>
			<ListItemText className={classes.itemStatus}>
				<TextStatus>{props.status}</TextStatus>
			</ListItemText>
			<ListItemText className={classes.itemSecond}>
				<ColorButton
					variant="contained"
					color="primary"
					onClick={() => onDeleteModalOn(props.deleteId, props.name)}
				>
					Delete
				</ColorButton>
			</ListItemText>
		</ReservItem>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		onDeleteModalOn: (id, name) =>
			dispatch(actions.deleteRequestModalOn(id, name)),
	};
};

export default connect(null, mapDispatchToProps)(ReservationItem);
