import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Reservation } from "../Reservations/Reservation";
import ReservationList from "../Reservations/ReservationList/ReservationList";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import ReservationItem from "../Reservations/ReservationList/ReservationItem/ReservationItem";
import { Link, MemoryRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CreateReservation from "./CreateReservation/CreateReservation";
import Wireframe from "../../hoc/Frames/Wireframe";

configure({ adapter: new Adapter() });

describe("<Reservation />", () => {
	let wrapper;

	const reservList = [
		{
			_id: "606b6c49f3d5a131dc955ce8",
			reservationName: "Foo",
			store: "Amsterdam",
			status: "Todo",
			__v: 0,
		},
		{
			_id: "606cb08acdfa080d587dd178",
			reservationName: "Bar",
			store: "Rotterdam",
			status: "In progress",
			__v: 0,
		},
		{
			_id: "606cb0a4cdfa080d587dd179",
			reservationName: "Baz",
			store: "Den Haag",
			status: "Todo",
			__v: 0,
		},
	];

	beforeEach(() => {
		wrapper = shallow(<Reservation />);
	});

	it("should render a Loading component", () => {
		wrapper.setProps({ isLoading: true });
		expect(wrapper.find(CircularProgress)).toHaveLength(1);
	});

	it("should render a message given an empty list", () => {
		wrapper.setProps({ isLoading: false, reservations: [] });
		expect(wrapper.find(ReservationList).html()).toContain(
			"There are no reservations"
		);
	});

	it("should render reservations given a non empty list", () => {
		wrapper = shallow(<ReservationList reservations={reservList} />);
		expect(wrapper.find(ReservationItem)).toHaveLength(reservList.length);
	});

	it("should have a create reservation Button", () => {
		wrapper.setProps({ isLoading: false, reservations: [] });
		expect(wrapper.find(Button).text()).toBe("Create Reservation");
	});
});
