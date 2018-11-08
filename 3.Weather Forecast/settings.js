class getElement{
	constructor(selector){
		this.elem = document.querySelector(selector);
	}
	inner(value){
		return this.elem.innerHTML = value;
	}
};

export {getElement};