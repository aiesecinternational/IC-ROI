import { fetchData} from "./api";
import { toast } from 'react-toastify';

const EXCHANGE_TYPE = { "OUTGOING": "OUTGOING",  "INCOMING" : "INCOMING" };
const PRODUCT_TYPE = { "GV": "GV", "GTe": "GTe", "GTa": "GTa" };

export default async function roiCalculator(entityId, numOfDelegates, selectedProducts, fullyCovered, mcpIncluded, isPerformanceBased) {
    const calculation = {
        delegateFee: 0,
        flightFee: 0,
        totalCostPP: 0,
        totalCost: 0,
        productCounts: [],
        mcpFee: 0,
        mcpTotalCost: 0
    };

   try {
    const data = await fetchData(Number(entityId), isPerformanceBased);
    
    if (data) {
        let totalExchanges = 0;
        if (isPerformanceBased) {
            totalExchanges = (selectedProducts.includes(1) && data.iGV_Exchange) 
                + (selectedProducts.includes(3) && data.oGV_Exchange )
                + (selectedProducts.includes(4) && data.iGTa_Exchange) 
                + (selectedProducts.includes(5) && data.oGTa_Exchange)
                + (selectedProducts.includes(2) && data.iGTe_Exchange) 
                + (selectedProducts.includes(6) && data.oGTe_Exchange);
            console.log("Total Exchanges: ", totalExchanges);
            if(totalExchanges === 0) {
                toast.error("Performance-based calculation not applicable", {
                    autoClose: false, // ⬅️ Keeps the toast visible
                    closeOnClick: true,
                    draggable: true,
                    position: "top-center",
                    style: { // vivid red
                        color: "#ff4d4f",
                        fontWeight: "bold",
                        fontSize: "16px",
                        border: "2px solid #ff4d4f",
                        borderRadius: "8px",
                    },
                  });
            }
        }
        calculation.delegateFee = data.delegate_fee;
        calculation.mcpFee = data.mcp_fee? data.mcp_fee : 630;
        calculation.flightFee = data.flight_fee;
        calculation.totalCostPP = fullyCovered ? (data.delegate_fee + data.flight_fee) : data.delegate_fee;
        calculation.mcpTotalCost = fullyCovered ? (calculation.mcpFee + data.flight_fee) : calculation.mcpFee
        calculation.totalCost = mcpIncluded ? calculation.totalCostPP * numOfDelegates + calculation.mcpTotalCost : calculation.totalCostPP * numOfDelegates;
        selectedProducts.forEach((productId) => {
            switch (productId) {
                case 1:
                    let iGVCount = {
                        id: 1,
                        name: 'iGV',
                        count:data.iGV_Fee > 0 &&( isPerformanceBased ? Math.ceil((calculation.totalCost * data.iGV_Exchange / totalExchanges) / data.iGV_Fee) : Math.ceil(calculation.totalCost / data.iGV_Fee)),
                        type: EXCHANGE_TYPE.INCOMING,
                        product: PRODUCT_TYPE.GV,
                        fee: data.iGV_Fee,
                    };
                    calculation.productCounts.push(iGVCount);
                    break;
                case 2:
                    let iGTeCount = {
                        id: 2,
                        name: 'iGTe',
                        count:data.iGTe_Fee > 0 && (isPerformanceBased ? Math.ceil((calculation.totalCost * data.iGTe_Exchange / totalExchanges) / data.iGTe_Fee) : Math.ceil(calculation.totalCost / data.iGTe_Fee)),
                        type: EXCHANGE_TYPE.INCOMING,
                        product: PRODUCT_TYPE.GTe,
                        fee: data.iGTe_Fee,
                    }
                    calculation.productCounts.push(iGTeCount);
                    break;
                case 3:
                    let oGVCount = {
                        id: 3,
                        name: 'oGV',
                        count: data.oGV_Fee > 0 &&  (isPerformanceBased ? Math.ceil((calculation.totalCost * data.oGV_Exchange / totalExchanges) / data.oGV_Fee) : Math.ceil(calculation.totalCost / data.oGV_Fee)),
                        type: EXCHANGE_TYPE.OUTGOING,
                        product: PRODUCT_TYPE.GV,
                        fee: data.oGV_Fee,
                    }
                    calculation.productCounts.push(oGVCount);
                    break;
                case 6:
                    let oGTeCount = {
                        id: 6,
                        name: 'oGTe',
                        count:data.oGTe_Fee > 0 && (isPerformanceBased ? Math.ceil((calculation.totalCost * data.oGTe_Exchange / totalExchanges) / data.oGTe_Fee) : Math.ceil(calculation.totalCost / data.oGTe_Fee)),
                        type: EXCHANGE_TYPE.OUTGOING,
                        product: PRODUCT_TYPE.GTe,
                        fee: data.oGTe_Fee,
                    }
                    calculation.productCounts.push(oGTeCount);
                    break;
                case 4:
                    let iGTaCount = {
                        id: 4,
                        name: 'iGTa',
                        count:data.iGTa_Fee > 0 && (isPerformanceBased ? Math.ceil((calculation.totalCost * data.iGTa_Exchange / totalExchanges) / data.iGTa_Fee) : Math.ceil(calculation.totalCost / data.iGTa_Fee)),
                        type: EXCHANGE_TYPE.INCOMING,
                        product: PRODUCT_TYPE.GTa,
                        fee: data.iGTa_Fee,
                    }
                    calculation.productCounts.push(iGTaCount);
                    break;
                case 5:
                    let oGTaCount = {
                        id: 5,
                        name: 'oGTa',
                        count: data.oGTa_Fee > 0 && (isPerformanceBased ? Math.ceil((calculation.totalCost * data.oGTa_Exchange / totalExchanges) / data.oGTa_Fee) : Math.ceil(calculation.totalCost / data.oGTa_Fee)),
                        type: EXCHANGE_TYPE.OUTGOING,
                        product: PRODUCT_TYPE.GTa,
                        fee: data.oGTa_Fee,
                    }
                    calculation.productCounts.push(oGTaCount);    
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
        console.error("Error fetching committee data:");
        return null;
   }
   return calculation;
   
}