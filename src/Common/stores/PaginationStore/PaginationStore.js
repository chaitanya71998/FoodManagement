import { observable, action, computed, reaction, autorun, toJS } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

class PaginationStore {
   @observable currentPage
   @observable itemsPerPage
   @observable itemIndex
   @observable totalNoOfItems
   @observable itemListAPIStatus
   @observable itemListAPIError
   @observable items = new Map()
   constructor(method, itemsPerPage) {
      this.getItems = method
      this.itemsPerPage = itemsPerPage
      this.items = observable.map()
      this.init()
   }
   @action.bound
   init() {
      this.itemIndex = 0
      this.currentPage = 1
      this.itemListAPIStatus = API_INITIAL
      this.itemListAPIError = null
   }

   @action.bound
   getItemsList() {
      const requestObject = {
         limit: this.itemsPerPage,
         offset: this.itemIndex
      }
      const ItemListAPI = this.getItems(requestObject)
      return bindPromiseWithOnSuccess(ItemListAPI)
         .to(this.setItemListAPIStatus, this.setItemListAPIResponse)
         .catch(this.setItemListAPIError)
   }

   @action.bound
   setItemListAPIStatus(status) {
      this.itemListAPIStatus = status
   }

   @action.bound
   setItemListAPIResponse(response) {
      this.totalNoOfItems = response.number_of_projects
      this.items.set(this.currentPage, response.list_of_projects)
   }

   @action.bound
   setItemListAPIError(error) {
      this.itemListAPIError = error
   }

   @computed get totalPages() {
      return Math.ceil(this.totalNoOfItems / this.itemsPerPage)
   }
   // @action.bound
   // onBackwardClick() {
   //     if (this.currentPage > 1) {
   //         this.itemIndex = this.itemIndex - this.itemsPerPage;
   //         --this.currentPage
   //     }
   // }

   // @action.bound
   // onFarwardButtonClick() {
   //     if (this.currentPage < this.totalPages) {
   //         this.itemIndex = this.itemIndex + this.itemsPerPage;
   //         ++this.currentPage
   //     }
   // }
   @action.bound
   onPageChange(selectedPage) {
      this.currentPage = selectedPage
      this.itemIndex = this.currentPage * this.itemsPerPage - this.itemsPerPage
   }

   @action.bound
   async currentPageResponse() {
      if (this.items.has(this.currentPage)) {
         return toJS(this.items.get(this.currentPage))
      } else {
         await this.getItemsList()
         return toJS(this.items.get(this.currentPage))
      }
   }
}

export { PaginationStore }
