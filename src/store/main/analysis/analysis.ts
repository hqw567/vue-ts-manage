import {
  getAmountListData,
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsAddressSale,
  getGoodsCategoryFavor,
  getGoodsSaleTop10
} from '@/service/main/analysis/analysis'
import { defineStore } from 'pinia'

interface IAnalysisState {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsAddressSale: any[]
  goodsCategoryFavor: any[]
  goodsSaleTop10: any[]
}
const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsAddressSale: [],
    goodsCategoryFavor: [],
    goodsSaleTop10: []
  }),
  actions: {
    async fetchAmountListData() {
      const amountResult = await getAmountListData()
      // console.log(amountResult)

      this.amountList = amountResult.data

      const goodsCategoryCountResult = await getGoodsCategoryCount()
      this.goodsCategoryCount = goodsCategoryCountResult.data

      const goodsCategorySaleResult = await getGoodsCategorySale()
      this.goodsCategorySale = goodsCategorySaleResult.data

      const goodsAddressSaleResult = await getGoodsAddressSale()
      this.goodsAddressSale = goodsAddressSaleResult.data
      const goodsCategoryFavorResult = await getGoodsCategoryFavor()
      this.goodsCategoryFavor = goodsCategoryFavorResult.data
      const goodsSaleTop10Result = await getGoodsSaleTop10()
      this.goodsSaleTop10 = goodsSaleTop10Result.data
    }
  }
})

export default useAnalysisStore
