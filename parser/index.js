import puppeteer from 'puppeteer';
import { deleteFile, saveCSV } from './utils/fileSystem.js';
import { getLastPage, generatePageUrls, getProductsUrls } from './utils/urls.js'
import { getProductInfo } from './utils/productData.js';

const url = "http://estoremedia.space/DataIT/";
const pageUrl = `http://estoremedia.space/DataIT/index.php?page=`;
const filePath = './data.csv';

(async () => {
    const browser = await puppeteer.launch({
        defaultViewport: null,
        width: 1024,
        height: 768
    });

    const page = await browser.newPage();
    try {
        await deleteFile(filePath);
        const lastPage = await getLastPage(url, page);
        const pageUrls = await generatePageUrls(pageUrl, lastPage);
        const productsUrls = await getProductsUrls(pageUrls, page);
        const productInfo = await getProductInfo(productsUrls, page);
        saveCSV(productInfo);
    } catch (e) {
        //Error handlers to add.
    }
    await browser.close();
})();