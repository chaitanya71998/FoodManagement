/* global jest * /
/*global expect*/
/*global mockSetCookie*/
/*global mockRemoveCookie*/
//import React from 'react'
import {
    API_SUCCESS,
    API_FAILED,
    API_FETCHING,
    API_INITIAL
}
from "@ib/api-constants";

import { SignInService } from "../../services/SignInService";
import getUserSignInResponse from "../../fixtures/getUserSignInResponse.json";

import { SignInStore } from "./SignInStore";

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

describe("AuthStore Tests", () => {
    let signInService;
    let signInStore;

    beforeEach(() => {
        signInService = new SignInService();
        signInStore = new SignInStore(signInService);
    });

    it("should test initialising signIn store", () => {
        expect(signInStore.getUserSignInAPIStatus).toBe(API_INITIAL);
        expect(signInStore.getUserSignInAPIError).toBe(null);
    });

    it("should test userSignInAPI data fetching state", () => {
        const mockLoadingPromise = new Promise(function(resolve, reject) {});
        const mockSignInAPI = jest.fn();
        mockSignInAPI.mockReturnValue(mockLoadingPromise);
        signInService.signInAPI = mockSignInAPI;

        signInStore.userSignIn();
        expect(signInStore.getUserSignInAPIStatus).toBe(API_FETCHING);
    });

    it("should test userSignInAPI success state", async() => {
        const mockSuccessPromise = new Promise(function(resolve, reject) {
            resolve(getUserSignInResponse);
        });
        const mockSignInAPI = jest.fn();
        mockSignInAPI.mockReturnValue(mockSuccessPromise);
        signInService.signInAPI = mockSignInAPI;
        const onSuccess = jest.fn();
        await signInStore.userSignIn(onSuccess);
        expect(signInStore.getUserSignInAPIStatus).toBe(API_SUCCESS);
        expect(mockSetCookie).toBeCalled();
    });

    it("should test userSignInAPI failure state", async() => {
        jest
            .spyOn(signInService, "getUserSignInAPI")
            .mockImplementation(() => Promise.reject())
        /*
        const mockFailurePromise = new Promise(function(resolve, reject) {
            reject();
        });
        const mockSignInAPI = jest.fn();
        mockSignInAPI.mockReturnValue(mockFailurePromise);
        authAPI.signInAPI = mockSignInAPI;*/
        signInStore = new SignInStore(signInService);
        const onSuccess = jest.fn();
        await signInStore.userSignIn(onSuccess);
        expect(signInStore.getUserSignInAPIStatus).toBe(API_FAILED);
    });
    it("should test user sign-out", () => {
        signInStore.userSignOut();
        expect(mockRemoveCookie).toBeCalled();
        expect(signInStore.getUserSignInAPIStatus).toBe(API_INITIAL);
        expect(signInStore.getUserSignInAPIError).toBe(null);
    });




});
