import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CreateReservation } from "./CreateReservation";

configure({ adapter: new Adapter() });

describe("<CreateReservation />", () => {
	let wrapper;
	const useStateSpy = jest.fn();
	useStateSpy.mockImplementation((init) => [init, setState]);

	beforeEach(() => {
		wrapper = shallow(<CreateReservation />);
	});

	it("should activate button when the form is valid", () => {});
});
