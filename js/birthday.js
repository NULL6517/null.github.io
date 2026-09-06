// 获取DOM元素
const easterEggBtn = document.getElementById('easterEggBtn');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const progressEndEffect = document.getElementById('progressEndEffect');
const happyBirthday = document.getElementById('happyBirthday');
const emoji = document.getElementById('emoji');
const starsContainer = document.getElementById('stars');
const cake = document.querySelector('.cake');
const plate = document.querySelector('.plate');
const candle = document.querySelector('.candle');
const flame = document.getElementById('flame');
const bgMusic = document.getElementById('bgMusic');
const playButton = document.getElementById('playButton');

let isAnimationComplete = false;
let progress = 0;
let progressInterval;
let isEffectActive = false;
let musicStarted = false;
let animationStarted = false;

// 暖心话语库
const warmWords = [
  '永远爱你',
  '你值得最好的',
  '天天开心',
  '笑容最美',
  '生日快乐',
  '心想事成',
  '岁岁平安',
  '闪闪发光',
  '超级可爱',
  '财运亨通',
  '温暖如阳',
  '一路芬芳',
  '熠熠生辉',
  '永远年轻',
  '充满惊喜'
];

// 启动音乐播放
function startMusic() {
  if (bgMusic && !musicStarted) {
    console.log('尝试播放音乐...');
    bgMusic.volume = 0.5;
    bgMusic.muted = false;
    bgMusic.currentTime = 0;

    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log('✓ 音乐成功播放');
      }).catch(error => {
        console.log('✗ 音乐播放失败:', error.message);
        console.log('尝试静音播放...');
        bgMusic.muted = true;
        bgMusic.play().then(() => {
          console.log('✓ 静音播放成功，1秒后恢复音量');
          setTimeout(() => {
            bgMusic.muted = false;
            console.log('✓ 音量已恢复');
          }, 1000);
        });
      });
    }
    musicStarted = true;
  }
}

// 创建心形卡片
function createHeartCard(x, y) {
  const heartCard = document.createElement('div');
  heartCard.className = 'heart-card';
  heartCard.style.left = x + 'px';
  heartCard.style.top = y + 'px';

  // 随机选择暖心话语
  const randomWord = warmWords[Math.floor(Math.random() * warmWords.length)];

  // 随机心形颜色
  const heartColors = ['#ff3366', '#ff6b9d', '#ff85a2', '#ff1493', '#ff69b4'];
  const heartColor = heartColors[Math.floor(Math.random() * heartColors.length)];

  // 创建心形 SVG
  const heartSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  heartSvg.setAttribute('viewBox', '0 0 100 100');
  heartSvg.setAttribute('class', 'heart-shape');

  // 心形路径
  const heart = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  heart.setAttribute('d', 'M50,85 C20,70 5,55 5,40 C5,25 15,15 25,15 C35,15 45,25 50,35 C55,25 65,15 75,15 C85,15 95,25 95,40 C95,55 80,70 50,85 Z');
  heart.setAttribute('fill', heartColor);
  heart.setAttribute('opacity', '0.9');

  heartSvg.appendChild(heart);

  // 创建文字元素
  const textElement = document.createElement('div');
  textElement.className = 'heart-text';
  textElement.textContent = randomWord;

  heartCard.appendChild(heartSvg);
  heartCard.appendChild(textElement);

  document.body.appendChild(heartCard);

  // 添加浮动动画
  heartCard.classList.add('float');

  // 动画结束后移除
  setTimeout(() => {
    if (heartCard.parentNode) {
      heartCard.parentNode.removeChild(heartCard);
    }
  }, 3000);
}

// 创建背景星星
function createStars() {
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.opacity = Math.random() * 0.5 + 0.2;
    star.style.animationDelay = `${Math.random() * 3}s`;

    starsContainer.appendChild(star);
  }
}

// 创建彩色纸屑
function createConfetti() {
  const colors = ['#ff3366', '#ff9933', '#33ccff', '#9933ff', '#ff0066', '#00ff44', '#ddff00'];

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';

    const color = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.backgroundColor = color;
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear ${Math.random() * 2}s infinite`;

    starsContainer.appendChild(confetti);
  }
}

// 创建进度条末端效果
function createProgressEndEffect() {
  progressEndEffect.innerHTML = '';

  // 星星效果
  const star = document.createElement('div');
  star.className = 'star-effect';
  progressEndEffect.appendChild(star);

  // 礼花效果
  for (let i = 0; i < 4; i++) {
    const firework = document.createElement('div');
    firework.className = 'firework-effect';
    firework.style.background = i % 2 === 0 ? '#ff3366' : '#33ccff';
    progressEndEffect.appendChild(firework);

    // 礼花爆炸动画
    const angle = (Math.PI * 2 * i) / 4;
    const distance = 20;
    const duration = 0.8;

    firework.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
    ], {
      duration: duration * 1000,
      easing: 'ease-out',
      delay: i * 100
    });
  }

  progressEndEffect.style.opacity = '1';

  setTimeout(() => {
    progressEndEffect.style.opacity = '0';
  }, 800);
}

// Happy Birthday 文字逐个字母淡入
function animateHappyBirthday() {
  const text = happyBirthday.textContent;
  happyBirthday.textContent = '';

  for (let i = 0; i < text.length; i++) {
    const letter = document.createElement('span');
    letter.className = 'letter';
    letter.textContent = text[i];
    happyBirthday.appendChild(letter);

    if (text[i] === ' ') {
      letter.style.margin = '0 4px';
    }
  }

  const letters = document.querySelectorAll('.letter');
  letters.forEach((letter, index) => {
    setTimeout(() => {
      letter.animate([
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 800,
        easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)',
        fill: 'forwards'
      });
    }, index * 100);
  });

  // 表情符号淡入
  setTimeout(() => {
    emoji.animate([
      { opacity: 0, transform: 'scale(0)' },
      { opacity: 1, transform: 'scale(1.2)' },
      { opacity: 1, transform: 'scale(1)' }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)',
      fill: 'forwards'
    });
  }, letters.length * 100);
}

// 蜡烛点燃动画
function lightCandle() {
  cake.style.opacity = '1';
  plate.style.opacity = '1';

  setTimeout(() => {
    candle.style.opacity = '1';

    setTimeout(() => {
      flame.style.opacity = '1';
    }, 500);
  }, 500);
}

// 创建生日祝福文字
function createBirthdayText(x, y) {
  const text = document.createElement('div');
  text.className = 'birthday-text';
  text.textContent = '姐姐，生日快乐';
  text.style.left = x + 'px';
  text.style.top = y + 'px';

  const colors = ['#ff0066', '#ff9500', '#00ff44', '#ff001e', '#00ff66',
                 '#ddff00', '#fff700', '#ff00a6', '#00ff1e', '#5500ff'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  text.style.color = randomColor;

  document.body.appendChild(text);

  text.animate([
    { opacity: 0, transform: 'translateY(0) scale(0.5)' },
    { opacity: 1, transform: 'translateY(-20px) scale(1.2)' },
    { opacity: 0, transform: 'translateY(-40px) scale(1)' }
  ], {
    duration: 2000,
    easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
  });

  setTimeout(() => {
    if (text.parentNode) {
      text.parentNode.removeChild(text);
    }
  }, 2000);
}

// 显示全屏祝福文字
function showFullscreenText() {
  const fullscreenText = document.getElementById('birthdayText');
  fullscreenText.style.opacity = '1';

  fullscreenText.animate([
    { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
    { opacity: 1, transform: 'translate(-50%, -50%) scale(1.2)' },
    { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
  ], {
    duration: 2000,
    easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
  });

  createFullscreenFireworks();
}

// 创建满屏烟花
function createFullscreenFireworks() {
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      createBirthdayText(x, y);
    }, i * 100);
  }
}

// 更新进度条的函数
function updateProgress() {
  if (progress < 100) {
    const increment = Math.random() * 1 + 0.5;
    const oldProgress = progress;
    progress += increment;
    if (progress > 100) progress = 100;

    progressBar.style.width = progress + '%';

    const containerWidth = 200;
    const endPosition = (containerWidth * progress) / 100;
    progressEndEffect.style.left = `${endPosition - 10}px`;

    if (progress > 10 && Math.floor(oldProgress / 10) !== Math.floor(progress / 10)) {
      createProgressEndEffect();
    }

    if (progress >= 100 && !isAnimationComplete) {
      isAnimationComplete = true;
      clearInterval(progressInterval);
      setTimeout(() => {
        progressContainer.classList.remove('show');
        createProgressEndEffect();
      }, 1000);
    }
  }
}

// 监听烟花爆炸事件，添加生日祝福文字
document.addEventListener('animationiteration', function(e) {
  if (e.animationName === 'bang') {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createBirthdayText(x, y);
  }
});

// 跳转到彩蛋一
function goToEasterEgg1() {
  if (progress >= 100) {
    window.location.href = 'EasterEgg1.html';
  }
}

// 为按钮添加点击事件
easterEggBtn.addEventListener('click', goToEasterEgg1);

// 启动所有动画和音乐
function startAnimation() {
  if (animationStarted) return;
  animationStarted = true;

  // 隐藏播放按钮
  playButton.classList.add('hidden');

  // 启动音乐
  startMusic();

  // 创建背景效果
  createStars();
  createConfetti();

  setTimeout(() => {
    animateHappyBirthday();
    lightCandle();

    setTimeout(() => {
      showFullscreenText();
    }, 1500);

    setTimeout(() => {
      progressContainer.classList.add('show');
      progressInterval = setInterval(updateProgress, 200);

      // 定时创建心形卡片
      setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.6;
        createHeartCard(x, y);
      }, 1200);

      setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createBirthdayText(x, y);
      }, 1500);

      setInterval(() => {
        createConfetti();
      }, 3000);
    }, 3000);
  }, 1000);
}

// 播放按钮点击事件
playButton.addEventListener('click', startAnimation);
document.addEventListener('keydown', startAnimation);
