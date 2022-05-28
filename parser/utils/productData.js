const getProductInfo = async (urls, page) => {
    console.log('Getting products data...');
    const products = [['title', 'urls', 'photo', 'price', 'preSale', 'voteCount', 'starsCount']];
    for(let i=0; i<urls.length; i++){
        await page.goto(urls[i], {
            waitUntil: 'networkidle2'
        });
        let product = [];
        let title, photo, price, preSale, voteCount, starsCount;

        title = await page.$eval('.row.mb-0.pl-3 h3', el => el.textContent);
        photo = await page.$eval('.card-img-top', el => el.src);
        if(await page.$('.price')){
            price = await page.$eval('.price', el => el.textContent);
            preSale = '';
        }
        if(await page.$('.price-promo')){
            price = await page.$eval('.price-promo', el => el.textContent);
            preSale = await page.$eval('.price-old', el => el.textContent);
        }
        voteCount = await page.$eval('.text-muted', el => el.textContent.split(' ')[1].match(/(\d+)/)[1]); 
        const starsCheck = await page.$eval('.text-muted', el => el.textContent.split('\h*')[0].match(/★/g));
        !starsCheck ? starsCount = 0 : starsCount = starsCheck.length;
        product.push(title, urls[i], photo, price, preSale, voteCount, starsCount);
        products.push(product.map(el => el.toString().replaceAll(/,/g,'.')));
    }
    console.log('Products data acquired.');
    return products;
}

export { getProductInfo };