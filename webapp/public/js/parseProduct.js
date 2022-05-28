const fetchData = (url, callback) => {
    fetch(url).then((response) => {
        response.text().then((data) => {
            let productName = data.match(/<h3>(.+)<\/h3>/)[1];
            let img = data.match(/<img\sclass="card-img-top"\ssrc="(.+)"\salt/)[1]
            let variants = JSON.parse(data.match(/\"variants\"\:(.+)}}<\/script>/)[1]);
            let price;
            let preSale;
            if (variants.length == 0 && data.match(/<span class=\"price\">(.+)<\/span>/)) {
                price = data.match(/<span class=\"price\">(.+)<\/span>/)[1];
                preSale= '';
            } else if (variants.length == 0 && !data.match(/<span class=\"price\">(.+)<\/span>/)) {
                price = data.match(/<span class=\"price-promo\">(.+)<\/span>/)[1];
                preSale = data.match(/<del class=\"price-old\">(.+)<\/del>/)[1];
            }
            let productCode = data.match(/\"code\"\:\"(.+)\"\,\"variants\"/)[1];
            let countStars = data.match(/<small class=\"text-muted\">(.+)\s\(\d+\)<\/small>/)[1]
                                .split(';').filter(el => el == '&#9733').length;
            let countVotes = data.match(/<small class=\"text-muted\">.*\((\d+)\)<\/small>/)[1];
            let productDetails = {
                productName,
                img,
                variants,
                price,
                preSale,
                productCode,
                countVotes,
                countStars
            };
            callback(undefined, productDetails);
        }).catch((error) => {
            callback(`Unable to fetch data. ${error.message}`, undefined);
        });
    });
}

export { fetchData };