import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Reservation } from "../Reservations/Reservation";
import ReservationList from "../Reservations/ReservationList/ReservationList";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import ReservationItem from "../Reservations/ReservationList/ReservationItem/ReservationItem";

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

	const setup = (comp) => shallow(comp);

	const findByTestAttr = (wrapper, value) =>
		wrapper.find(`[data-test='${value}']`);

	it("should render a Loading component", () => {
		wrapper = setup(<Reservation isLoading />);
		// wrapper.setProps({ isLoading: true });
		const loading = findByTestAttr(wrapper, "loading");
		expect(loading.length).toBe(1);
	});

	it("should render a message given an empty list", () => {
		wrapper = setup(<Reservation />);
		wrapper.setProps({ isLoading: false, reservations: [] });
		const text = findByTestAttr(wrapper, "reserv-list").render().text();
		expect(text).toContain("There are no reservations");
	});

	it("should render reservations given a non empty list", () => {
		wrapper = setup(<ReservationList reservations={reservList} />);
		const item = findByTestAttr(wrapper, "item-list");
		expect(item.length).toBe(reservList.length);
	});

	it("should be a button to create reservation", () => {
		wrapper = setup(<Reservation />);
		wrapper.setProps({ isLoading: false });
		const button = findByTestAttr(wrapper, "create-button");
		expect(button.length).toBe(1);
	});
});
