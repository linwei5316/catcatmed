document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.navigation')
  const navBtn = document.querySelector('.navigation-m-btn')

  window.addEventListener('scroll', () => {
    let y = window.scrollY

    y >= 15
    ? nav.classList.add('is-scrolled')
    : nav.classList.remove('is-scrolled')
  })
  
  navBtn.addEventListener('click', () => {
    nav.classList.toggle('open')
  })
})