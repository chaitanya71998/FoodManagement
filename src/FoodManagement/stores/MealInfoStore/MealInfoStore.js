import { observable, action, computed, reaction, autorun, toJS } from 'mobx'
import { API_INITIAL, API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { MealInfoModel } from './model/MealInfoModel'

class MealInfoStore {
    @observable getMealInfoAPIStatus
    @observable getMealInfoAPIError
    @observable mealInfo = []
    @observable date
    @observable mealType
    @observable getPreferencePageAPIStatus
    @observable getPreferencePageAPIError

    constructor(mealInfoAPIService) {
        this.mealInfoAPIService = mealInfoAPIService
        this.init()
    }


    init() {
        this.mealInfo = [];
        this.getMealInfoAPIStatus = API_INITIAL;
        this.getMealInfoAPIError = null;
        let date = new Date(),
            month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        this.date = [year, month, day].join('-');
    }

    @action.bound
    getMealInfoAsPerDate() {
        const MealInfoAPI = this.mealInfoAPIService.getMealInfoAPI(this.date)
        return bindPromiseWithOnSuccess(MealInfoAPI)
            .to(this.setGetMealInfoAPIStatus, this.setGetMealInfoResponse)
            .catch(this.setGetMealInfoAPIError)
    }

    @action.bound
    setGetMealInfoAPIStatus(apiStatus) {
        this.getMealInfoAPIStatus = apiStatus
    }

    @action.bound
    setGetMealInfoResponse(response) {
        this.MealInfo = response
        this.MealInfo.map(perticularMealInfo => this.getPerticularMealInfo(perticularMealInfo))
    }

    @action.bound
    setGetMealInfoAPIError(error) {
        this.getMealInfoAPIError = error
    }

    @action.bound
    getPerticularMealInfo(perticularMealInfo) {
        const PerticularMealInfo = {
            "mealType": perticularMealInfo.meal_type,
            "mealItems": perticularMealInfo.meal_items,
            "mealPreference": perticularMealInfo.meal_preference,
            "mealPreferenceDeadline": perticularMealInfo.meal_preference_deadline,
            "mealStarttime": perticularMealInfo.meal_starttime,
            "mealEndtime": perticularMealInfo.meal_endtime
        }

        const mealInfoModel = new MealInfoModel(PerticularMealInfo);
        this.mealInfo.push(mealInfoModel)

    }

    @action.bound
    getPreferencePageInfo() {
        const PreferencePageInfoAPI = this.mealInfoAPIService.getPreferencePageInfo(this.date, this.mealType)
        return bindPromiseWithOnSuccess(PreferencePageInfoAPI)
            .to(this.setGetPreferencePageStatus, this.setGetPreferencePageResponse)
            .catch(this.setGetPreferencePageError)

    }

    setGetPreferencePageStatus = (status) => {
        this.getPreferencePageAPIStatus = status
    }

    setGetPreferencePageError = (error) => {
        this.getPreferencePageAPIError = error


    }

    setGetPreferencePageResponse = (response) => {
        console.log(response)

    }



}

export { MealInfoStore }
