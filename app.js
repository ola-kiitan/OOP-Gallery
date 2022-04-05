function getElement(selection) {
  const element = document.querySelector(selection)

  if (element) {
    return element
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  )
}
class Gallery {
  constructor(element) {
    this.container = element
    this.list = [...document.querySelectorAll('.img')]
    this.modal = getElement('.modal')
    this.modalImg = getElement('.main-img')
    this.imageName = getElement('.image-name')
    this.closeBtn = getElement('.close-btn')
    this.nextBtn = getElement('.next-btn')
    this.prevBtn = getElement('.prev-btn')
    this.modalImgs = getElement('.modal-images')
    let self = this
    //bind the openModal to the gallery not the container
    // this.openModal = this.openModal.bind(this)
    // on click of the container, the modal opens
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('img')) {
        self.openModal(e.target, this.list)
      }
    })
    this.closeBtn.addEventListener('click', (e) => {
      self.closeModal()
    })
  }
  openModal() {
    console.log(this)
    this.modal.classList.add('open')
  }
  setMainImg(selectedImg, list) {}
  closeModal() {
    this.modal.classList.remove('open')
  }
}

const nature = new Gallery(getElement('.nature'))
const city = new Gallery(getElement('.city'))
