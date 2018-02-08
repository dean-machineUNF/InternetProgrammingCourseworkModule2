	var CCPaymentType = Boolean(true);
	var PaypalPaymentType = Boolean(false);
	var paymentType = Boolean(true);
	var stateChanged = Boolean(false);

	function validateForm() {
	    var a = document.forms["paymentForm"]["firstName"].value;
	    var b = document.forms["paymentForm"]["lastName"].value;
	    var c = document.forms["paymentForm"]["address"].value;
	    var d = document.forms["paymentForm"]["city"].value;
	    var e = document.forms["paymentForm"]["zip"].value;
	    var f = document.forms["paymentForm"]["email"].value;
	    var g = document.forms["paymentForm"]["nameOnCard"].value;
	    var h = document.forms["paymentForm"]["cardNumber"].value;
	    var i = document.forms["paymentForm"]["CVV2/CVC"].value;
	    var j = document.forms["paymentForm"]["payPalEmail"].value;
	    var k = document.forms["paymentForm"]["password"].value;

	    if (CCPaymentType) {
	        if (a == "" || b == "" || c == "" || d == "" ||
	            e == "" || f == "" || g == "" || h == "" || i == "") {
	            alert("All text fields must be completed");
	            return false;
	        }
	    } else if (!CCPaymentType) {
	        if (j == "" || k == "") {
	            alert("All text fields must be completed");
	            return false;
	        }
	    }


	    if (CCPaymentType) {
	        if (!validateState(document.forms['paymentForm']['state'].value)) {
	            return false;
	        } else if (!validateEmail(document.forms['paymentForm']['email'].value)) {
	            return false;
	        } else if (!validateDate(document.forms['paymentForm']['monthYearDate'].value)) {
	            return false;
	        } else if (!validateCreditCard(document.forms['paymentForm']['cardNumber'].value)) {
	            return false;
	        } else if (!validateControl("CVV2/CVC", "Credit Card Security Code", 3)) {
	            return false;
	        } else if (!validateControl("zip", "Zip Code", 5)) {
	            return false;
	        } else {
	            alert("Payment Successfully Submitted!");
	            return false;
	        }
	    } else if (!CCPaymentType) {
	        //document.write("Paypal form validate");
	        if (!validateEmail(document.forms['paymentForm']['payPalEmail'].value)) {
	            return false;
	        } else if (!validatePassword(document.forms['paymentForm']['password'].value, 13)) {
	            return false;
	        } else {
	            alert("Payment Successfully Submitted!");
	            return false;
	        }
	    }
	}


	function updateForm(control) {
	    /*if (paymentType){*/
	    /*document.write("Credit Card selected");*/
	    var show = control;
	    var hide;
	    if (control == "CC") {
	        CCPaymentType = true;
	        hide = "PP";
	    } else if (control == "PP") {
	        CCPaymentType = false;
	        hide = "CC";
	    }
	    document.getElementById(show).style.display = 'block';
	    document.getElementById(hide).style.display = 'none';



	} //end updateForm()


	function testLength(value, length, exactLength) {
	    var valueStr = value.toString();
	    if (exactLength) {
	        if (valueStr.length == length) {
	            //document.write("true length");
	            return true;
	        } else {
	            //document.write("false length");
	            return false;
	        }
	    } else if (!exactLength) {
	        if (valueStr.length >= length) {
	            //document.write("true for greater than length");
	            return true;
	        } else {
	            //document.write("false for greater than length");
	            return false;
	        }
	    }
	    return false;
	}

	function testNumber(value) {
	    if (!isNaN(value)) {
	        //document.write("true");
	        return true;
	    } else {
	        //document.write("false");
	        return false;
	    }
	    return false;
	}

	function validateControl(control, name, length) {
	    var value = document.forms["paymentForm"][control].value;

	    if (!testNumber(value)) {
	        alert("For part 3 validateControl: field " + name + " is not a number");
	        return false;
	    } else if (!testLength(value, length, true)) {
	        alert("For part 3 validateControl: field " + name + " is not the correct length");
	        return false;
	    } else {
	        //document.write(name);
	        return true;
	    }
	    return false;
	}

	function validateCreditCard(value) {
	    var valueNoSpace = value.replace(/\s+/g, '');
	    //document.write(valueNoSpace);
	    var CCLength;
	    var isValid = Boolean(false);

	    if (valueNoSpace < 400000000000000) {
	        CCLength = 15;
	    } else {
	        CCLength = 16;
	    }

	    if (valueNoSpace >= 300000000000000 && valueNoSpace <= 399999999999999) {
	        isValid = true;
	    } else if (valueNoSpace >= 4000000000000000 && valueNoSpace <= 4999999999999999) {
	        isValid = true;
	    } else if (valueNoSpace >= 5000000000000000 && valueNoSpace <= 5999999999999999) {
	        isValid = true;
	    } else if (valueNoSpace >= 6000000000000000 && valueNoSpace <= 6999999999999999) {
	        isValid = true;
	    }
	    if (!testNumber(valueNoSpace)) {
	        alert("For part 3 validateCreditCard: credit card field should be a number");
	        return false;
	    } else if (!testLength(valueNoSpace, CCLength, true)) {
	        alert("For part 3 validateCreditCard: credit card field does not contain the correct number of digits");
	        return false;
	    } else if (!isValid) {
	        alert("For part 3 validateCreditCard: first number of credit card number field is not a valid number for a " + CCLength + " digit credit card number");
	        return false;
	    } else {
	        //document.write("trueCC");
	        return true;
	    }
	}

	function validateDate(value) {
	    //document.write(value);
	    var today = new Date();
	    var dateArr = value.split('-');
	    if (dateArr[1] > today.getMonth() + 1 && dateArr[0] >= today.getFullYear()) {
	        //document.write("date passs");
	        return true;
	    } else {
	        //document.write("date fail");
	        alert("For part 3 validateDate: Expiration date is not a valid expiration date.");
	        return false;
	    }
	    return false;
	}

	function validateEmail(value) {
	    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

	    if (pattern.test(value)) {
	        //document.write("email pass");
	        return true;
	    } else {
	        alert("For part 3 validateEmail: Email address is not a valid email address of format username@domain.com");
	        //document.write("email fail");
	        return false;
	    }
	    return false;
	}


	function validatePassword(value, minLength) {
	    if (testLength(value, minLength, false)) {
	        //document.write("password pass");
	        return true;
	    } else if (!testLength(value, minLength, false)) {
	        alert("For part 3 validatePassword: Password must be more than 12 characters");
	        return false;
	    }
	    return false;
	}

	function validateState(value) {
	    if (value == "Select State") {
	        alert("For part 3 validateState: A state must be selected for the state field");
	        return false;
	    } else if (value != "Select State") {
	        //document.write("state pass state");
	        return true;
	    }
	    return false;
	}