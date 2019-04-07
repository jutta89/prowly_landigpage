'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener('DOMContentLoaded', function () {
	var Person = function Person(firstName, lastName, avatar, position) {
		_classCallCheck(this, Person);

		this.firstName = firstName;
		this.lastName = lastName;
		this.avatar = avatar;
		this.position = position;
	};

	var personItem = new Person('Asia', 'Kaczmarek', '../assets/img/bg.png', 'Front-end');
	var personItem2 = new Person('Joanna', 'Nowak', '../assets/img/bg.png', 'Front-end');
	var personItem3 = new Person('Kasia', 'Iksińska', '../assets/img/bg.png', 'Zawod');
	var personItem4 = new Person('Paweł', 'Nazwiskowy', '../assets/img/bg.png', 'Front-end');

	var personsArray = [personItem, personItem2, personItem3, personItem4];

	var filteredArray = [].concat(personsArray); // spread 

	var inputPerson = document.getElementById("search-person");

	var listPerson = document.getElementById("persons-list");

	function personToHtml(item) {
		return '<div class="search-person-item">\n\t\t\t\t\t<div class="search-person__avatar"> <img src="' + item.avatar + '" alt="avatar" /> </div> \n\t\t\t\t\t<div class="search-person__text"> \n\t\t\t\t\t\t<div class="search-person__name">\n\t\t\t\t\t\t' + item.firstName + ' ' + item.lastName + '\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="search-person__position">\n\t\t\t\t\t\t' + item.position + '\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\t\n\t\t\t\t</div>';
	}

	function searchPerson(e) {
		if (!e.target.value || e.target.value.lenght === 0) {
			filteredArray = [].concat(personsArray);

			// wariant bez listy na poczatku
			// filteredArray = []; 
			// inputPerson.classList.remove('is-focused'); 
		} else {
			filteredArray = personsArray.filter(function (n) {
				return n.firstName.toLowerCase().includes(e.target.value.toLowerCase());
			});
		}

		if (filteredArray.length > 0) {
			listPerson.classList.remove('is-hidden');
			inputPerson.classList.add('is-focused');
		} else {
			listPerson.classList.add('is-hidden');
			inputPerson.classList.remove('is-focused');
		}

		// imie lub nazwisko
		// filteredArray = personsArray.filter((n)=>n.firstName.includes(e.target.value) || n.lastName.includes(e.target.value));

		var listToHtml = filteredArray.map(function (item) {
			return personToHtml(item);
		});
		listPerson.innerHTML = '';
		listToHtml.forEach(function (item) {
			listPerson.innerHTML += item;
		});

		// SHADOW INPUT&DROPDOWN
		var inputHeight = inputPerson.offsetHeight + listPerson.offsetHeight - 1;
		var inputShadow = document.getElementById('input-shadow');
		if (listPerson.classList.contains('is-hidden')) {
			inputShadow.style.height = inputHeight + 'px';
		}
	}

	inputPerson.addEventListener('keyup', searchPerson);

	// FOCUS INPUT
	// wariant z cala lista
	inputPerson.addEventListener('focusin', function () {
		listPerson.classList.remove('is-hidden');
		inputPerson.classList.add('is-focused');
		var listToHtml = personsArray.map(function (item) {
			return personToHtml(item);
		});
		listPerson.innerHTML = '';
		listToHtml.forEach(function (item) {
			listPerson.innerHTML += item;
		});
	});

	inputPerson.addEventListener('focusout', function () {
		listPerson.classList.add('is-hidden');
		inputPerson.classList.remove('is-focused');
		inputPerson.value = inputPerson.defaultValue;
	});
}, false);