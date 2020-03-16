<h1>So What is gLRuManager?</h1>

It is a HTTP REST based geo distributed with near realtime cross origin data replication, LRU caching library. It also supports low latency response times based on closest edge location. So,this node.js based server can be deployed in several geolocations around the world. When the client side app places a request through a load balancer to one of these nodes, the following happens:

1. Server recieves client location and information being requested in the form of a choice
2. THe server then checks if the users choice is there in its local cache array and inserts if not there in the array
3. It then checks if th array is full. If array is full, it splices out the least used element
4. If the element is already present then it will move it to the top of the array
5. This array is then sent as a POST request to a list of all nodes available in the node_list
6. The other nodes receive this new cache object from /hello end point and update local cache
7. Cache expiry can be set in seconds. Every node has its own time and clears the cache every set period
8. If cache object is updated, the time resets and starts counting froom beginning
9. Once cache object is updated in STEP 4:, the server also calculates the distance between client location and all other nodes from node-lcoations array using distance = (x2-x1)/(y2-y1) - coordinate geometry distance between two points 
10. The min of the shortest distance is determined
11. The index of the shortest distnce in te above array is determine and a response is sent back to the client frontend.
12. Client can not use the end point url obtained from index in step 11 and place a request to the nearest determines node and download the cache 
13. Even if one node fails, all other nodes have the same cache object!

Features:

- Configarible cache size
- Autofail over to next closest node
- Caching and deletion based on least used item
- Automatic data replicationa across all nodes
- Low latency geolocation based responses from edge lcoations

<h1>Tech Stack</h1>

Node.js Express Axios !

<h1> How does it work?</h1>

1. Client sends a POST reqquest with location and choice to central server
2. Central server finds closest node by comparing location
3. Central server posts info "" to cleint
   4 If this request to post fails, it triggers the next closest location to send the same
4. Cache is checked and updated if need be everytime a client posts a choice to the central server
5. Whenever, cache is updated in any particular node, a post request is send to all nodes witht he latest cache file for global replication


<h1> Future Improvements and missing functionalities </h1>

--- Currently, node configaration need too be done by adjusting the following params;
1. Cache size
2. Cache expiry
3. Nodes list
4. Nodes locations list
For the future I added provision to configure the node by simply sending a JSON object as a HTTP POST request to the node

--- Adding authorization header

1. Sending API requests in palin text is not secure. In the future we can generate a JWT token for all the servers and sent it in the Auth header. So, if token is valid, the api request is accepted and updated by the nodes.

2. Data encryption: A layer of data encryption should also be added so that system is secure

<h1> How to Use/Install: </h1>

1. download package and run npm install if necessary
2. There are two files index.js - port 3000 and index2.js - port 3002
3. Run node index.js in one terminal window to start the server 1
4. Run node index2.js in new terminal window to start server 2
5. Use a program such as insomnia or postman to send the following object to either one of the servers

   API end point for server 1: http://127.0.0.1:3000/request
   API end point for server 2: http://127.0.0.1:3002/request
   
Object structure that will have to be sent from client side:

{
	
	"movie_name": "pig",
	"location": {
		"x": 10,
		"y": 11
	}
 }
 
 ** movie_name = cache variable to be sent
 x,y : Client x and y coordinates
 
 6. Upon sendind the object you should see that in both the terminal windows of both server, new  updated cache object is printed
 7. To replicate this to multiple nodes, simply run the node repo on other servers. But, do not forget to change the nodes list and nodes lcoations list at the least
   



