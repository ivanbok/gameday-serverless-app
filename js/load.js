document.addEventListener('DOMContentLoaded', function() {
    // By default, load results
    var country = "singapore";
    var starttime = "202206041000";
    var endtime = "202206062000";
    // load_results(country, starttime, endtime);
    load_races(country, starttime, endtime);
    
    document.querySelectorAll('#raceentry').forEach(raceEntry => {
      raceEntry.onclick = function () {
        console.log("Success!");
      }
        //console.log(raceEntry.dataset.datetime)}
      });

    document.querySelector('#filter').addEventListener('click', () => update_search());

    });

function load_races(country, starttime, endtime) {
    
    var url = "https://p7vxc94qmb.execute-api.ap-southeast-1.amazonaws.com/prod"
  // Fetch list of emails
  fetch(`${url}/listraces?country=${country}&starttime=${starttime}&endtime=${endtime}`)
  .then(response => response.json())
  .then(results => {
    // Print emails
    console.log(results);
    results.reverse().forEach(display_race_link);
  });
}
    
function update_search() {
  document.getElementById("mainracebody").innerHTML = "<div id=\"raceresults\"></div>";
  document.getElementById("mainbody").innerHTML = '<div id="results"></div>';
  // document.querySelectorAll('#mainbody').innerHTML = '<div id="results"></div>';
  var country = document.getElementById("country").value;
  
  var startdatestr = document.getElementById("startdate").value;
  const startdateArray = startdatestr.split("/");
  var starttime = `${startdateArray[2]}${startdateArray[1]}${startdateArray[0]}0000`

  var enddatestr = document.getElementById("enddate").value;
  const enddateArray = enddatestr.split("/");
  var endtime = `${enddateArray[2]}${enddateArray[1]}${enddateArray[0]}2359`

  load_races(country, starttime, endtime);
}

function load_results(country, date_time) {
  // Generate Human-Readable Date
  datetime_str = String(date_time);
  year = datetime_str.substring(0,4);
  month = datetime_str.substring(4,6);
  day = datetime_str.substring(6,8);
  datestr = `${day}/${month}/${year}`;

  // Clear existing content and generate headers
  document.getElementById("mainbody").innerHTML = `<div id="results"><h3>Results for ${country} race on ${datestr}</h3></div>`;
  
  // API Endpoint for Getting Race Results
  var url = "https://p7vxc94qmb.execute-api.ap-southeast-1.amazonaws.com/prod"
  // Fetch Race Results
  fetch(`${url}/racingresults?country=${country}&datetime=${date_time}`)
  .then(response => response.json())
  .then(results => {
    // Print Race Results
    console.log(results);
    results.reverse().forEach(display_result_row);
  });
}

function display_race_link(contents) {
  // var race_row = document.createElement('div');
  // results.className = 'results';
  country = contents.country;
  datetime_str = String(contents.datetime);
  year = datetime_str.substring(0,4);
  month = datetime_str.substring(4,6);
  day = datetime_str.substring(6,8);
  datestr = `${day}/${month}/${year}`;
  // race_row.innerHTML = datestr;
  // race_row.setAttribute("data-id", datetime_str);
  var raceHTMLString = `<button data-datetime="${datetime_str}" data-country="${country}" id="raceentry" onclick=load_results(\'${country}\',\'${datetime_str}\') class="btn btn-info" style="margin: 5px">${datestr}</button>`;

  // Add post to DOM
  document.querySelector('#raceresults').insertAdjacentHTML('afterend',raceHTMLString);
}

function display_result_row(contents) {
  var result_row = document.createElement('div');
  results.className = 'results';
  position = contents.position;
  driver = contents.driver;
  team = contents.team;
  points = contents.points;
  result_row.innerHTML = `<table><tr style="background-color:#FFFFFF"><td style="width:20px;border:none;padding-left:5px"><b>${position}</b></td><td style="width:200px;border:none"><b>${driver}</b></td><td style="width:150px;border:none;text-align:center;color:gray"><b>${team}</b></td><td style="width:50px%;text-align:center;border:none"><b>${points}</b></td></tr></table>`;
  result_row.setAttribute("data-id", position);
  var entryHTMLString = `<div data-id="${position}" id="resultrow">${result_row.innerHTML}</div>`;

  // Add post to DOM
  document.querySelector('#results').insertAdjacentHTML('afterend',entryHTMLString);
}