let 이번턴에뽑을숫자갯수 = 10;
let nthGame = 1;

const TOTAL_COUNT = 22;
const lotto = {
  btn: document.getElementById('js-create-number'),
  multiBtn: document.getElementById('js-multi-number'),
  createNumberRange() {
    const MIN = 1, MAX = 320;
    let nums = [];

    for (let i = MIN; i <= MAX; i++) {
      nums.push(i);
    }

    return nums;
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
      if (index + 1 > 이번턴에뽑을숫자갯수) {
        return false;
      } 
      console.log('[i]:',index) // i: 9이후로 출력 안됨, 고차함수의 콜백도 return이 마찬가지로 적용됨
      if (!arr[randomNum]) {
        console.log(randomNum)
        let prevNum = randomNum;
        randomNum = setRandomIndex(prevNum, arr.length - 1);
        nums.push(...arr.splice(randomNum, 1));
      } else {
        console.log('있다')
        nums.push(...arr.splice(randomNum, 1)); // splice =>return 제거한 요소를 담은 배열
      }
    });
    nums.sort((a, b) => a - b );
    console.log(nums, numberRange)
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
    let seconds = date.getSeconds();
  
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
  printNumber() {
    this.makeEl();
    const nums = this.createNumber();
    const target = document.querySelector('.number_list');
    const target2 = document.querySelector('.js-only-paper .game_item');
    const printTarget = [...target.children];
    const paperTarget = [...target2.children];
    
    target.classList.add('play');
    document.querySelector('.js-only-paper').classList.add('play');
    
    const id = setTimeout(() => {
      target.classList.remove('play');
      document.querySelector('.js-only-paper').classList.remove('play');
      console.log('[id]:',id)
      clearTimeout(id)
    },3000);
    
    printTarget.forEach((item, index) => {item.innerHTML = nums[index]});
    for (let i = 0; i < paperTarget.length; i++) {
      paperTarget[i].innerHTML = nums[i];
    }
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
  makeEl () {
    nthGame+=1;
    const numberList = document.querySelector('.number_list');
    console.log('[chid]:',numberList.children)
    if (numberList.children.length > 0) {
      for (i = 0;i< 이번턴에뽑을숫자갯수;i++) {
        numberList.children[i].remove();
      }
    }
      if (nthGame === 3) {
        이번턴에뽑을숫자갯수 = 2;
      }
      if (nthGame >3) {
        nthGame = 1;
        이번턴에뽑을숫자갯수 = 10;
      }
    for (let i = 0;i< 이번턴에뽑을숫자갯수;i++) {
      const li  = document.createElement('li')
      li.innerHTML = '?';
      // numberList.firstChild.remove()
      numberList.appendChild(li)
    }
    console.log('[numberList]:',numberList.children)
  },
  init() {
    const btn = this.btn;
    const multiBtn = this.multiBtn;
    this.makeEl();

    btn.addEventListener('click', () => {
      this.printNumber();
      this.printDate('.publish_date');
    });
    multiBtn.addEventListener('click', () => {
      this.printMultiNumber();
      this.printDate('.publish_date2');
    });
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
lottoSlide();