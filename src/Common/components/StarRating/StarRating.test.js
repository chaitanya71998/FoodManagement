/*global expect */
/*global jest*/
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { StarRating } from '.'

describe("StarRating", () => {
    it("should render counter", () => {
        const { debug, queryAllByRole } = render(
            <StarRating />
        );
    });
})
