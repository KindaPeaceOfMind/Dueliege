
table.style.left = scrollY*0.626 - 295 + 'px';
table.style.top = '500px';
window.addEventListener('scroll', ()=>{
    table.style.left = scrollY*0.626 - 300 + 'px';
});
scrollTo(0,document.documentElement.offsetHeight/4)