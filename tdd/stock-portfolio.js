function create() {
    return [[], []];
}

function isEmpty(portfolio) {
    return portfolio[1].length === 0 && portfolio[0].length === 0;
}

function makePurchase(portfolio, ticker, shares) {
    portfolio[0].push(ticker);
    portfolio[1].push(shares);
    return portfolio;
}

function makeSale(portfolio, ticker, shares) {
    for (let i = 0; i < portfolio[0].length; i++) {
        if (portfolio[0][i] === ticker) {
            if (portfolio[1][i] === shares) {
                portfolio[0].splice(i, 1);
                portfolio[1].splice(i, 1);
            } else if (portfolio[1][i] > shares) {
                portfolio[1][i] -= shares;
            } else {
                throw new Error('Not possible to sell this number of shares.');
            }
            return portfolio;
        }
    }
    return portfolio;
}

function numStocks(portfolio) {
    return portfolio[1].length;
}

function numShares(portfolio, ticker) {
    for (let i = 0; i < portfolio[0].length; i++) {
        if (portfolio[0][i] === ticker) {
            return portfolio[1][i];
        }
    }
    return 0;
}


exports.create = create;
exports.isEmpty = isEmpty;
exports.makePurchase = makePurchase;
exports.makeSale = makeSale;
exports.numStocks = numStocks;
exports.numShares = numShares;
