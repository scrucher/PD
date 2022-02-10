#Food-Delivery-App
this app is built using nodejs typescript and mongoDB in combination with mapquest API to estimate the best road timing and so on 
to get a copy of the project run 
```angular2html
git clone git@github.com:scrucher/PD.git
```
then cd into the project 
```angular2html
cd PD
```
then install the dependencies needed using 
```angular2html
npm install
```
the project is also using docker for development and deployment so to build your development envirement run
```angular2html
sudo docker-compose up --build
```
to build the project run 

```angular2html
npm run build 
```

the previous command build the project by tsc which compile the typescript language into javascript then it wil be accessible via dist directory 
to run the built  copy run 
```angular2html
node dist/index.js
```