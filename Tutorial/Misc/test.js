function printBookSummary(bookobj) {
  let library = {
    book1: {
      title: 'Shadow Slave',
      author: 'Guiltythree',
      year: 2022
    },
    B1: function() {
      console.log('The book ' + this.book1.title + ' was written by ' + this.book1.author + ' in ' + this.book1.year);
    },
    book2: {
      title: 'Reverend Insanity',
      author: 'Gu Zhen Ren',
      year: 2012 // RI actually started in 2012!
    },
    B2: function() {
      console.log('The book ' + this.book2.title + ' was written by ' + this.book2.author + ' in ' + this.book2.year);
    },
     book3: {
      title: 'The Omniscent Readers View Point',
      author: 'singNsong',
      year: 2018
    },
    B3: function() {
      console.log('The book ' + this.book3.title + ' was written by ' + this.book3.author + ' in ' + this.book3.year);
    },

     book4: {
      title: 'Lord of the Mysteries',
      author: 'Cuttlefish That Loves Diving',
      year: 2018
    },
    B1: function() {
      console.log('The book ' + this.book4.title + ' was written by ' + this.book4.author + ' in ' + this.book4.year);
    },
  };

  

  // Check if the key exists before calling it to prevent errors
  if (library[bookobj]) {
    library[bookobj]();
  } else {
    console.log("Book reference not found.");
  }
}

// Pass the key as a string
printBookSummary('B2');