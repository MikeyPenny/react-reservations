import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import * as actions from "../../../Store/actions/index";

import {
	Button,
	FormControl,
	FormControlLabel,
	FormHelperText,
	InputLabel,
	makeStyles,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	TextField,
	Typography,
	withStyles,
} from "@material-ui/core";

import classes from "./CreateReservation.module.css";
import { green, grey, teal } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
	menu: {
		"& .MuiPaper-root": {
			color: "#fff",
			backgroundColor: "#2a2a2a",
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: teal[500],
			},
			"&:hover fieldset": {
				borderColor: teal[200],
			},
			"&.Mui-focused fieldset": {
				borderColor: teal[200],
			},
		},
		"& label.MuiFormLabel-root": {
			color: "#fff",
		},
		"& .MuiFormLabel-root": {
			fontSize: "1rem",
		},
		"& .MuiSelect-icon": {
			color: "#fff",
		},
		"& .MuiInputBase-input": {
			color: "#fff",
		},
		width: "50%",
		marginLeft: 0,
	},
}));

const CssTextField = withStyles((theme) => ({
	root: {
		"& label.Mui-focused": {
			color: "green",
		},
		"& label.MuiFormLabel-root": {
			color: "#fff",
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: teal[500],
			},
			"&:hover fieldset": {
				borderColor: teal[200],
			},
			"&.Mui-focused fieldset": {
				borderColor: teal[200],
			},
		},
		"& .MuiInputBase-root": {
			color: "#fff",
		},
		"& .MuiFormLabel-root": {
			fontSize: "1rem",
		},
		width: "100%",
	},
}))(TextField);

const FormRadioGroup = withStyles(() => ({
	root: {
		color: "#fff",

		"& .MuiTypography-body1": {
			fontSize: "1rem",
		},
		"& span.MuiRadio-root": {
			color: teal[200],
		},
		"&.Mui-focused": {
			color: "#fff",
		},
	},
}))(RadioGroup);

const FormControlRadio = withStyles(() => ({
	root: {
		width: "100%",
	},
}))(FormControl);

const CreateButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(green[600]),
		backgroundColor: green[500],
		"&:hover": {
			backgroundColor: green[700],
		},
		fontSize: "1rem",
	},
}))(Button);

const CancelButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(grey[600]),
		backgroundColor: grey[500],
		"&:hover": {
			backgroundColor: grey[700],
		},
		fontSize: "1rem",
	},
}))(Button);

export const CreateReservation = (props) => {
	const { onCreateReservation } = props;
	const history = useHistory();

	const styles = useStyles();

	const [reservationForm, setReservationForm] = useState({
		reservationName: {
			value: "",
			validation: {
				required: true,
				errorMessage: "Field required *",
			},
			valid: false,
			touched: false,
		},
		store: {
			value: "",
			validation: {
				required: true,
				errorMessage: "Please select a store.",
			},
			valid: false,
			touched: false,
			error: false,
		},
		status: {
			value: "",
			validation: {
				required: true,
				errorMessage: "Select a status for the reservation.",
			},
			valid: false,
			touched: false,
		},
	});

	const [isFormValid, setIsFormValid] = useState(false);

	const checkValidity = (value, rules) => {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		return isValid;
	};

	const inputChangeHandler = useCallback(
		(ev) => {
			const updatedForm = { ...reservationForm };
			const updatedElement = { ...updatedForm[ev.target.name] };
			updatedElement.value = ev.target.value;
			updatedElement.valid = checkValidity(
				updatedElement.value,
				updatedElement.validation
			);
			updatedElement.touched = true;
			updatedElement.error =
				updatedElement.valid && updatedElement.touched ? false : true;
			updatedForm[ev.target.name] = updatedElement;

			let formIsValid = true;
			for (let inputIdentifier in updatedForm) {
				formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
			}

			setReservationForm(updatedForm);
			setIsFormValid(formIsValid);
		},
		[reservationForm]
	);

	const submitReservationHandler = useCallback(
		(e) => {
			e.preventDefault();

			const data = {
				reservationName: reservationForm.reservationName.value,
				store: reservationForm.store.value,
				status: reservationForm.status.value,
			};

			onCreateReservation(data);
			history.push("/");
		},
		[
			onCreateReservation,
			reservationForm.reservationName.value,
			reservationForm.store.value,
			reservationForm.status.value,
			history,
		]
	);

	const onSubmitCancel = (e) => {
		e.preventDefault();
		history.push("/");
	};

	return (
		<div className={classes.CreateReservation}>
			<header className={classes.Header}>
				<Typography variant="h3" gutterBottom>
					Create Reservation
				</Typography>
			</header>
			<section className={classes.Content}>
				<form className={classes.Form} noValidate autoComplete="off">
					<CssTextField
						error={reservationForm.reservationName.error}
						name="reservationName"
						label="Reservation name"
						variant="outlined"
						id="custom-css-outlined-input"
						margin="dense"
						helperText={
							reservationForm.reservationName.error && "Field is required."
						}
						onChange={(e) => inputChangeHandler(e)}
					/>
					<FormControl
						variant="outlined"
						margin="dense"
						className={styles.formControl}
						error={reservationForm.store.error}
					>
						<InputLabel id="demo-simple-select-outlined-label">
							Store
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={reservationForm.store.value}
							name="store"
							onChange={(e) => inputChangeHandler(e)}
							label="Store"
							MenuProps={{ className: styles.menu }}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value="Amsterdam">Amsterdam</MenuItem>
							<MenuItem value="Rotterdam">Rotterdam</MenuItem>
							<MenuItem value="Utrecht">Utrecht</MenuItem>
						</Select>
						<FormHelperText>
							{reservationForm.store.error &&
								reservationForm.store.validation.errorMessage}
						</FormHelperText>
					</FormControl>
					<FormControlRadio error={reservationForm.status.error}>
						<div className={classes.Status}>Status</div>
						<FormRadioGroup
							aria-label="gender"
							name="status"
							value={reservationForm.status.value}
							onChange={(e) => inputChangeHandler(e)}
						>
							<FormControlLabel value="Todo" control={<Radio />} label="Todo" />
							<FormControlLabel
								value="In Progress"
								control={<Radio />}
								label="In Progress"
							/>
							<FormControlLabel
								value="Ready"
								control={<Radio />}
								label="Ready"
							/>
						</FormRadioGroup>
						<FormHelperText>
							{reservationForm.status.error &&
								reservationForm.status.validation.errorMessage}
						</FormHelperText>
					</FormControlRadio>
				</form>
			</section>
			<footer className={classes.Footer}>
				<div className={classes.Row}>
					<CancelButton
						variant="contained"
						color="primary"
						onClick={(e) => onSubmitCancel(e)}
					>
						Cancel
					</CancelButton>
					<CreateButton
						disabled={!isFormValid}
						variant="contained"
						color="primary"
						onClick={(e) => submitReservationHandler(e)}
					>
						Create
					</CreateButton>
				</div>
			</footer>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		onCreateReservation: (reservation) =>
			dispatch(actions.createReservationRequest(reservation)),
	};
};

export default connect(null, mapDispatchToProps)(CreateReservation);
