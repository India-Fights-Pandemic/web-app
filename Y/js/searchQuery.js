// console.log('test');

var city_name = 'delhi';
var need_list = ['beds', 'oxygen', 'ventilator'];
//var need_list = ['beds'];

var city_lookalike_map = {
  'delhi': ['ncr', 'new delhi', 'delhi'],
  'bangalore': ['bangalore', 'bengaluru'],
  'sonipat': ['sonipat', 'sonepat'],
  'sonipat': ['sonipat', 'sonepat'],
  'trichy': ['trichy', 'tiruchirappalli'],
  'vishakhapatnam': ['vishakhapatnam', 'vizag']
};


function gen_str_or_query(options_list) {
  gen_list = ' ( '+ options_list.join(' OR ') + ' ) ';
  return gen_list;
}

function gen_city_query(city, city_lookalike_map) {
  var city_query = '';

  if (city in city_lookalike_map){
    city_query = gen_str_or_query(city_lookalike_map[city])
  }
  else {
    city_query = city
  }
return city_query;
}

function get_encoded_url_for_query(city_name, need_list, city_lookalike_map) {
  var negative_query = ' -"wanter" -"not verified" -"unverified" -"needed" -"required" ';
  var verified_query = ' (verified verfied) ';

  var need_list_query = gen_str_or_query(need_list);   
  
  var city_syn_query = gen_city_query(city_name, city_lookalike_map);

  var full_query = need_list_query + city_syn_query + verified_query + negative_query;

  console.log(full_query);

  var uri_encoded = 'https://twitter.com/search?q=' + encodeURI(full_query) + '&f=live';

  alert(uri_encoded);
  console.log(uri_encoded);
  //console.log(JSON.stringify(uri_encoded)); 
  return uri_encoded;
}




get_encoded_url_for_query('mumbai', need_list, city_lookalike_map)
/* get_encoded_url_for_query('mumbai', need_list, city_lookalike_map)
get_encoded_url_for_query('mumbai', ['fabiflu'], city_lookalike_map)
 */



