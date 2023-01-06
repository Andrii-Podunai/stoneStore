# fe_3_final_project

!!!!!!!
all inputs are required and keep the typing as in the example
category of cards can be only paper or glass or plastic or metal
type of cards can be only "free" or "sell" or "buy"
!!!!!!!

1)get by id, example:
fetch('http://localhost:8085/cards/63ac3243f21181d52f855de3')

2)get control array of cards example:
fetch('http://localhost:8085/cards/?page=1')
It will return by default 50 cards from the end.
If you enter "page=2" it will return by default 50 cards after 50 cards from the end, and so on...

fetch('http://localhost:8085/cards/?page=1&amount=10')
"amount"- another one query value, enter it if you want to change amount of return cards.

fetch('http://localhost:8085/cards/?page=1&category=paper)
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

const raw = {
name: 'Mike',
price: 16,
title: 'sell metal',
description: 'good price',
category: 'metal',
phoneNumber: '380972635263',
count: 3,
currency: 'dollar',
location: 'Lviv',
type: "free",
images: [
{
name: 'LVLzk4whRHP58sHVmSfsX.webp',
originalName: 'test-image.webp',
},
],
};

4)post card example:
fetch('http://localhost:8085/cards', {
method: 'POST',
body: JSON.stringify(raw),
headers: {
'Content-Type': 'application/json',
},
})
If you send images, always use array "[]" even if you want to send only 1 image also use array.
In name to image use name witch you will receive from request by number 3.

To correctly display image use this example:
<img src={`http://localhost:8085/public/cards-images/${images[0].name}`} alt="img" crossOrigin="anonymous" />;
In src you enter url with the name which you will receive from server
and don't forget about ' crossOrigin="anonymous" ', it will not work without this

5. pull card example:
   fetch('http://localhost:8085/cards/63b1c41e9838325feebe5183', {
   method: 'PUT',
   headers: {
   'Content-Type': 'application/json',
   },
   body: JSON.stringify(raw),
   })
   .then((response) => response.json())
   .then((result) => console.log(result))
   .catch((error) => console.log('error', error));

6. delete card example:
   fetch('http://localhost:8085/cards/63b1cbe19838325feebe5185', {
   method: 'DELETE',
   headers: {
   'Content-Type': 'application/json',
   },
   })
   .then((response) => response.json())
   .then((result) => console.log(result))
   .catch((error) => console.log('error', error));

7. get count "active" cards:
   fetch('http://localhost:8085/cards/count')
