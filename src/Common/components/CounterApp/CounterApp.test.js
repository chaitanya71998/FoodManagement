/*global expect */
/*global jest*/
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { CounterApp } from '.'

describe("CounterApp", () => {
    it("should render counter", () => {
        const { getByText } = render(
            <CounterApp quantity={"0"} />
        );
        getByText('0')
    });

    it("should test increment function", () => {
        const onChangeQuantity = jest.fn()
        const { getByText, getByRole } = render(
            <CounterApp quantity={0} onChangeQuantity={onChangeQuantity}/>
        );
        const incrementButton = getByRole("button", { name: "+" });

        fireEvent.click(incrementButton);

        getByText('1');
    });

    it("should test decrement function", () => {
        const onChangeQuantity = jest.fn()
        const { getByText, getByRole } = render(
            <CounterApp quantity={2} onChangeQuantity={onChangeQuantity}/>
        );
        const decrementButton = getByRole("button", { name: "-" });

        fireEvent.click(decrementButton);

        getByText('1');
    });



})
