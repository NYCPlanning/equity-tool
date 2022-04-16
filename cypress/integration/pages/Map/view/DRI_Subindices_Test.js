import data_in from "./DRI_Subindices_Indicators_test.json";
import result_in from "./DRI_Subindices_Indicators_result.json";
import dridata from "../../../../../src/data/DRI_Subindices_Indicators.json";


dridata.map(nta => {
    console.log(nta.ntacode)
})


/*
for (let code in ntacode) {

    get() -> cypress/integration/pages/Map/view/DRI_Subindices_Indicators.json {
        if 
    }

}
*/