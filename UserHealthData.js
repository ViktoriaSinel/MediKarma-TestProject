const testVisualStateData = {
    "bloodPressure": {
        "systolic": 124,
        "diastolic": 86,
        "measure": "mmHg",
        "date": "2022-07-25T05:56:22-05:00"
    },
    "hba1c": {
        "value": 10.2,
        "measure": "%",
        "date": "2022-07-25T05:56:22-05:00"
    },
    "hba1cTrend": [
        {
            "value": 9.6,
            "measure": "%",
            "trend": "increased",
            "date": "2022-07-25T05:56:22-05:00"
        },
        {
            "value": 8.6,
            "measure": "%",
            "date": "2022-04-24T05:56:22-05:00"
        }
    ],
    "bmi": {
        "value": 24.4,
        "date": "2022-07-25T05:56:22-05:00"
    },
    "diabetesStatus": {
        "value": 10.2,
        "measure": "%",
        "date": "2022-07-25T05:56:22-05:00"
    },
    "bmr": {
        "value": 2334.5,
        "measure": "kcal",
        "date": "2022-07-25T05:56:22-05:00"
    }
};

const measureTypeAlternatives = {
    hba1c: `hemoglobin a1c|hba1c|hemoglobin|a1c`,
    bmi: `body mass index|mass index|bmi`,
    bmr: `basal metabolic rate|metabolic rate|bmr`,
    diabetesStatus: `diabetes status|diabetes|DM`
}


function getUserDataVS(p) {
    if (p.visual && p.visual.userData) {
        return p.visual.userData;
    }
    // return test data for testing
    return testVisualStateData;
}

function isoDateToReadable(p, dateISO) {
    // console.log(`isoDateToReadable: dateISO: ${JSON.stringify(dateISO)}`);
    return api.moment(dateISO).tz(p.timeZone).format(`llll`);
}

function getMeasureResponse(p, type, typeFromUser) {
    const data = getUserDataVS(p);
    if (!data[type]) {
        console.error(`getMeasureResponse error: no data for type '${type}'`);
        return `there are no measures of ${type}`;
    }
    const measureData = data[type];
    // console.log(`getMeasureResponse: measureData: ${JSON.stringify(measureData)}`);
    if (!measureData.date || !measureData.value) {
        console.error(`getMeasureResponse error: not valid data for type: '${type}' data: '${JSON.stringify(measureData)}'`);
        return `there are no measures of ${type}`;
    }
    const dateOfMeasureReadable = isoDateToReadable(p, measureData.date);
    const measure = measureData.measure ? measureData.measure : "";
    return `based on the data from ${dateOfMeasureReadable} your ${typeFromUser} (was|was measured as) ${measureData.value} ${measure}`;
}

intent('what (is|was) (my|) (latest|) (blood pressure|BP)', p => {
    let bloodPressureData = getUserDataVS(p).bloodPressure;
    if (!bloodPressureData.systolic || !bloodPressureData.diastolic || !bloodPressureData.date) {
        console.error(`invalid bloodPressureData: '${JSON.stringify(bloodPressureData)}'`);
        p.play("blood pressure data is not available");
        return;
    }
    const dateOfMeasureReadable = isoDateToReadable(p, bloodPressureData.date);
    p.play(`based on the data from ${dateOfMeasureReadable} your systolic blood pressure (was|was measured as) ${bloodPressureData.systolic} and the diastolic (was|was measured as) ${bloodPressureData.diastolic}`);
});

intent(`what (is|was) (my|) (latest|) $(TYPE ${measureTypeAlternatives.hba1c})`, p => {
    p.play(getMeasureResponse(p, `hba1c`, p.TYPE))
});

intent(`what (is|was) (my|) (latest|) $(TYPE ${measureTypeAlternatives.bmi})`, p => {
    p.play(getMeasureResponse(p, `bmi`, p.TYPE));
});

intent(`(what|how) is (my|) $(TYPE ${measureTypeAlternatives.diabetesStatus})`, p => {
    p.play(getMeasureResponse(p, `diabetesStatus`, p.TYPE));
});

intent(`what (is|was) (my|) (latest|) $(TYPE ${measureTypeAlternatives.bmr})`, p => {
    p.play(getMeasureResponse(p, `bmr`, p.TYPE));
});
