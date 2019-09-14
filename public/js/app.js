console.log('Client side javascript file is loaded!');


//fetch is just like request used in node js

/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data)=> {
        console.log(data);
    });
});*/

/*fetch('http://localhost:3001/weather?address=Boston').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            console.log(data.location)
        }
    })
})
*/

const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

document.querySelector('form').addEventListener('submit', (e) => {

    e.preventDefault();

    const location = search.value;

    fetch('http://localhost:3001/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error;
                messageTwo.textContent = "";
            }
            else {
                //console.log(data.location)
                messageOne.textContent = "";
                messageTwo.textContent = data.location;
            }
        })
    });

});
