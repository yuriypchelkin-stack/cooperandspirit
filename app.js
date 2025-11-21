document.addEventListener('DOMContentLoaded', function() {
    const arButton = document.getElementById('ar-button');
    const scene = document.querySelector('a-scene');
    
    arButton.addEventListener('click', function() {
        // Запрашиваем доступ к камере
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(stream) {
                    // Показываем AR сцену
                    scene.style.display = 'block';
                    arButton.style.display = 'none';
                    
                    // Автозапуск видео при обнаружении маркера
                    const marker = document.querySelector('a-marker');
                    marker.addEventListener('markerFound', function() {
                        const video = document.querySelector('a-video');
                        video.setAttribute('visible', 'true');
                    });
                    
                    // Скрываем видео когда маркер потерян
                    marker.addEventListener('markerLost', function() {
                        const video = document.querySelector('a-video');
                        video.setAttribute('visible', 'false');
                    });
                })
                .catch(function(error) {
                    alert('Не удалось получить доступ к камере: ' + error.message);
                });
        } else {
            alert('Ваш браузер не поддерживает доступ к камере');
        }
    });
});