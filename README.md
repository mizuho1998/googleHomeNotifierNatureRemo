googleHomeNotifierNatureRemo
===

## Install

You neet to set your Nature Remo access token in nature_remo_room_monitor.js.

You need to do the following:

```
cd node_modules/google-home-notifier
vim package.json  

>
> "google-tts-api": "0.0.4", # change
>

npm update google-tts-api 
```

test

```
 curl -X GET -H "Content-Type:application/json" -d '{"value":"temperature"}' <url>
```