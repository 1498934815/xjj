document.addEventListener('DOMContentLoaded', function() {
    // 配置常量
    const API_URL = 'https://api.jkyai.top/API/sjmtzs.php';
    
    // 获取DOM元素
    const elements = {
        refreshBtn: document.getElementById('refreshBtn'),
        imageContainer: document.querySelector('.image-container'),
        loading: document.getElementById('loading'),
        errorMsg: document.getElementById('errorMsg')
    };
    
    // 创建图片元素
    const img = document.createElement('img');
    img.id = 'randomImage';
    img.alt = '随机美女图片';
    elements.imageContainer.appendChild(img);
    
    // 显示加载状态
    function showLoading() {
        elements.loading.style.display = 'flex';
        img.style.display = 'none';
        elements.errorMsg.style.display = 'none';
    }
    
    // 隐藏加载状态
    function hideLoading() {
        elements.loading.style.display = 'none';
    }
    
    // 显示错误信息
    function showError() {
        elements.errorMsg.style.display = 'flex';
        img.style.display = 'none';
        hideLoading();
    }
    
    // 加载随机图片
    function loadRandomImage() {
        showLoading();
        
        // 添加时间戳防止缓存
        const timestamp = new Date().getTime();
        const imageUrl = `${API_URL}?t=${timestamp}`;
        
        // 设置图片加载和错误处理
        img.onload = function() {
            img.style.display = 'block';
            hideLoading();
        };
        
        img.onerror = function() {
            showError();
        };
        
        // 开始加载图片
        img.src = imageUrl;
    }
    
    // 绑定按钮点击事件
    elements.refreshBtn.addEventListener('click', function() {
        if (elements.loading.style.display !== 'flex') {
            loadRandomImage();
        }
    });
    
    // 添加键盘快捷键（空格键换图）
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            elements.refreshBtn.click();
        }
    });
    
    // 初始加载图片
    loadRandomImage();
});
