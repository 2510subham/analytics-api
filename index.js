const express = require('express');
const app = express();
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
require('dotenv').config();
const analyticsDataClient = new BetaAnalyticsDataClient(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Runs a simple report.
async function runReport() {
    const [response] = await analyticsDataClient.runReport({
        property: `properties/421297441`,
        dateRanges: [
            {
                startDate: '2024-01-01',
                endDate: '2024-01-09',
            },
        ],
        dimensions: [
            {
                name: 'city',
            },
            {
                name: 'operatingSystem'
            },
            {
                name: 'browser'
            },
            {
                name: 'country'
            },
            {
                "name": "region"
            },

        ],
        metrics: [
            {
                name: 'activeUsers',
            },
            {
                name: "screenPageViews",
                type: "INTEGER",
            }
        ],

    });

    console.log('Report result:');
    response.rows.forEach(row => {
        console.log(row);
        // console.log(row.dimensionValues[0], row.metricValues[0]);
    });
}


app.get("/", (req, res) => {
    res.send("hello world");

})



app.listen(8000, async () => {
    await runReport();
    console.log("app is listening in 8000");
})