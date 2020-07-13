1.description:

   1) The project is a Single Page Application, the backend and front end are independent
   
   2) Core Functions are Employer and Employee login, register, Live Chat，Employers and Employees List, Messages List etc
   
   3) Front End Tech: ES6, Webpack, React, Router, Redux and SocketIO
   
   4）Back End Tech: Node, Express, Mongodb, Mongoose, SocketIO
   
   5) Adopt modularization, componentization and engineering mode development
   
   6) basic functions: user register and login, user info and profile page, employers/employees list page,
                       messages list page, chat page(using socketIO to implement live chat function)      
     

2.how to run? 

	1) install node.js

	2) install mongodb
	
	3) cd employment-client, npm start
	
	4) cd employment-server, npm start

3. how it work in the Client Side?

Directors:
1) employment-client/src/containers: store pages, each page has multi components which store in employment-client/src/components
2) employment-client/src/components: each component can be reused for different page, every component including relative assets like images,css
3) employment-client/src/api: encapsulation axios api and export different api methods in index.js 
4) employment-client/src/assets: global css and images
5) employment-client/src/utils: reused utils functions or objects
6) employment-client/src/redux, use for manage the data status, connect axios api and pages,including store,actions,and action-type and reducers

the basic redux workflow:
1. use redux store(store.js) in the entrance: index.js, store will bring reducer to each page
2. on each page, connect redux and page props, which means once the reducer update the state,
   page props will update and render the page again. 
3) the page can call redux action functions(actions.js),the action functions can call axios api, and dispatch relative action.
4) every action have action type(action-types.js),the action type will recognized by reducer(reducers),
5) reducers update the status and return back by store to page props.

how it work in the Server Side?
1) employment-server/routes/index.js: define routes and manipulate mongoDB, as the business logic in server side are simple, didn't separate layers
2) employment-server/socketIO/socket-server.js: handle socket requests    

the basic SocketIO workflow:
   when send chat message on the chat page, client socket will emit data via 'sendMsg' port, the serve socket liston this port and store new chat record 
   in mongoDB, then emit data to 'receiveMsg' port, the client socket listen this port and use redux to update the state and page props.
