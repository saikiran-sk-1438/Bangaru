// Web & Mobile Push Notification Engine for Bangaru Vedic Calendar

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert('Browser notifications are not supported on this device.');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

export async function scheduleEventReminder(booking) {
  const hasPermission = await requestNotificationPermission();

  if (!hasPermission) {
    alert('Notification permission is required to enable event reminders.');
    return false;
  }

  // Send an immediate confirmation notification
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'SCHEDULE_NOTIFICATION',
      title: `🔔 Reminder Set: ${booking.title}`,
      body: `You will be notified before ${booking.title} for ${booking.clientName} on ${booking.date}.`
    });
  } else {
    new Notification(`🔔 Reminder Set: ${booking.title}`, {
      body: `Event scheduled for ${booking.clientName} on ${booking.date} at ${booking.time}.`,
      icon: '/logo.png',
      badge: '/logo.png'
    });
  }

  return true;
}
