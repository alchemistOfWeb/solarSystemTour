import $ from 'jquery';

$(function() {
    const dataStr = localStorage.getItem('gameSetup');
    if (!dataStr) {
        $('.game-description').text('Нет данных о настройках игры.');
        return;
    }
    const data = JSON.parse(dataStr);
    let levelName = '';
    if (data.flightpathId) {
        const path = (window.readOnlyData?.flightpaths || []).find(p => p.id == data.flightpathId);
        levelName = path ? path.title_ru : '';
    }
    $('.game-description').text(`Вы выбрали маршрут: ${levelName}. Игра будет загружена позже.`);
});
