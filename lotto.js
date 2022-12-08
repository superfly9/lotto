const lotto = {
  howManyPick : 10,
  MAX_COUNT: 10,
  btn: document.getElementById('js-create-number'),
  multiBtn: document.getElementById('js-multi-number'),
  input : document.querySelector('#how_many'),
  countDecideBtn : document.querySelector('#save'),
  createNumberRange() {
    const MIN = 1, MAX = 378;
    let nums = [];
    for (let i = MIN; i <= MAX; i++) {
      nums.push(i);
    }
    return nums;
  },
  inputChangeHandler (e) {
    if (e.target.value > this.MAX_COUNT) e.target.value = this.MAX_COUNT;
  },
  countDecideHandler () {
    if (this.input.value > 10) return alert('최대 10개 까지 뽑을 수 있습니다')
    this.howManyPick = this.input.value;
    alert(`${this.howManyPick}개를 뽑을게요!`);
    this.makeEl();
  },
  makeEl () {
    const numberList = document.querySelector('.number_list');
    const printTarget = [...numberList.children];
    printTarget.forEach(item => item && item.remove());
    for (let i = 0;i< this.howManyPick;i++) {
      const li  = document.createElement('li');
      li.innerHTML ='?';
      numberList.appendChild(li)
    }
  },
  printNumber() {
    const nums = this.createNumber();
    const target = document.querySelector('.number_list');
    const printTarget = [...target.children];
    
    printTarget.forEach(item=> {item.innerHTML = '?'});
    target.classList.add('play');
    const id = setTimeout(() => {
      target.classList.remove('play');
      clearTimeout(id)
      printTarget.forEach((item, index) => {item.innerHTML = nums[index]});
    },7000);
  },
  printCount () {
    const selectedSum =  document.querySelector('.count_sum');
    const current = document.querySelector('.count_current');
    const remain = document.querySelector('.count_remain');

    selectedSum.innerHTML = this.SELECTED_BALL +'개'
    current.innerHTML = this.howManyPick  +'개'
    remain.innerHTML =  this.REMAIN_BALL + '개'
  },
  createNumber() {
    const numberRange = this.createNumberRange();
    let nums = [];
    
    function setRandomIndex(num, max) {
      let number = Math.floor(Math.random() * max) + 1; // 1 ~ max까지의 숫자
      return num === number ? setRandomIndex() : number; // 중복발생시 재귀실행
    }

    numberRange.forEach((_, index, arr) => {
      let randomNum = setRandomIndex();
      if (index + 1 > this.howManyPick) {
        return false;
      } 
      if (!arr[randomNum]) {
        let prevNum = randomNum;
        randomNum = setRandomIndex(prevNum, arr.length - 1);
        nums.push(...arr.splice(randomNum, 1));
      } else {
        nums.push(...arr.splice(randomNum, 1)); // splice =>return 제거한 요소를 담은 배열
      }
    });
    nums.sort((a, b) => a - b );
    return nums;
  },
  getFormatDate (date) {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let day2 = week[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds() < 10? `0${date.getSeconds()}`: date.getSeconds();
  
    return `${[year, month, day].join('/')} (${day2}) ${[hours, minutes, seconds].join(':')}`;
  },
  getPublishDate() {
    const date = new Date();
    return this.getFormatDate(date);
  },
  printDate(name) {
    const date = this.getPublishDate();
    const target = document.querySelector(name);

    if (!target.classList.contains('on')) {
      target.classList.add('on');
    }
    target.innerHTML = `발행일 : ${date}`;
  },
  printMultiNumber() {
    const target = document.querySelector('.js-multi-paper .paper_body');
    const paperTarget = [...target.children];
    let nums = [];
    for (let i = 0; i < 5; i++) {
      nums.push(this.createNumber());
    }
    
    document.querySelector('.js-multi-paper').classList.add('play');
    setTimeout(() => {
      document.querySelector('.js-multi-paper').classList.remove('play');
    },5000);

    paperTarget.forEach((item, index, arr) => {
      let printTarget = [...item.children]

      for (let j = 2; j < printTarget.length; j++) {
        printTarget[j].innerHTML = nums[index][j - 2];
      }
    });
  },
  init() {
    const btn = this.btn;
    const countDecideBtn = this.countDecideBtn;
    const input = this.input;
    btn.addEventListener('click', () => {
      this.printNumber();
    });
    input.addEventListener('change',this.inputChangeHandler.bind(this))
    countDecideBtn.addEventListener('click',this.countDecideHandler.bind(this))
  }
};
function slideChange() {
  let id = this.getAttribute('id').split('-')[2];
  let currentSlide;
  const slideItem = [...document.querySelectorAll('.slide_item')]
  slideItem.forEach(item => {
    if (item.classList.contains('active')) {
      currentSlide = item;
    }
  });
  let currentIndex = slideItem.indexOf(currentSlide);

  slideItem.forEach(item => item.classList.remove('active'));
  if (id === 'next') {
    slideItem[currentIndex + 1].classList.add('active');
    this.classList.add('hide');
    prevBtn.classList.remove('hide');
  } else if (id === 'prev') {
    slideItem[currentIndex - 1].classList.add('active');
    this.classList.add('hide');
    nextBtn.classList.remove('hide');
  }
}

lotto.init();