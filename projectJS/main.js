 class ItemCart {
 	//карточка товара
 	name = ''
 	price = 0
 	count = 1
 	imgsrc = ''
 	
 	constructor(name, price, imgsrc) {
 		this.name = name
 		this.price = price
 		this.imgsrc = imgsrc
 		this.getMainTemplate()
 	}

 	inc() {
 		this.count++
 	}

 	dec() {
 		this.count--
 	}

 	getAddBtn() {
 		const btn = document.createElement('button')
 		btn.classList.add('btn')
 		btn.innerText = 'Купить'

 		btn.addEventListener('click', () => {
 			const CartInstance = new Cart()
 			CartInstance.add(this)
 			console.log(CartInstance)
 		})

 		return btn
 	}

 	getMainTemplate() {
 		const { price, name, imgsrc } = this
 		const block = document.createElement('div')
 		block.classList.add('good')

 		block.innerHTML = `
      <div class="good_img">
       <img class="img" src="${imgsrc}" />
      </div>
      <div class="good_name"> <span>${name}</span></div>
      <div class="good_price">Цена: <span>${price}</span></div>
    `

 		block.appendChild(this.getAddBtn())

 		return block
 	}

 	getMinusBtn() {
 		const btnMinus = document.createElement('button')
 		btnMinus.classList.add('btn_minus')
 		btnMinus.innerText = 'Удалить'

 		btnMinus.addEventListener('click', () => {
 			const CartInstance = new Cart()
 			CartInstance.remove(this)
 		})



 		return btnMinus
 	}

 	getCartTemplate() {
 		const {	price, name, count } = this

 		const block = document.createElement('div')
 		block.classList.add('cart')

 		block.innerHTML = `
 		<div classs="cart_item">
 		 ${name}: ${price} X ${count} = ${price * count}
 		</div>
 		`

 		block.appendChild(this.getMinusBtn())

 		return block

 	}
 }

 class List {
 	items = []

 	constructor(items = []) {
 		this.items = items
 	}

 	findGood(good) {
 		return this.items.filter(item => item.name === good.name)[0]
 	}
 	add(item) {
 		// проверка на дубляж
 		const exist = this.findGood(item)
 		if (exist) {
 			exist.inc()
 		} else {
 			this.items.push(item)
 		}
 		this.render()
 	}
 	remove(item) {
 		const exist = this.findGood(item)
 		if (exist.count > 1) {
 			exist.dec()
 		} else {
 			this.items = this.items.filter(good => item.name !== good.name)
 		}
 		this.render()
 	}
 	render() {

 	}

 }
 class Cart extends List {
 	constructor() {
 		if (Cart._instance) {
 			return Cart._instance
 		}
 		super()
 		this.init()
 		Cart._instance = this
 	}

 	init() {
 		const block = document.createElement('div')
 		block.classList.add('cart')

 		const btn = document.createElement('div')
 		btn.innerText = 'Корзина'
 		btn.classList.add('btn')
 		btn.addEventListener('click', () => {
 			this.toggle()
 		})

 		const list = document.createElement('div')
 		list.classList.add('cart_list')

 		block.appendChild(btn)
 		block.appendChild(list)

 		const placeToRender = document.querySelector('header')
 		if (placeToRender) {
 			placeToRender.appendChild(block)
 		}
 		this.render()
 	}

 	toggle() {
 		const list = document.querySelector('.cart_list')
 		list.classList.toggle('shown')
 	}

 	getEmptyBlock() {
 		const block = document.createElement('div')
 		block.classList.add('cart_empty')
 		block.innerText = 'Корзина пуста'
 		return block
 	}
 	getSumBlock() {
 		const sum = this.items.reduce((sum, good) => {
 			return sum + good.price * good.count
 		}, 0)
 		const block = document.createElement('div')
 		block.classList.add('.cart_sum')
 		block.innerText = `Сумма к оплате: ${sum}`
 		return block
 	}
 	render() {
 		const placeToRender = document.querySelector('.cart_list')
 		placeToRender.innerHTML = ''
 		if (!this.items.length) {
 			placeToRender.appendChild(this.getEmptyBlock())
 		} else {
 			this.items.forEach(good => {
 				placeToRender.appendChild(good.getCartTemplate())
 			})
 			placeToRender.appendChild(this.getSumBlock())
 		}
 	}
 }
 class GoodsList extends List {
 
 	constructor() {
 		super()
 	}

 	render() {
 		const placeToRender = document.querySelector('.goods-list')
 		placeToRender.innerHTML = ''
 		if (placeToRender) {
 			this.items.forEach(good => {
 				const block = good.getMainTemplate()
 				placeToRender.appendChild(good.getMainTemplate())
 			})
 		}
 	}
 }

 const GoodsListInstance = new GoodsList()
 GoodsListInstance.add(new ItemCart('Жесткий диск', 3000, './WD10PURZ.jpeg' ))
 GoodsListInstance.add(new ItemCart('Видеорегистратор', 5000, './DH-XVR4104C-X1.png' ))
 GoodsListInstance.add(new ItemCart('Видеокамера', 2500, './DH-HAC-HFW1220RP-0280B.jpeg' ))

 const CartInstance = new Cart()

 GoodsListInstance.render()
