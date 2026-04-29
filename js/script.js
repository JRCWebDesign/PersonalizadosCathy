document.getElementById('catalogBtn').addEventListener('click',()=>{
  window.open('https://wa.me/59800000000?text=Hola%20quiero%20ver%20el%20catalogo','_blank');
});

// scroll suave
for(const link of document.querySelectorAll('a[href^="#"]')){
  link.addEventListener('click',e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
}