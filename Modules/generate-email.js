const fetch = require("node-fetch");

fetch("https://mail.owo69.me/api/v1/add/time_limited_alias", {
  "headers": {
    "accept": "application/json",
    "accept-language": "en-US,en;q=0.9",
    "sec-ch-ua": "\"Not-A.Brand\";v=\"99\", \"Opera\";v=\"91\", \"Chromium\";v=\"105\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "PHPSESSID=5054a71c9a40adf29a1cb45ac014a6fd",
    "Referer": "https://mail.owo69.me/",
    "Referrer-Policy": "strict-origin"
  },
  "method": "POST",
  "body": "attr=%7B%22domain%22%3A%22fubuki.bar%22%7D&csrf_token=93b014823620b10d1f789f4c3ee42d4301aa36fb1d9fcd732f30b0388addaad9"
}).then(res => res.text()).then(console.log)