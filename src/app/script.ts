const ws = new WebSocket('ws://localhost:3020');

ws.onopen = () => console.log('ONLINE');
ws.onclose = () => console.log('OFFLINE');

fetch('http://localhost:3000/lastRatings')
  .then((response) => response.json())
  .then((data) => console.log(data));

ws.onmessage = (response) => console.log(JSON.parse(response.data));
