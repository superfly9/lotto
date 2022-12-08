const lotto = {
  howManyPick : 10,
  nthGame : 1,
  ORIGINAL_BALL : 22,
  REMAIN_BALL: 22,
  SELECTED_BALL : 0,
  isReset : false,
  btn: document.getElementById('js-create-number'),
  multiBtn: document.getElementById('js-multi-number'),
  input : document.querySelector('#how_many'),
  saveBtn : document.querySelector('#save'),
  createNumberRange() {
    const MIN = 1, MAX = 320;
    let nums = [];

    for (let i = MIN; i <= MAX; i++) {
      nums.push(i);
    }

    return nums;
  },
  makeEl () {
    const numberList = document.querySelector('.number_list');
    const printTarget = [...numberList.children];
    printTarget.forEach(item => item && item.remove());

    console.log('[이번 턴 갯수]:',this.howManyPick)
    console.log('[이번 턴 몇 번째]:',this.nthGame)
    for (let i = 0;i< this.howManyPick;i++) {
      const li  = document.createElement('li')
      console.log('li',li,'[index]:',i)
      numberList.appendChild(li)
    }
  },
  reset () {
    alert('모든 공을 뽑았습니다.초기화가 됩니다.')
    this.nthGame = 1;
    this.SELECTED_BALL = 0;
    this.REMAIN_BALL = this.ORIGINAL_BALL;
    this.howManyPick = 10;
    this.isRest = true;
    
    const target = document.querySelector('.number_list');

    [...target.children].forEach(item=>item && item.remove());

    new Array(this.howManyPick).fill('?').forEach(item=>{
      const li = document.createElement('li');
      li.innerHTML = item;
      target.appendChild(li)
    })
  },
  printNumber() {
    if (this.nthGame === 3) {
      this.howManyPick = 2;
    }
    if (this.nthGame > 3) return this.reset();

    this.SELECTED_BALL += this.howManyPick;
    this.REMAIN_BALL -= this.howManyPick;
    const nums = this.createNumber();

    this.makeEl();
    this.isReset = false;
    this.nthGame+=1;

    const target = document.querySelector('.number_list');
    // const target2 = document.querySelector('.js-only-paper .game_item');
    const printTarget = [...target.children];
    // const paperTarget = [...target2.children];
    console.log('[printTarget]:',printTarget)
    printTarget.forEach((item, index) => {item.innerHTML = nums[index]});

    target.classList.add('play');
    // document.querySelector('.js-only-paper').classList.add('play');
    
    const id = setTimeout(() => {
      target.classList.remove('play');
      // document.querySelector('.js-only-paper').classList.remove('play');
      clearTimeout(id)
    },3000);
    
    // for (let i = 0; i < paperTarget.length; i++) {
    //   paperTarget[i].innerHTML = nums[i];
    //   printTarget[i].innerHTML = nums[i];
    // }
  },
  printCount () {
    const selectedSum =  document.querySelector('.count_sum');
    const current = document.querySelector('.count_current');
    const remain = document.querySelector('.count_remain');

    selectedSum.innerHTML = this.SELECTED_BALL +'개'
    current.innerHTML = (this.isReset ? 0  : this.howManyPick ) +'개'
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
    console.log(nums)
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
    },3000);

    paperTarget.forEach((item, index, arr) => {
      let printTarget = [...item.children]

      for (let j = 2; j < printTarget.length; j++) {
        printTarget[j].innerHTML = nums[index][j - 2];
      }
    });
  },
  init() {
    const btn = this.btn;
    const multiBtn = this.multiBtn;


    btn.addEventListener('click', () => {
      this.printNumber();
      // this.printCount()
      // this.printDate('.publish_date');
    });
    // multiBtn.addEventListener('click', () => {
    //   this.printMultiNumber();
    //   this.printDate('.publish_date2');
    // });
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
const lottoSlide = () => {
  const nextBtn = document.getElementById('js-slide-next');
  const prevBtn = document.getElementById('js-slide-prev');

  nextBtn.addEventListener('click', slideChange);
  prevBtn.addEventListener('click', slideChange);
  
};

lotto.init();
// lottoSlide();