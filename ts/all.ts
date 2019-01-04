// 偵測若有帶 hash 過來，拔取並準備跳至該區
const hash = window.location.hash
window.location.hash = ''

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.navigation')
  const navBtn = document.querySelector('.navigation-m-btn')
  const linkList = document.querySelectorAll('.scroll-link')
  let scrollAnimation = false

  // scroll 動畫
  function step(){
    let diff = Math.floor((window.scrollY - (this.offsetTop - navHeight)) / 10)
    let scrollTo = window.scrollY - diff // 就會是這幀要前往的位置
    window.scrollTo(0, scrollTo)
    
    console.log('diff', diff)
    
    if(getScrollTop() + getWindowHeight() === getScrollHeight()){
      scrollAnimation = false
      return
    }else if(getScrollTop() === 0){
      console.log('到頂！')
      scrollAnimation = false
      return
    }

    if(Math.abs(diff) > 0){
      requestAnimationFrame(step.bind(this))
    }else{
      scrollAnimation = false
    }
  }

  // 菜單捲動加上底色
  window.addEventListener('scroll', () => {
    let y = window.scrollY

    y >= 15
    ? nav.classList.add('is-scrolled')
    : nav.classList.remove('is-scrolled')
  })
  
  // 手機版菜單按鈕
  navBtn.addEventListener('click', () => {
    nav.classList.toggle('open')
  })

  // 跳轉頁面若帶 hash 就滾動至該欄位
  if(hash){
    const scrollToTarget:HTMLElement = document.querySelector(hash)

    requestAnimationFrame(step.bind(scrollToTarget))
  }

  // 綁定連結捲動事件
  const navHeight = document.querySelector('.navigation').clientHeight
  linkList.forEach(item => {
    item.addEventListener('click', ev => {
      ev.preventDefault()
      // 關閉手機版菜單
      nav.classList.remove('open')

      const linkTarget = ev.target
      
      
      if((linkTarget as HTMLAnchorElement).hash){
        if(scrollAnimation) return  // 避免重複觸發
        
        const scrollToTarget:HTMLElement = document.querySelector((linkTarget as HTMLAnchorElement).hash)
        scrollAnimation = true
        
        requestAnimationFrame(step.bind(scrollToTarget))
      }
    })
  })
})

function getScrollTop(){
  let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0
  if(document.body){
    bodyScrollTop = document.body.scrollTop
  }
  if(document.documentElement){
    documentScrollTop = document.documentElement.scrollTop
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
  return scrollTop
}

function getScrollHeight(){
  let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  let bSH
  let dSH
  if(document.body){
    bSH = document.body.scrollHeight
  }
  if(document.documentElement){
    dSH = document.documentElement.scrollHeight
  }
  scrollHeight = (bSH - dSH > 0) ? bSH : dSH
  return scrollHeight
}

function getWindowHeight(){
  let windowHeight = 0;
  if(document.compatMode == "CSS1Compat"){
    windowHeight = document.documentElement.clientHeight
  }else{
    windowHeight = document.body.clientHeight
  }
  return windowHeight
}