let digit = {
	number: prompt('Введите число от 0 до 999'),
	еденицы: 0,
	десятки: 0,
	сотни: 0,
};
if (digit.number <= 0) {
	digit.еденицы = digit.number;
} else if (digit.number <= 999) {
	digit.еденицы = Math.floor(digit.number % 10);
	digit.десятки = Math.floor(digit.number / 10 % 10);
	digit.сотни = Math.floor(digit.number / 100 % 10);
} else {
	digit.number = 0;
	prompt('Вы ввели число за диапазоном 0 - 999');

}
console.log(digit);



//Корзина
//
//const videocamera {
//	'name': 'ds-n200',
//	'type': 'cylinder',
//	'price': '200'
//}
//
//const videocamera2 {
//	'name': 'ds-n203',
//	'type': 'dome',
//	'price': '300'
//}
//const videocamera3 {
//	'name': 'ds-n305',
//	'type': 'speeddome',
//	'price': '1300'
//}
