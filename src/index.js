// import exampleImage from './images/example.jpg';
//
// const img = new Image();
// img.src = exampleImage;
// document.body.appendChild(img);



function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));


// images.forEach(image => {
//     const img = document.createElement('img');
//     img.src = image.default;
//     document.body.appendChild(img);
// });
