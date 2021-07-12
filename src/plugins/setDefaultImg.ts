import defaultImg from '../assets/new_img/default.png'
export default {
  install (app: any) {
    app.config.globalProperties.$setDefaultImg = (event: any) => {
      // event.target.className += ' error_img';
      event.target.src = defaultImg
    }
  }
}