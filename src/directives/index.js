

export const clickOutside = {
  mounted(el, { value}, x) {
    el.ClickOutSide = ({ clientX, clientY }) => {
      var { left, top, width, height } = el.getBoundingClientRect()
      if (!(clientX > left && clientX < left + width && clientY > top && clientY < top + height)) {
         value()

      }else{

      }
    }
    setTimeout(() => {
      document.addEventListener('click', el.ClickOutSide)
    }, 0)
  },

  unmounted: (el) => {
    document.removeEventListener('click', el.ClickOutSide)
  }
}




