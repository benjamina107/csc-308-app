const portfolio = require('./stock-portfolio.js');

let pf;


test('2.1 - Testing portfolio creation', () => {
    const target = [[], []]
    pf = portfolio.create()
    const result = pf

    expect(result).toStrictEqual(target);
});

test('2.2 - Testing portfolio empty', () => {
    const target = true;
    const result = portfolio.isEmpty(pf);

    expect(result).toBe(target);
});

test('2.3 - Testing stock purchase', () => {
    const target = [["NVDA"], [3]];
    const result = portfolio.makePurchase(pf, "NVDA", 3);

    expect(result).toStrictEqual(target);
});

test('2.4 - Testing stock sale', () => {
    const target = [[], []];
    const result = portfolio.makeSale(pf, "NVDA", 3);

    expect(result).toStrictEqual(target);
});

test('2.5 - Testing # unique stocks', () => {
    const target = 2;
    portfolio.makePurchase(pf, "RBLX", 10);
    portfolio.makePurchase(pf, "GMR", 5);
    const result = portfolio.numStocks(pf);

    expect(result).toStrictEqual(target);
});

test('2.6 - Testing only owned symbols', () => {
    const target = 1;
    portfolio.makeSale(pf, "RBLX", 10);
    const result = portfolio.numStocks(pf);

    expect(result).toStrictEqual(target);
});

test('2.7 - Testing shares for symbol', () => {
    const target = 5;
    const result = portfolio.numShares(pf, "GMR");

    expect(result).toStrictEqual(target);
});


test('2.8 - Testing error for over-sale', () => {
    expect(() => portfolio.sell(pf, "GMR", 6)).toThrow();
});

/*
3 - Reflection on TDD

    I was able to follow the test-first approach in this assignment
and it felt mostly natural. I definitely felt more guided in coding
when I was just taking it one piece at a time. It did feel a little
bit awkward when I had to leave certain parts out but it definitely
allowed me to pace myself. 
*/