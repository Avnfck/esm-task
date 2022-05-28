const getLastPage = async (url, page) => {
    console.log('Getting last page...');
    await page.goto(url, {
        waitUntil: 'networkidle2'
    });
    const lastPage = await page.$eval('.pagination .page-item:nth-last-of-type(2) a', el => el.textContent);
    console.log('Last page acquired.');
    return lastPage;
}

const generatePageUrls = async (pageUrl, lastPage) => {
    console.log('Generating subpages...');
    const pageUrlsAry = [];
    for(let i=1; i<=lastPage; i++){
        pageUrlsAry.push(pageUrl+i);
    };
    console.log('Subpages generated.');
    return pageUrlsAry;
}

const getProductsUrls = async (urls, page) => {
    console.log('Getting product page urls...');
    let allProdUrls = [];
    for(let i=0; i<urls.length; i++){
        await page.goto(urls[i], {
            waitUntil: 'networkidle2'
        });
        const prodUrls = await page.$$eval('.card-title a', elems => elems.map(el => el.href));
        allProdUrls = allProdUrls.concat(prodUrls);
    }
    console.log('Product page urls acquired.');
    return allProdUrls;
}

export { getLastPage, generatePageUrls, getProductsUrls };