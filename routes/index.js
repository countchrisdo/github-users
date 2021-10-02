var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const rootURL = 'https://api.github.com/';
const token = process.env.GITHUB_TOKEN;
/* GET home page. */
router.get('/', async function(req, res) {
  const username = req.query.username;
  if (!username) return res.render('index', { userData: null });
  const options = {
    headers: {
      Authorization: `token ${token}`
    }
  };
  const userData = await fetch(`${rootURL}users/${username}`, options).then(res => res.json());
  const repos = await fetch(userData.repos_url, options).then(res => res.json());
  userData.repos = repos;
  res.render('index', { userData });
});
// router.get('/', function(req, res) {
//   const username = req.query.username;
//   if (!username) return res.render('index', { userData: null });
//   const options = {
//     headers: {
//       Authorization: `token ${token}`
//     }
//   };
//   let userData;
//   fetch(`${rootURL}users/${username}`, options)
//     .then(res => res.json())
//     .then(user => {
//       userData = user;
//       return fetch(userData.repos_url, options);
//     })
//     .then(res => res.json())
//     .then(repos => {
//       userData.repos = repos;
//       res.render('index', { userData });
//     });
// });
module.exports = router;