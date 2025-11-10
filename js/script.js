// 创建飘动的粒子
function createParticles() {
    // 为两个页面分别创建粒子，确保切换后粒子效果连贯
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        page.appendChild(particlesContainer);
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // 随机大小
            const size = Math.random() * 8 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // 随机位置
            particle.style.left = `${Math.random() * 100}vw`;
            
            // 随机延迟
            particle.style.animationDelay = `${Math.random() * 15}s`;
            
            // 随机颜色 - GRIS风格柔和色调
            const colors = [
                'rgba(255, 154, 158, 0.7)',
                'rgba(168, 192, 255, 0.7)',
                'rgba(250, 208, 196, 0.7)',
                'rgba(212, 252, 121, 0.7)',
                'rgba(255, 255, 255, 0.7)'
            ];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particlesContainer.appendChild(particle);
        }
    });
}

// 主题切换功能（仅作用于第一页）
const themeBtn = document.querySelector('.theme-btn');
const page1 = document.querySelector('#page1');
const page1Gris = page1.querySelectorAll('.gris-element'); // 第一页背景元素
const page1Content = page1.querySelector('.main-content');

let currentTheme = 0;
const themes = [
    {
        background: 'linear-gradient(135deg, #e6d7ff 0%, #a8c0ff 100%)',
        colors: ['#ff9a9e', '#a8c0ff', '#fad0c4', '#d4fc79']
    },
    {
        background: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
        colors: ['#a1c4fd', '#c2e9fb', '#ffd1ff', '#fad0c4']
    },
    {
        background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        colors: ['#d4fc79', '#96e6a1', '#fad0c4', '#a1c4fd']
    },
    {
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        colors: ['#ff9a9e', '#fad0c4', '#a8c0ff', '#ffecd2']
    }
];

// 主题切换事件
themeBtn.addEventListener('click', () => {
    currentTheme = (currentTheme + 1) % themes.length;
    const theme = themes[currentTheme];
    
    // 切换第一页背景
    page1.style.background = theme.background;
    
    // 切换第一页背景元素颜色
    page1Gris.forEach((element, index) => {
        element.style.background = theme.colors[index % theme.colors.length];
    });
    
    // 主内容区动画效果
    page1Content.style.animation = 'none';
    setTimeout(() => {
        page1Content.style.animation = 'fadeIn 1.5s ease-out';
    }, 10);
});

// 页面切换逻辑（第一页→第二页，第二页→第一页）
const babyBtn = document.querySelector('#babyBtn');
const backBtn = document.querySelector('#backBtn');
const page2 = document.querySelector('#page2');
const page2Gris = page2.querySelectorAll('.gris-element'); // 第二页背景元素

// 点击"宝宝"进入第二页
babyBtn.addEventListener('click', () => {
    page1.classList.add('hidden');
    page2.classList.remove('hidden');
    
    // 第二页继承第一页当前主题，保持视觉统一
    page2.style.background = page1.style.background;
    page2Gris.forEach((element, index) => {
        element.style.background = themes[currentTheme].colors[index % themes[currentTheme].colors.length];
    });
});

// 点击"返回"回到第一页
backBtn.addEventListener('click', () => {
    page2.classList.add('hidden');
    page1.classList.remove('hidden');
});

// 鼠标移动视差效果（作用于两个页面的背景元素）
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // 遍历所有背景元素，添加视差移动
    const allGris = document.querySelectorAll('.gris-element');
    allGris.forEach((element, index) => {
        const speed = (index % 4 + 1) * 0.5; // 每个页面内元素速度一致
        const xMove = (x - 0.5) * 20 * speed;
        const yMove = (y - 0.5) * 20 * speed;
        
        element.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

// 初始化：创建粒子+设置第一页默认主题
createParticles();
page1.style.background = themes[0].background;
page1Gris.forEach((element, index) => {
    element.style.background = themes[0].colors[index % themes[0].colors.length];
});

document.addEventListener('DOMContentLoaded', () => {
    // 目标文本
    const textToType = "hello,world!"; 
    
    // 目标元素
    const targetElement = document.getElementById('typewriter-text');
    
    // 打字速度 (毫秒)
    const typingSpeed = 150; 
    
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            // 逐个添加字母
            targetElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            
            // 使用 setTimeout 递归调用，控制速度
            setTimeout(typeWriter, typingSpeed);
        } 
    }

    // 仅在 page1 显示时才开始动画 (可选优化)
    const page1 = document.getElementById('page1');
    if (page1 && !page1.classList.contains('hidden')) {
        typeWriter();
    }
});