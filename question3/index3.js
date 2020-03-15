// This Node.js server is for a single node
// There maybe multiple autonomous nodes
// A user here for example selects from a list 'choices', cache_size = 3
// Everytime a value is selected by the user from the list, the program checks if the key is already present in the cache object
// If value is there then shift position by -1 else insert to the top of the row by deleting the element with last index
// There is atleast 1 central node and one or more edge locations
// API requests from client side are always placed to the central node.
// The request takes in a location object and choice from the choices array
// Depending on distance, the nearest node will reply back to the client
// It will also check the stack object to see if the same choice is present and if the stack if full
// Accordingly, it updates the stack
// The node will also send a post request with the current stack to all other nodes to be updated
// A central list of all nodes is kept in both central and sec nodes
// in case client API request results in error, api request to next nearest node is placed if promise is not returned (Automatic concurrent failover)

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
  { x: "200", y: "500" },
  { x: "300", y: "500" },
  { x: "400", y: "500" }
];

// Initially set cache empty array
let lru_cache = [];

client_location = [];

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
    let index_of_min = scores.indexOf(String(Math.min(d)));
    console.log("The index of min is", index_of_min);
  }

  res.send("success");
});

app.post("/hello", function(req, res) {
  lru_cache = req.body.cache;
  console.log("updated cache is", lru_cache);
  console.log(lru_cache.type);
  res.send(req.body);
});

// Post list of nodes
app.post("/addnodeslist", function(req, res) {
  nodes_list = req.body.nodes;
});

app.post("/addnodelocations", function(req, res) {
  nodes_locations;
});

var server = app.listen(3004, console.log("Listening on port 3000"));

// Setup websocket
var io = socket(server);

//
