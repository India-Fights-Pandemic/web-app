/**
 * CONSTANTS used in the script
 */

// Name of the top Indian cities
var indianCities = ["Delhi", "Gurgaon", "Ghaziabad", "Noida", "Faridabad", "Mumbai", "Kolkata", "Bangalore", "Chennai", "Hyderabad", "Pune", "Ahmedabad", "Surat", "Lucknow", "Jaipur", "Kanpur", "Mirzapur", "Nagpur", "Ghaziabad", "Indore", "Vadodara", "Vishakhapatnam", "Bhopal", "Chinchvad", "Patna", "Ludhiana", "Agra", "Kalyan", "Madurai", "Jamshedpur", "Nasik", "Aurangabad", "Rajkot", "Meerut", "Jabalpur", "Thane", "Dhanbad", "Allahabad", "Varanasi", "Srinagar", "Amritsar", "Aligarh", "Bhiwandi", "Gwalior", "Bhilai", "Haora", "Ranchi", "Vijaywada", "Chandigarh", "Mysore", "Raipur", "Kota", "Bareilly", "Jodhpur", "Coimbatore", "Dispur", "Guwahati", "Solapur", "Trichy", "Hubli", "Dharwad", "Jalandhar", "Bhubaneshwar", "Bhayandar", "Moradabad", "Kolhapur", "Thiruvananthapuram", "Saharanpur", "Warangal", "Salem", "Malegaon", "Kochi", "Gorakhpur", "Shimoga", "Tiruppur", "Guntur", "Raurkela", "Mangalore", "Nanded", "Cuttack", "Chanda", "Dehra Dun", "Durgapur", "Asansol", "Bhavnagar", "Amravati", "Nellore", "Ajmer", "Tinnevelly", "Bikaner", "Agartala", "Ujjain", "Jhansi", "Ulhasnagar", "Davangere", "Jammu", "Belgaum", "Gulbarga", "Jamnagar", "Dhulia", "Gaya", "Jalgaon", "Kurnool", "Udaipur", "Bellary", "Sangli", "Tuticorin", "Calicut", "Akola", "Bhagalpur", "Sikar", "Tumkur", "Kollam", "Muzaffarnagar", "Bhilwara", "Nizamabad", "Bhatpara", "Kakinada", "Parbhani", "Panihati", "Latur", "Rohtak", "Rajapalaiyam", "Ahmadnagar", "Cuddapah", "Rajahmundry", "Alwar", "Muzaffarpur", "Bilaspur", "Mathura", "Kamarhati", "Patiala", "Saugor", "Bijapur", "Brahmapur", "Shahjanpur", "Trichur", "Barddhaman", "Kulti", "Sambalpur", "Purnea", "Hisar", "Firozabad", "Bidar", "Rampur", "Shiliguri", "Bali", "Panipat", "Karimnagar", "Bhuj", "Ichalkaranji", "Tirupati", "Hospet", "Aizawl", "Sannai", "Barasat", "Ratlam", "Handwara", "Durg", "Imphal", "Anantapur", "Etawah", "Raichur", "Ongole", "Bharatpur", "Begusarai", "Sonipat", "Ramgundam", "Hapur", "Uluberiya", "Porbandar", "Pali", "Vizianagaram", "Puducherry", "Karnal", "Nagercoil", "Tanjore", "Sambhal", "Shimla", "Ghandinagar", "Shillong", "New Delhi", "Port Blair", "Gangtok", "Kohima", "Itanagar", "Panaji", "Daman", "Kavaratti", "Panchkula", "Kagaznagar", "Ladakh", "Meghalaya", "Mizoram", "Khasi Hills", "Gorkhaland", "Kargil", "Leh", "Darjeeling", "Tezpur", "Silchar", "Bilaspur", "Berhampur", "Goa", "Nainital", "Garhwal"];

// varaiable for handle the mutliple name of same cities or region which includes multiple cities
var cityLookalikeMap = {
  'delhi': ['ncr', 'new delhi', 'delhi'],
  'ncr': ['ncr', 'delhi', 'gurgaon', 'faridabad', 'noida', 'ghaziabad'],
  'new delhi': ['new delhi', 'delhi'],
  'gurgaon': ['ncr', 'gurgaon', 'gurugram'],
  'gurugram': ['ncr', 'gurgaon', 'gurugram'],
  'bangalore': ['bangalore', 'bengaluru'],
  'bengaluru': ['bangalore', 'bengaluru'],
  'mumbai': ['mumbai', 'thane'],
  'dehra dun': ['dehra dun', 'dehradun'],
  'dehradun': ['dehra dun', 'dehradun'],
  'sonipat': ['sonipat', 'sonepat'],
  'goa': ['goa', 'panaji'],
  'panaji': ['goa', 'panaji'],
  'sonepat': ['sonipat', 'sonepat'],
  'trichy': ['trichy', 'tiruchirappalli'],
  'tiruchirappalli': ['trichy', 'tiruchirappalli'],
  'vishakhapatnam': ['vishakhapatnam', 'vizag'],
  'vizag': ['vishakhapatnam', 'vizag']
};


/**
 * Page handler functions
 */

function updateCheckbox(val) {
  if (val.checked) {
    arr.push(val.value);
  } else {
    removeA(arr, val.value);
  }
}

function generateOrQuery(optionsList) {
  var genList = ' (' + optionsList.join(' OR ') + ') ';
  return genList;
}

function generateCityQuery(city) {
  var cityQuery = '';
  if (city in cityLookalikeMap) {
    cityQuery = generateOrQuery(cityLookalikeMap[city])
  } else {
    cityQuery = city
  }
  return cityQuery;
}

function get_encoded_url_for_query(cityLookalikeMap) {
  var cityName = document.getElementById("myCityInput").value;
  var otherSearch = document.getElementById("otherSearchInput").value;
  cityName = cityName.toLowerCase();
  var negativeQuery = ' -"wanted" -"not verified" -"unverified" -"needed" -"required" -"need" -"leads" ';
  var verifiedQuery = ' verified ';

  let combinedArr = otherSearch ? arr.concat([otherSearch]) : arr;
  var needListQuery = generateOrQuery(combinedArr);
  var citySynQuery = generateCityQuery(cityName);
  var fullQuery = verifiedQuery + needListQuery + citySynQuery + negativeQuery;
  var uriEncoded = 'https://twitter.com/search?q=' + encodeURI(fullQuery) + '&f=live';

  $('#modalBtn').empty();
  $('#modalBtn').append(`<a href="${uriEncoded}" class="btn btn-primary  custom-btn" target="_blank" rel="noopener noreferrer">View Search Results on Twitter</a>`)
  $('#myModal').modal('show')
}


/**
 * Util functions used in the script
 */

var arr = [];
function removeA(arr) {
  var what, a = arguments,
    L = a.length,
    ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}


/**
 * Autocomplete functionality for the input field
 */

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

/*initiate the autocomplete function on the "myCityInput" element,
  and pass along the indianCities array as possible autocomplete values:*/
autocomplete(document.getElementById("myCityInput"), indianCities);