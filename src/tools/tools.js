const os = require('os');

function bytesToGigabytes(bytes) {
    if (typeof bytes !== 'number' || isNaN(bytes) || bytes < 0) {
        return 'Некорректные входные данные';
    }

    const gigabytes = bytes / (1024 * 1024 * 1024);
    return gigabytes.toFixed(2) + ' GB';
}

function getCpuLoad() {
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;

    cpus.forEach((cpu) => {
        for (let type in cpu.times) {
            totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    });

    return 100 - (totalIdle / totalTick) * 100;
}

function returnIpAddress() {
    const ifaces = os.networkInterfaces();
    let ipAddress;

    Object.keys(ifaces).forEach((ifname) => {
        ifaces[ifname].forEach((iface) => {
            if ('IPv4' === iface.family && !iface.internal) {
                ipAddress = iface.address;
            }
        });
    });

    return ipAddress;
}

module.exports = {
    bytesToGigabytes: bytesToGigabytes,
    getCpuLoad: getCpuLoad,
    returnIpAddress: returnIpAddress,
}