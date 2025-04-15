import { fetchData } from "./api";

const EXCHANGE_TYPE = { "OUTGOING": "OUTGOING",  "INCOMING" : "INCOMING" };
const PRODUCT_TYPE = { "GV": "GV", "GTe": "GTe", "GTa": "GTa" };

export default async function roiCalculator(entityId, numOfDelegates, selectedProducts, fullyCovered) {
    const calculation = {
        delegateFee: 0,
        flightFee: 0,
        totalCostPP: 0,
        totalCost: 0,
        productCounts: []
    };

   try {
    const data = await fetchData(Number(entityId));
    if (data) {
        calculation.delegateFee = data.delegate_fee;
        calculation.flightFee = data.flight_fee;
        calculation.totalCostPP = fullyCovered ? (data.delegate_fee + data.flight_fee) : data.delegate_fee;
        calculation.totalCost = calculation.totalCostPP * numOfDelegates;
        selectedProducts.forEach((productId) => {
            switch (productId) {
                case 1:
                    calculation.productCounts.push({
                        id: 1,
                        name: 'iGV',
                        count: data.iGV_Fee > 0 && Math.ceil(calculation.totalCost / data.iGV_Fee),
                        type: EXCHANGE_TYPE.INCOMING,
                        product: PRODUCT_TYPE.GV
                    });
                    break;
                case 2:
                    calculation.productCounts.push({
                        id: 1,
                        name: 'iGTe',
                        count: data.iGTe_Fee > 0 && Math.ceil(calculation.totalCost / data.iGTe_Fee),
                        type: EXCHANGE_TYPE.INCOMING,
                        product: PRODUCT_TYPE.GTe
                    });
                    break;
                case 3:
                    calculation.productCounts.push({
                        id: 1,
                        name: 'oGV',
                        count: data.oGV_Fee > 0 && Math.ceil(calculation.totalCost / data.oGV_Fee),
                        type: EXCHANGE_TYPE.OUTGOING,
                        product: PRODUCT_TYPE.GV
                    });
                    break;
                case 4:
                    calculation.productCounts.push({
                        id: 1,
                        name: 'iGTa',
                        count: data.iGTa_Fee > 0 && Math.ceil(calculation.totalCost / data.iGTa_Fee),
                        type: EXCHANGE_TYPE.INCOMING,
                        product: PRODUCT_TYPE.GTa
                    });
                    break;
                case 5:
                    calculation.productCounts.push({
                        id: 1,
                        name: 'oGTa',
                        count: data.oGTa_Fee > 0 && Math.ceil(calculation.totalCost / data.oGTa_Fee),
                        type: EXCHANGE_TYPE.OUTGOING,
                        product: PRODUCT_TYPE.GTa
                    });
                    break;
                case 6: 
                    calculation.productCounts.push({
                        id: 1,
                        name: 'oGTe',
                        count: data.oGTe_Fee > 0 && Math.ceil(calculation.totalCost / data.oGTe_Fee),
                        type: EXCHANGE_TYPE.OUTGOING,
                        product: PRODUCT_TYPE.GTe
                    });    
                    break;
                default:
                    console.error("Invalid product ID.");
                    break;
            }
        });
        return calculation;
    } else {    
        console.error("No data found for the given entity ID.");
    }
   } catch (error) {
    console.error("Error fetching committee data:", error);
    return null;
   }
   return calculation;
   
}