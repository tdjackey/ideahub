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
http://ideahub.thu.io/
```
##api test

###newIdeaboard test

```
curl -X POST -H 'content-type:application/json' -d '{"ideaboardName":"hackshanghai","description":"this is an test_ideaboard","website":"http://hackshanghai.com/"}' http://localhost:3009/ideaboard
```

###newIdea test
```
curl -X POST -H 'content-type:application/json' -d '{"user_id":"test_author","title":"test_idea","ideaboardName":"hackshanghai","description":"this is an test_idea"}' http://localhost:3009/idea
```
###newUser test
```
curl -X POST -H 'content-type:application/json' -d '{"user_id":"test"}' http://localhost:3009/user
```
###listSpecific Hackathon idea test
```
curl -X GET 'http://localhost:3009/b/hackshanghai'
```

###listUser test
```
curl -X GET 'http://localhost:3009/user'
```
###listIdea test
```
curl -X GET 'http://localhost:3009/idea'
```

