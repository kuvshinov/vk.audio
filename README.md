# vk.audio
Service for managing your vk audio

## Configuration
Create config.json file and put it near app.js. This file have to contains the following field:
```javascript
{
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
