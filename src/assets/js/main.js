
export default function textMove(){
 
const typed = new Typed('.typed', {
    strings:['<i>Hello</i>!','<i>Welcome to my page</i>',
  ],
    typeSpeed:75,
    startDelay: 300,
    backSpeed:75,
    smartBackspace:true,   
    shuffle:false,
    backDelay:1500,
    loop:true,
    loopCount:0,
    showCursor:true,
    cursorChar:'|',
    contentType: 'html',
});}