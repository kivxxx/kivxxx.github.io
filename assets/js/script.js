const text = 'C:\\> Welcome to my portfolio website.';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById('welcome-text').innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

window.onload = function() {
    typeWriter();
};