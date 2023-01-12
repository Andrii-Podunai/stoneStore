# fe_3_final_project

!!!!!!!
all inputs are required and keep the typing as in the example
category of cards can be only paper or glass or plastic or metal
type of cards can be only "free" or "sell" or "buy"
currency of the cards can be only "USD" or "EUR" or "UAH"
!!!!!!!

1)get by id, example:
fetch('http://localhost:8085/cards/63ac3243f21181d52f855de3')

2)get control array of cards example:
fetch('http://localhost:8085/cards/?page=1')
It will return by default 50 cards from the end.
If you enter "page=2" it will return by default 50 cards after 50 cards from the end, and so on...

fetch('http://localhost:8085/cards/?page=1&amount=10')
"amount"- another one query value, enter it if you want to change amount of return cards.

fetch('http://localhost:8085/cards/?page=1&category=paper')
!!!category can be paper or glass or plastic or metal!!!
"category" - another query value, enter it if you want to get one
page of cards with category "paper"

3)post image example:
const [files, setFiles] = useState([]);
const submitForm = (e) => {
e.preventDefault();
const fileData = new FormData();
for (const file of files) {
fileData.append('files[]', file);
}
fetch('http://localhost:8085/upload', {
method: 'POST',
body: fileData,
})
}
const handleChange = (e) => {
setFiles(e.target.files);
};
return(

<form onSubmit={submitForm}>
<input type="file" onChange={handleChange} />
<button type="submit">Submit</button>
</form>
)
Necessarily use key 'files[]' otherwise will be a mistake.
After success request you will receive an array like this:
[
{name: example.png, originalName: elseExample.png},
{name: example.jpg, originalName: elseExample.jpg}
]
Send this array in key "images" with request by number 4.

const raw = JSON.stringify({
"title": "Продаж склa",
"description": "Продам скло, є в наявності 200кг, усі деталі по телефону",
"price": 25,
"category": "glass",
"phoneNumber": 963331232,
"location": "проспект Перемоги 33",
"currency": "USD",
"name": "andrii",
"count": 200,
"images": [
{
"name": "LVLzk4whRHP58sHVmSfsX.webp",
"originalName": "test-image.webp"
}
],
"type": "sell"
});

!!! If you want to create or update or delete card or keep your own cards what you created you have to write token in header when you do request !!!

example token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImZQOU1CU1lhUGlhcU54eHEyZFRiSCJ9.eyJpc3MiOiJodHRwczovL3Z0b3JtYWxsLmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJ1Ujh2OVhuY0t5bGExUFVWU0VRWXJEOFV5eURBNVpMNEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hcGkudnRvcm1hbGwiLCJpYXQiOjE2NzMzMDE2NDIsImV4cCI6MTY3MzM4ODA0MiwiYXpwIjoidVI4djlYbmNLeWxhMVBVVlNFUVlyRDhVeXlEQTVaTDQiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJwZXJtaXNzaW9ucyI6W119.ncRv4kYEfOEDtmrN_I-V0Ce9FoenL7dOHrZp5cZFR1t2l3-NhJaIajCLE_5MJv9uvPlTiIiXhyz2lfoFZQqUJx8fpKUdKMonQr3owMtmBHzHT3eWWvQ6amxYaxRgZyK7VUEqhQf-e0lYajR3XUYIKAsa9E7kOZ-VftTSd5_sKPLhu3Ll_c0or4iwbhLqpbub_3Mk9Dg62pXTA4rxFVxi94hAi4S6HG8yI9hNN7BfZJoHltwQaIvhkpPjlMOm01tOUx6pz86dtu7JgG8vsTj2-5B2i23HOYlnKqMrUkjXD5zzXkSxLMqHyOyOIv-xsBSbRqBijfo9NValTwWY5TTibw'

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append(
'Authorization',
`Bearer ${token}`
);

4)post card example:
const requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
};

fetch('http://localhost:8085/cards', requestOptions)
.then((response) => response.text())
.then((result) => console.log(result))
.catch((error) => console.log('error', error));

If you send images, always use array "[]" even if you want to send only 1 image also use array.
In name to image use name witch you will receive from request by number 3.

To correctly display image use this example:
<img src={`http://localhost:8085/public/cards-images/${images[0].name}`} alt="img" crossOrigin="anonymous" />;
In src you enter url with the name which you will receive from server
and don't forget about ' crossOrigin="anonymous" ', it will not work without this

5.pull card example:
const requestOptions = {
method: 'PUT',
headers: myHeaders,
body: raw,
};

fetch('http://localhost:8085/cards/63b1cbe19838325feebe5185', requestOptions)
.then((response) => response.text())
.then((result) => console.log(result))
.catch((error) => console.log('error', error));

6.delete card example:
const requestOptions = {
method: 'DELETE',
headers: myHeaders,
};
fetch("http://localhost:8085/cards/63b1cbe19838325feebe5185", requestOptions)

.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));

7.get your own cards what you created example:
const requestOptions = {
method: 'GET',
headers: myHeaders,
};
fetch("http://localhost:8085/my/cards", requestOptions)
.then(response => response.json())
.then(result => console.log(result))
.catch(error => console.log('error', error));

8.get count "active" cards:
fetch('http://localhost:8085/cards/count')

9.delete images example:
fetch('http://localhost:8085/upload', {
method: 'DELETE',
body: ["name.webp"]
})
