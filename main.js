class Contact {
	constructor(subject, name, email, phone, message) {
		this.subject = subject;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.message = message;
	}
}
class UI {
	static displayContact() {
		const contacts = Store.getcontact();
	}
	static addContactToList(contact){
	const list = document.querySelector('#contactList')
	const row = document.createElement('tr');
	row.innerHTML = `
		<td>${contact.subject}</td>
		<td>${contact.name}</td>
		<td>${contact.email}</td>
		<td>${contact.phone}</td>
		<td>${contact.message}</td>
		<td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>`;
	list.appendChild(row);
	}
	static deleteContact(el){
		if(el.classList.contains('delete')){
			el.parentElement.parentElement.remove();
		}
	
	}
	static clearFields() {
		document.querySelector('#subject').value = '';
		document.querySelector('#name').value = '';
		document.querySelector('#email').value = '';
		document.querySelector('#phone').value = '';
		document.querySelector('#message').value = '';
	  }
}


document.addEventListener('DOMContentLoaded',UI.displayContact);

document.querySelector('#contact')

class Store {
	static getcontact() {
		let contacts;
		if(localStorage.getItem('contacts') === null) {
			contacts = [];
		}else{
			contacts = JSON.parse(localStorage.getItem('contacts'));
		}
		return contacts;
	}
	static addContact(contact) {
		const contacts = Store.getcontact();
		contacts.push(contact);
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}
	static removeContact(name) {
		const contacts = Store.getcontact();
		contacts.forEach((contact,index) => {
			if(contact.subject === subject ){
				contacts.splice(index,1);
			}
		});
		localStorage.setItem('contacts',JSON.stringify(contacts));
	}
}
document.querySelector('#contactForm').addEventListener('submit', (e) => {

e.preventDefault();

const subject = document.querySelector('#subject').value;
const name = document.querySelector('#name').value;
const email = document.querySelector('#email').value;
const phone = document.querySelector('#phone').value;
const message = document.querySelector('#message').value;

if(subject === '' || name === '' || email === '' || phone === '' || message === '') {
	alert("Please fill in the form")
	
  } else {
    const contact =new Contact(subject,name,email,phone,message);
    UI.addContactToList(contact);
    Store.addContact(contact);
	UI.clearFields();
	
  }

});

document.querySelector('#contactList').addEventListener('click', (e) => {

	UI.deleteContact(e.target);
	// Remove book from store
	Store.removeContact(e.target.parentElement.previousElementSibling.textContent);
	//UI.showAlert('Contact Removed', 'success');
  });