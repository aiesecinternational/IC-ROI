import { fetchData } from "./api";

export async function roiCalculator(entityId, numOfDelegates, productId, fullyCovered) {
    const calculation = {
        delegateFee: 0,
        flightFee: 0,
        totalCost: 0,
        productCount: 0
    };

   try {
    const data = await fetchData(Number(entityId));
    if (data) {
        calculation.delegateFee = data.delegate_fee;
        calculation.flightFee = data.flight_fee;
        calculation.totalCost = (fullyCovered ? calculation.delegateFee + calculation.flightFee : calculation.delegateFee) * numOfDelegates;
        switch (productId) {
            case 1:
                calculation.productCount = data.iGV_Fee > 0 && Math.ceil(calculation.totalCost / data.iGV_Fee);
                break;
            case 2:
                calculation.productCount = data.iGTe_Fee > 0 && Math.ceil(calculation.totalCost / data.iGTe_Fee);
                break;
            case 3:
                calculation.productCount = data.oGV_Fee > 0 && Math.ceil(calculation.totalCost / data.oGV_Fee);
                break;
            case 4:
                calculation.productCount = data.iGTa_Fee > 0 && Math.ceil(calculation.totalCost / data.iGTa_Fee);
                break;
            case 5:
                calculation.productCount = data.oGTa_Fee > 0 && Math.ceil(calculation.totalCost / data.oGTa_Fee);
                break;
            case 6:     
                calculation.productCount = data.oGTe_Fee > 0 && Math.ceil(calculation.totalCost / data.oGTe_Fee);
                break;
            default:
                console.error("Invalid product ID.");
                break;
        }
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