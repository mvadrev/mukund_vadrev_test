const express = require("express");
const app = express();
const axios = require("axios");
var cors = require("cors");
var bodyParser = require("body-parser");
const querystring = require("querystring");
var socket = require("socket.io");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

//Set base URL
base_url = "http://localhost:";
//Central node is always node_id = "0"
node_id = "0";
node_location = [{ x: "200", y: "500" }];

// Define cache size
cache_size = 3;
cache_validity = 60;

// Nodes list
nodes_list = ["3001/hello", "3002/hello", "3003/hello"];
node_location = [
  { x: "200", y: "200" },
  { x: "300", y: "500" },
  { x: "400", y: "500" }
];

// Initially set cache empty array
let lru_cache = [];

client_location = [];

let cache_interval;

function setCacheInterval() {
  cache_interval = setInterval(function() {
    lru_cache = [];
    console.log("Cache cleared. To change interval change line 41", lru_cache);
  }, 6000);
}

setCacheInterval();

// TImer code to delete cache

let d = 0;
let scores = [];

// GET API for current lru_cache object
app.get("/current_lru_cache", function(req, res) {
  res.send(lru_cache);
});

// Post new choice into lru_cache_object
// Check if index exists > Check if cache is full > if index exists push to front
// Insert into array anyways
// If index not exists, push to top of array
// Pop out index 0
app.post("/request", function(req, res) {
  let movie_name = req.body.movie_name;
  console.log(req.body.movie_name);

  client_location = req.body.location;
  console.log("The request location is", client_location.x);
  const cache_index = lru_cache.indexOf(movie_name);
  console.log(cache_index);
  console.log(lru_cache);

  if (cache_index < 0) {
    if (lru_cache.length === cache_size) {
      lru_cache.splice(0, 1);
    }
    lru_cache.push(movie_name);
  } else {
    lru_cache.splice(cache_index, 1);
    lru_cache.push(movie_name);
  }
  console.log(lru_cache);

  for (let i = 0; i < nodes_list.length; i++) {
    console.log("printing", base_url.concat(nodes_list[i]));
    axios
      .post(base_url.concat(nodes_list[i]), {
        location: node_location,
        cache: lru_cache
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log("err is" + err);
        console.log(err.message);
      });
  }

  // Calculate closest node
  for (let i = 0; i < node_location.length; i++) {
    let x = parseInt(node_location[i].x);
    console.log("The x coordinate is", x);
    let y = parseInt(node_location[i].y);
    console.log("The y coordinate is", y);
    d = (x - parseInt(client_location.x)) / (y - parseInt(client_location.y));
    console.log("The distance is", d);
    scores.push(d);
  }
  console.log(scores);
  let index_of_min = scores.indexOf(Math.min(...scores));
  console.log("The index of min is", index_of_min);

  res.send("success");
});

app.post("/hello", function(req, res) {
  lru_cache = req.body.cache;
  console.log("updated cache is", lru_cache);
  console.log(lru_cache.type);
  cache_interval.clearInterval();
  setCacheInterval();
  res.send(req.body);
});

// Post list of nodes
app.post("/addnodeslist", function(req, res) {
  nodes_list = req.body.nodes;
});

app.post("/addnodelocations", function(req, res) {
  nodes_locations;
});

var server = app.listen(3003, console.log("Listening on port 3003"));

// Setup websocket
var io = socket(server);

//
