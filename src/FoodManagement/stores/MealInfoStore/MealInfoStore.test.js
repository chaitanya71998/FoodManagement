/*global expect*/
/*global jest*/
import React from 'react'
import {
    API_SUCCESS,
    API_FAILED,
    API_FETCHING,
    API_INITIAL
}
from "@ib/api-constants";
import { MealInfoAPIService } from '../../services/MealInfoAPIService'
import { MealInfoStore } from './MealInfoStore'
import MealInfo from '../../fixtures/MealInfo.json'
import "@testing-library/jest-dom/extend-expect";

import Cookie from "js-cookie";

let mockSetCookie = jest.fn();
let mockRemoveCookie = jest.fn();
let mockGetCookie = jest.fn();

Cookie.set = mockSetCookie;
Cookie.remove = mockRemoveCookie;
Cookie.get = mockGetCookie;

global.mockSetCookie = mockSetCookie;
global.mockRemoveCookie = mockRemoveCookie;
global.mockGetCookie = mockGetCookie;


describe("MealInfoStore Tests", () => {
    let mealInfoAPIService;
    let mealInfoStore;

    beforeEach(() => {
        mealInfoAPIService = new MealInfoAPIService();
        mealInfoStore = new MealInfoStore(mealInfoAPIService);
    });

    it("should test initialising MealInfoStore", () => {
        expect(mealInfoStore.getMealInfoAPIStatus).toBe(API_INITIAL);
        expect(mealInfoStore.getMealInfoAPIError).toBe(null);
        expect(mealInfoStore.mealInfo).toEqual([]);
    });

    it("should test MealInfoAPI data fetching state", () => {
        const mockLoadingPromise = new Promise(function(resolve, reject) {});
        const mockMealInfoAPI = jest.fn();
        mockMealInfoAPI.mockReturnValue(mockLoadingPromise);
        mealInfoAPIService.getMealInfoAPI = mockMealInfoAPI;
        mealInfoStore.getMealInfoAsPerDate();
        expect(mealInfoStore.getMealInfoAPIStatus).toBe(API_FETCHING);
    });

    it("should test MealInfoAPI success state", async() => {
        const mockSuccessPromise = new Promise(function(resolve, reject) {
            resolve(MealInfo);
        });
        const mockMealInfoAPI = jest.fn();
        mockMealInfoAPI.mockReturnValue(mockSuccessPromise);
        mealInfoAPIService.getMealInfoAPI = mockMealInfoAPI;
        await mealInfoStore.getMealInfoAsPerDate();
        expect(mealInfoStore.getMealInfoAPIStatus).toBe(API_SUCCESS);
    });

    it("should test MealInfoAPI failure state", async() => {
        jest
            .spyOn(mealInfoAPIService, "getMealInfoAPI")
            .mockImplementation(() => Promise.reject())
        await mealInfoStore.getMealInfoAsPerDate();
        expect(mealInfoStore.getMealInfoAPIStatus).toBe(API_FAILED);
    });

    it("should test is MealInfo comming", async() => {
        const mockSuccessPromise = new Promise(function(resolve, reject) {
            resolve(MealInfo);
        });
        const mockMealInfoAPI = jest.fn();
        mockMealInfoAPI.mockReturnValue(mockSuccessPromise);
        mealInfoAPIService.getMealInfoAPI = mockMealInfoAPI;
        await mealInfoStore.getMealInfoAsPerDate();
        expect(mealInfoStore.getMealInfoAPIStatus.mealInfo).toBe(3);
    });

});
