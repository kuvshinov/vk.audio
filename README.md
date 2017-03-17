# vk.audio
Service for managing your vk audio

# Since December 16, 2016 VK disable public api for audio files. So this project not relevant any more :(

## Configuration
Create config.json file and put it near config.js in config directory. This file have to contains the following field:
```javascript
{
  "db": {
    url: "",
    options: {}
  }
  "vk": {
	 "app_id": "",
	 "secret_key": ""
	}
}
```
Just replace empty strings to your values.

## API
I support the following methods:

URL|Method|Description
---|------|-----------
/api/|GET|returns all user's playlist
/api/:id|GET| returns audio records related to playlist
/api/:id|POST|create new playlist
/api/:id|PUT|rename playlist
/api/:id|DELETE|delete playlist
