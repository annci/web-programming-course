$(document).ready(function() {
	var firstNum = 0
	var secondNum = 0
	var result = false
	var operator = null
	var opPressed = false
	var ePress = false
		
	$('#divideButton').on('click', function() {
		if ($('#display').val() == '') {
			$('#output').html('tom')
			return false
		}
		operator = '/'
		opPressed = true
		firstNum = Number($('#display').val())
		$('#output').html(operator)
	})
	
	$('.operator').on('click', function() {
		if ($('#display').val() == '') {
			return false
		}
		$('#output').html('opPressed = ' + opPressed)
		// Case #4 Continue counting
		if (result && !ePress && opPressed) {
			//$('#output').html('firstNum = ' + firstNum)
			secondNum = Number($('#display').val())
			$('#display').val(calculate(firstNum, secondNum, operator))
			operator = $(this).html()
			firstNum = Number($('#display').val())
		}
		else {
			operator = $(this).html()
			firstNum = Number($('#display').val())
			//result = true
		}
		opPressed = true
		numPressed = false
	})

	$('#equalsButton').on('click', function() {
		if (!result) {// || !numPressed) {
			$('#output').html('result = ' + result)
			return false
		}
		if (ePress) {
			firstNum = Number($('#display').val())
		}
		else {
			secondNum = Number($('#display').val())
		}
		$('#display').val(calculate(firstNum, secondNum, operator))
		opPressed = false
		//result = false
		ePress = true
		numPressed = false
		$('#output').html(firstNum + operator + secondNum)
	})
	
	$('#clearButton').on('click', function() {
		$('#output').html($(this).html())
		firstNum = 0
		secondNum = 0
		operator = null
		opPressed = false
		result = false
		numPressed = false
		ePress = false
		$('#display').val('')
	})
	
 	$('.number').on('click', function() {
 		if ((opPressed || ePress) && !numPressed) {
 			$('#display').val('')
 			//opPressed = false
 			result = true
 		}
 		$('#display').val($('#display').val() + $(this).val())
 		numPressed = true
 		ePress = false 	
	 })
	 
	 calculate = function(num1, num2, operation) {
	 	//$('#output').html(num1 + operation + num2)
	 	if (operation == '+') {
			return num1+num2
		}
		if (operation == '-') {
			return num1-num2
		}
		if (operation == '*') {
			return num1*num2
		}
		if (operation == '/') {
			return num1/num2
		}
	 }
})