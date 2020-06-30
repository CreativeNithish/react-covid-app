import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;
    if(country) {
        changeableUrl = `${url}/countries/${country}` ;
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

        return  { confirmed, recovered, deaths, lastUpdate } ;
    } 
    catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => {
            return {
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate
            }
        });

        return modifiedData;
    }
    catch(error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data : { countries }} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    }
    catch(error) {
        console.log(error);
    }
}

export const fetchExperiments = async () => {
    try  {
        const data = await axios.get('https://dev.digitalcitadel.tech/api/2.0/preview/mlflow/registered-models/list');
        console.log(data);
        return data;
    }
    catch(error) {
        console.log(error);
    }
}