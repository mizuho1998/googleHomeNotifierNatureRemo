const googlehome = require('google-home-notifier');
const bodyParser = require('body-parser');
const webClient  = require('request');
const ngrok      = require('ngrok');
const express    = require('express');

const language   = 'us';
const ipAddress  = '192.168.10.104'
const serverPort = 8079;
const app        = express();
const TOKEN      = 'you-nature-remo-token';

// googlehome speaks message
const googleNotify = (message) => {
    googlehome.ip(ipAddress, language);
    googlehome.notify(message, function(notifyRes) {
        console.log("message: " + message);
	    console.log(notifyRes);
    });
};

// to get json in get request
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Execute when a get request is received 
app.get('/', function (req, res) {   
    
    // get temperature or humidity from nature remo
    webClient.get({
        url: "https://api.nature.global/1/devices",
        headers: { "Authorization": "Bearer " + TOKEN }
    }, function(error, response, body){
        const obj   = JSON.parse(body)[0];
        const value = req.body.value || "";
        console.log(value);

	    if(value.includes("temperature")) {
            const te      = obj.newest_events.te.val;
            const teInt   = parseInt(te);
            const message = 'temperature is ' + teInt + ' degrees.';
            googleNotify(message);
            
        } else if(value.includes("humidity")) {
            const hu      = obj.newest_events.hu.val;
            const huInt   = parseInt(hu);
            const message = 'humidity is ' + huInt + ' %.';
            googleNotify(message);
	    }
    });

    res.send('OK');
})

app.listen(serverPort, function () {
    console.log("listen start");

    (async function() {
        const url = await ngrok.connect(serverPort);
        console.log("URL: " + url);
    })();
})




