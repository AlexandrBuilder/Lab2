function fm(n, m) {
	var result = 0.0;
	for (var i = 1; i <= n; i++)
		result += (1.0 / (m - i));
	return result;
}

function gm(n, m, A) {
	return n / (m - A);
}

function compareNumbers(a, b) {
	return a - b;
}

function getResults() {
	var n = document.getElementById("arrayLength").value;
	var showArrays = document.getElementById("bShowArrays").checked;
	var array = new Array(n);
	var result = "Равномерное распределение:\n";
	for (var i = 0; i < n; i++)//uniform
	{
		array[i] = Math.random() * 20.0;
	}

	result += resolve(showArrays, n, array);

	result += "\nЭкспоненциальное распределение:\n";
	for (var i = 0; i < n; i++)//exponential
	{
		array[i] = -Math.log(Math.random()) / 0.1;
	}

	result += resolve(showArrays, n, array);

	result += "\nРелеевское распределение:\n";
	var sigma = 8.0 * Math.sqrt(2.0 - Math.PI * 0.5);
	for (var i = 0; i < n; i++)//rayleigh
	{
		array[i] = sigma * Math.sqrt(-2 * Math.log(Math.random()));
	}
	
	result += resolve(showArrays, n, array);

	document.getElementById("result").innerHTML = "<textarea style='width:100%;height:100%;resize:vertical' readonly>" + result + '</textarea>';

}

function resolve(showArrays, n, array) {
	var result = '';
	array.sort(compareNumbers);
	
	if (showArrays) {
		for (var i = 0; i < n; i++) {
			result += "X[" + (i + 1) + "]=" + array[i] + "\n";
		}
	}

	result += "100%:\n";
	result += jelinskiMoranda(array, 1);
	result += "\n80%:\n";
	result += jelinskiMoranda(array, 0.8);
	result += "\n60%:\n";
	result += jelinskiMoranda(array, 0.6);

	return result;
}

function jelinskiMoranda(X, usablePercent) {
	var count = Math.ceil(X.length * usablePercent);
	var A = 0.0;
	var high = 0.0;
	var low = 0.0;
	for (var i = 0; i < count; i++) {
		high += (i + 1) * X[i];
		low += X[i];
	}
	A = high / low;
	if (A * 2 <= (count + 1)) {
		return "\tНе удовлетворён критерий применения модели";
	}
	var B = count;
	var min = Number.MAX_VALUE;
	while (true) {
		var m = B + 1;
		var diff = Math.abs(fm(count, m) - gm(count, m, A));
		if (diff >= min) {
			B--;
			break;
		}
		min = diff;
		B++;
	}

	K = count / ((B + 1) * low - high);

	var result = "\tB: " + B;
	result += "\n\tK: " + K;

	if (B > count) {
		var average = 0.0

		result += "\n\tОценка значения средних времен: ";
		var k = Math.min(B, count + 5);
		for (var i = count; i < k; i++) {
			average = 1.0 / (K * (B - i));
			result += "\n\t\tX[" + (i + 1).toString() + "]=" + average;
		}
	}
	return result;
}

function start() {
	getResults();
}