// Contact 1: Loid Forger
const contact1 = {
  name: 'Loid Forger',
  phone: '901-234-5678',
  email: 'twilight.spy@ostania-mail.com',
  getInfo: function() {
    return `Name: ${this.name} | Phone: ${this.phone} | Email: ${this.email}`;
  }
};

// Contact 2: Mikasa Ackerman
const contact2 = {
  name: 'Mikasa Ackerman',
  phone: '809-876-5432',
  email: 'stronger.together@shiganshina.net',
  getInfo: function() {
    return `Name: ${this.name} | Phone: ${this.phone} | Email: ${this.email}`;
  }
};

function printContactInfo(contact) {
  // Check if the method exists to avoid the TypeError you saw earlier
  if (typeof contact.getInfo === 'function') {
    console.log(contact.getInfo());
  } else {
    console.log("Error: This object does not have a valid getInfo method.");
  }
}