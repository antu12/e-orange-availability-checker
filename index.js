// pl-scraper.js

const puppeteer = require('puppeteer');
const sgMail = require('@sendgrid/mail');

let pulsarTD = new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({
        headless: true
    });
    // scraping logic comes here…
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
    await page.goto('https://www.eorange.shop/product/18320/bajaj-pulsar-150-cc-twin-disc?exclusive_offer=1');
    let quotes = await page.evaluate(() => {

        let result = {};

        let data = [];
        let elements = document.getElementsByClassName('productDetails-status');
        for (var element of elements)
            data.push(element.textContent);
        result['status'] = data[0].trim();

        let data1 = [];
        let elements1 = document.getElementsByClassName('productDetails-price');
        for (var element of elements1)
            data1.push(element.textContent);
        result['price'] = data1[0].trim();

        let data2 = [];
        let elements2 = document.getElementsByClassName('title');
        for (var element of elements2)
            data2.push(element.textContent);
        result['title'] = data2[0].trim();

        return result;

    });

    // console.log(new Date().toISOString().slice(0, 16).replace('T', ' ') + "," + quotes.title + "," + quotes.price.substring(183, 189) + "tk," + quotes.status);
    await browser.close();
    resolve(new Date().toISOString().slice(0, 16).replace('T', ' ') + "," + quotes.title + "," + quotes.price.substring(183, 189) + "tk," + quotes.status);
});

let pulsarSD = new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({
        headless: true
    });
    // scraping logic comes here…
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
    await page.goto('https://www.eorange.shop/product/18319/bajaj-pulsar-150-cc-single-disc?exclusive_offer=1');
    let quotes = await page.evaluate(() => {

        let result = {};

        let data = [];
        let elements = document.getElementsByClassName('productDetails-status');
        for (var element of elements)
            data.push(element.textContent);
        result['status'] = data[0].trim();

        let data1 = [];
        let elements1 = document.getElementsByClassName('productDetails-price');
        for (var element of elements1)
            data1.push(element.textContent);
        result['price'] = data1[0].trim();

        let data2 = [];
        let elements2 = document.getElementsByClassName('title');
        for (var element of elements2)
            data2.push(element.textContent);
        result['title'] = data2[0].trim();

        return result;

    });

    // console.log(new Date().toISOString().slice(0, 16).replace('T', ' ') + "," + quotes.title + "," + quotes.price.substring(183, 189) + "tk," + quotes.status);
    await browser.close();
    resolve(new Date().toISOString().slice(0, 16).replace('T', ' ') + "," + quotes.title + "," + quotes.price.substring(183, 189) + "tk," + quotes.status);
});

Promise.all([pulsarTD, pulsarSD]).then((values) => {
    for (let i = 0; i < values.length; i++) {
        const element = values[i];
        console.log(element);
        if (element.includes("In Stock")){
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
              to: 'arshad.antu@gmail.com', // Change to your recipient
              cc: ['naseefmohammed012@gmail.com', 'rahmantawsif@gmail.com'], // Change to your recipient
              from: 'Md Arshad Hossain <md.arshad.hossain@g.bracu.ac.bd>', // Change to your verified sender
              subject: 'e-Orange Pulsar Availability',
              text: element,
              html: '<strong>Pulsar Is now Available. ACT QUICK!</strong>',
            }
            sgMail
              .send(msg)
              .then(() => {
                // console.log('Email sent')
              })
              .catch((error) => {
                // console.error(error)
              })
        }
    }
});