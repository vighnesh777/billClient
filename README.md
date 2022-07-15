**Installation**
- Download project from https://github.com/vighnesh777/billClient.git
```
cd billClient
npm install
npm start
```

**Pre Requisites**
- npm
- nodeJs
---
**Frontend Libraries**
- react-router-dom
- axios
---
**Backend Libraries**
- cors
- express
- nodemon
- mongoose
- dotenv
---
**Techstack- MERN**
- MongoDB
- ExpressJS
- ReactJs
- NodeJS
---
## Project Screen Shots
**Home Page at '/' route**
![](https://he-s3.s3.amazonaws.com/media/uploads/2be7ca4.jpg)
**Add bill Page at '/addBill' route**
![](https://he-s3.s3.amazonaws.com/media/uploads/3b29d21.jpg)
**Bill summary at '/bill/:id' route**
![](https://he-s3.s3.amazonaws.com/media/uploads/43093f6.jpg)
**Edit bill page at '/:id/edit' route**
![](https://he-s3.s3.amazonaws.com/media/uploads/4b351a3.jpg)
**Pagination- 9 values for each page**
![](https://he-s3.s3.amazonaws.com/media/uploads/5245768.jpg)
**Unsorted table is displayed on every reload**
![](https://he-s3.s3.amazonaws.com/media/uploads/598e46d.jpg)
**Clicking on Sort by Amount over the table sorts the table in Ascending order first**
![](https://he-s3.s3.amazonaws.com/media/uploads/6379840.jpg)
**Clicking on Sort by Amount again sorts the table in Descending order and so on**
![](https://he-s3.s3.amazonaws.com/media/uploads/738764c.jpg)
---
## Deployment Instructions
- Upload project to github via terminal or through desktop website
- Login to Heroku(https://heroku.com/)
- Create new app and goto the deploy tab and connect to github account on deploy tab 
- Scroll through projects on github , and hit connect 
- Now go to setting and add a build package to make the build quick
- Common build package we used is https://github.com/mars/create-react-app-buildpack
- Now hit deploy branch on the heroku deploy tab
- Build is gonna start and if there is an issue , view build logs for further information

**A picture where we connect our github on deploy tab**
![](https://he-s3.s3.amazonaws.com/media/uploads/a83c23c.jpg)