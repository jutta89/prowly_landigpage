document.addEventListener('DOMContentLoaded', function(){ 

	class Person {
		constructor(firstName, lastName, avatar, position) {
			this.firstName = firstName;
			this.lastName = lastName;
			this.avatar = avatar;
			this.position = position;
		}
	}

	let personItem = new Person('Asia', 'Kaczmarek', '../assets/img/bg.png', 'Front-end');
	let personItem2 = new Person('Joanna', 'Nowak', '../assets/img/bg.png', 'Front-end');
	let personItem3 = new Person('Kasia', 'Iksińska', '../assets/img/bg.png', 'Zawod');
	let personItem4 = new Person('Paweł', 'Nazwiskowy', '../assets/img/bg.png', 'Front-end');


	let personsArray = [personItem, personItem2, personItem3, personItem4];

	let filteredArray = [...personsArray]; // spread 

	const inputPerson = document.getElementById("search-person");

	const listPerson = document.getElementById("persons-list");

	function personToHtml(item) {
		return `<div class="search-person-item">
					<div class="search-person__avatar"> <img src="${item.avatar}" alt="avatar" /> </div> 
					<div class="search-person__text"> 
						<div class="search-person__name">
						${item.firstName} ${item.lastName}
						</div>
						<div class="search-person__position">
						${item.position}
						</div>
					</div>	
				</div>`
	}


	function searchPerson(e) {
		if(!e.target.value || e.target.value.lenght === 0) {
			filteredArray = [...personsArray];

			// wariant bez listy na poczatku
			// filteredArray = []; 
			// inputPerson.classList.remove('is-focused'); 
		}
		else {
			filteredArray = personsArray.filter((n)=>n.firstName.toLowerCase().includes(e.target.value.toLowerCase()));
		}

		if (filteredArray.length > 0) {
			listPerson.classList.remove('is-hidden');
			inputPerson.classList.add('is-focused'); 
		}
		else {
			listPerson.classList.add('is-hidden');
			inputPerson.classList.remove('is-focused');
		}

		// imie lub nazwisko
		// filteredArray = personsArray.filter((n)=>n.firstName.includes(e.target.value) || n.lastName.includes(e.target.value));

		let listToHtml = filteredArray.map((item) => {return personToHtml(item)});
		listPerson.innerHTML = '';
		listToHtml.forEach((item)=> { listPerson.innerHTML += item })

		// SHADOW INPUT&DROPDOWN
		let inputHeight = inputPerson.offsetHeight + listPerson.offsetHeight - 1;
		const inputShadow = document.getElementById('input-shadow');
		if(listPerson.classList.contains('is-hidden')){
			inputShadow.style.height = inputHeight+'px';
		}
	}

	inputPerson.addEventListener('keyup', searchPerson);

	// FOCUS INPUT
	// wariant z cala lista
	inputPerson.addEventListener('focusin', function() {
		listPerson.classList.remove('is-hidden');
		inputPerson.classList.add('is-focused')
		let listToHtml = personsArray.map((item) => {return personToHtml(item)});
		listPerson.innerHTML = '';
		listToHtml.forEach((item)=> { listPerson.innerHTML += item })
	});

	inputPerson.addEventListener('focusout', function() {
		listPerson.classList.add('is-hidden');
		inputPerson.classList.remove('is-focused'); 
		inputPerson.value = inputPerson.defaultValue;
	});

}, false);



// UWAGI

// 1. Rozne odleglosci miedzy itemami (osobami) w dropdownie
// 2. Na buttonie rózne odstępy linii od buttona
// 3. Za 'Try now' dodałabym '!'