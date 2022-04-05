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
    this.list = [...element.querySelectorAll('.img')]
    this.modal = getElement('.modal')
    this.modalImg = getElement('.main-img')
    this.imageName = getElement('.image-name')
    this.closeBtn = getElement('.close-btn')
    this.nextBtn = getElement('.next-btn')
    this.prevBtn = getElement('.prev-btn')
    this.modalImgs = getElement('.modal-images')
    let self = this
    this.closeModal = this.closeModal.bind(this)
    this.nextImage = this.nextImage.bind(this)
    this.prevImage = this.prevImage.bind(this)
    this.chooseImage = this.chooseImage.bind(this)

    //bind the openModal to the gallery not the container
    // this.openModal = this.openModal.bind(this)
    // on click of the container, the modal opens
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('img')) {
        self.openModal(e.target, this.list)
      }
    })
  }
  openModal(selectedImg, list) {
    this.setMainImg(selectedImg)
    this.modalImgs.innerHTML = list
      .map((img) => {
        return `<img src="${img.src}" title="${img.title}"  data-id="${
          img.dataset.id
        }" class= "${
          selectedImg.dataset.id === img.dataset.id
            ? 'modal-img selected'
            : 'modal-img'
        }"/>`
      })
      .join('')
    this.modal.classList.add('open')
    this.closeBtn.addEventListener('click', this.closeModal)
    this.nextBtn.addEventListener('click', this.nextImage)
    this.prevBtn.addEventListener('click', this.prevImage)
    this.modalImgs.addEventListener('click', this.chooseImage)
  }
  setMainImg(selectedImg) {
    this.modalImg.src = selectedImg.src
    this.imageName.textContent = selectedImg.title
  }
  closeModal() {
    this.modal.classList.remove('open')
    this.closeBtn.removeEventListener('click', this.closeModal)
    this.nextBtn.removeEventListener('click', this.nextImage)
    this.prevBtn.removeEventListener('click', this.prevImage)
    this.modalImgs.removeEventListener('click', this.chooseImage)
  }
  nextImage() {
    const selected = this.modalImgs.querySelector('.selected')
    const next = selected.nextElementSibling || this.modalImgs.firstElementChild
    selected.classList.remove('selected')
    next.classList.add('selected')
    this.setMainImg(next)
  }
  prevImage() {
    const selected = this.modalImgs.querySelector('.selected')
    const prev =
      selected.previousElementSibling || this.modalImgs.lastElementChild
    selected.classList.remove('selected')
    prev.classList.add('selected')
    this.setMainImg(prev)
  }
  chooseImage(e) {
    if (e.target.classList.contains('modal-img')) {
      const selected = this.modalImgs.querySelector('.selected')
      selected.classList.remove('selected')
      this.setMainImg(e.target)
      e.target.classList.add('selected')
    }
  }
}
const nature = new Gallery(getElement('.nature'))
const city = new Gallery(getElement('.city'))
