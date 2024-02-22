document.addEventListener('DOMContentLoaded', async (event) => {
  const osData = await window.electron.ipcRenderer.invoke('get-os-data');

  const data = document.getElementById('data');

  data.innerHTML = `
      <p>Имя компьютера: ${osData.hostname}</p>
      <p>Имя пользователя: ${osData.username}</p>
      <p>Пути к системным каталогам Windows: ${osData.systemRoot}</p>
      <p>Версия операционной системы: ${osData.osVersion}</p>
      
      <p>Системные метрики:</p>
      <ul>
        <li>Загрузка процессора: ${osData.cpuLoad}%</li>
        <li>Количество используемой оперативной памяти: ${osData.memoryUsage[0]} из ${osData.memoryUsage[1]}</li>
        <li>Время отклика: ${osData.responseTime}s</li>
      </ul>
      <p>Системные параметры:</p
      <ul>
        <li>Архитектура процессора: ${osData.arch}</li>
        <li>IP адресс: ${osData.ipAddress}</li>
        <li>Количество ядер у процессора: ${osData.countCpus}</li>
      </ul>
    `;
});