export const startPolling = (cb, interval) => {
    const timer = setInterval(() => {
        cb();
    }, interval);
    return () => clearInterval(timer);
};
