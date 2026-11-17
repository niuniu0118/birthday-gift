// --- 获取所有 HTML 元素 ---
const bgm = document.getElementById('bgm-music');
const timoSound = document.getElementById('timo-sound');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const closeBtn = document.getElementById('close-btn');
const achievement = document.getElementById('achievement');
const giftBtn = document.getElementById('gift-btn');

// 记录已点击的咕咕
let clickedGugus = new Set();

// 你的三段专属录音（确保文件夹里有 voice1.mp3、voice2.mp3、voice3.mp3，如果是m4a就改后缀）
const voiceAudios = {
    1: new Audio('voice1.mp3'),
    2: new Audio('voice2.mp3'),
    3: new Audio('voice3.mp3')
};

// 咕咕对应的文字（你可以自己改里面的字）
const messages = {
    1: "雷霆崖的牛头咕咕说：愿你的生命值像牛头人的血量一样厚，怎么打都不掉。",
    2: "牛头咕咕拍了拍自己的大肚子：别看我胖，我变熊能抗、变豹能跑、变咕咕能卖萌。",
    3: "藏宝海湾的牛头咕咕掏了掏口袋：我没什么好东西，就送你一瓶诺格弗格药剂吧。"
};

// --- 1. 点击开场遮罩层：启动音乐和开场白 ---
document.getElementById('start-overlay').addEventListener('click', function() {
    this.style.display = 'none'; // 隐藏遮罩层
    
    // 播放 BGM (音量 30%)
    bgm.volume = 0.3;
    bgm.play().catch(err => console.log('BGM播放失败:', err));
    
    // 如果你有开场白录音，取消下面的注释并确保有 opening.mp3
    /*
    const mainVoice = new Audio('opening.mp3');
    mainVoice.play().catch(err => console.log('开场白播放失败:', err));
    */
});

// --- 2. 点击咕咕：播放录音、提莫笑和弹窗 ---
document.querySelectorAll('.hotspot').forEach(gugu => {
    gugu.addEventListener('click', function(e) {
        const id = this.dataset.id;

        // A. 播放对应录音
        if (voiceAudios[id]) {
            voiceAudios[id].currentTime = 0; 
            voiceAudios[id].play().catch(err => console.log('录音播放失败:', err));
        }

        // B. 咕咕抖动特效
        this.style.animation = 'none';
        this.offsetHeight;
        this.style.animation = 'float 2s ease-in-out infinite';

        // C. 显示弹窗文字
        popupText.textContent = messages[id];
        popup.classList.remove('hidden');

        clickedGugus.add(id);
    });
});

// --- 3. 关闭弹窗：判断是否三只都点完 ---
closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');

    if (clickedGugus.size === 3) {
        setTimeout(() => {
            // 弹出成就框
            achievement.classList.remove('hidden');
            
            // 三只点完，播放提莫嘲笑
            timoSound.currentTime = 0;
            timoSound.play().catch(err => console.log('提莫笑播放失败:', err));
            
        }, 400);
    }
});

// --- 4. 领奖按钮逻辑 ---
giftBtn.addEventListener('click', () => {
    if (localStorage.getItem('gameCleared') === 'true') {
        alert('恭喜通关！礼物就是……快去找寿星领取吧！🎉'); 
    } else {
        alert('先去通关小游戏才能解锁礼物哦！');
    }
});