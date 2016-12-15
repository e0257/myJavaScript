str = `apple:2016/5/27__bid_203.38-ask_203.43|2016/5/28__bid_203.35-ask_2
03.42|2016/5/28__bid_203.39-ask_203.45`;
//\w+(?=:)/gm


function returnRates (str){
	let splitStr = str.split(":");
	let stockName = splitStr[0];
	let rates = splitStr[1].replace(/\s+/gm, "");

	console.log(stockName);
	console.log(rates);

	rates = rates.split("|");
	console.log(rates);

	rates = rates.map(e => {
		return {
			date: e.match(/\d{4}\/[01]?\d\/[0-2]?\d/g).join(""),
			bid: e.match(/bid_\d+\.\d+/g).join("").slice(4),
			ask: e.match(/ask_\d+\.\d+/g).join("").slice(4)
		};
	});
	console.log(rates);

	return {
		stockName,
		rates
	};
};

console.log(returnRates (str));


