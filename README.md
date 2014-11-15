#Thacks Idea Board

##Tech used by now
 - coffee
 - grunt
 - express + mongodb
 - redis
 - forever 

# REMEMBER 
```
npm install
```
 
##How to start
```
	forever start app.js
``` 

#Test
##Website for test
```
```
##api test

###newIdea test
```
curl -X POST -H 'content-type:application/json' -d '{"user_id":"test_author","title":"test_idea","description":"this is an test_idea"}' http://localhost:3001/idea
```
###newUser test
```
curl -X POST -H 'content-type:application/json' -d '{"user_id":"test"}' http://localhost:3001/user
```

###listUser test
```
curl -X GET 'http://localhost:3001/user'
```
###listIdea test
```
curl -X GET 'http://localhost:3001/idea'
```

