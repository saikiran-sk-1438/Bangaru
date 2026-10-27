// Automatic Google Calendar Sync Utility for Bangaru Vedic Calendar

export async function syncBookingToGoogleCalendar(booking) {
  const token = localStorage.getItem('bangaru_google_token');
  const { title, date, time, clientName, venue, totalDakshina } = booking;

  // 1. If Google OAuth Access Token is available, call Google Calendar REST API directly!
  if (token) {
    try {
      const cleanDate = date; // YYYY-MM-DD
      const startDateTime = `${cleanDate}T08:30:00+05:30`;
      const endDateTime = `${cleanDate}T11:30:00+05:30`;

      const eventPayload = {
        summary: `🕉️ ${title} - ${clientName}`,
        location: venue || 'Yajamana Residence',
        description: `Bangaru Vedic Calendar Booking\n\nCeremony: ${title}\nClient: ${clientName}\nTime: ${time}\nDakshina: ₹${totalDakshina}`,
        start: { dateTime: startDateTime, timeZone: 'Asia/Kolkata' },
        end: { dateTime: endDateTime, timeZone: 'Asia/Kolkata' },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'popup', minutes: 1440 }, // 24 hours before
            { method: 'popup', minutes: 120 }   // 2 hours before
          ]
        }
      };

      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventPayload)
      });

      if (response.ok) {
        console.log('Successfully synced event to Google Calendar API!');
        return { success: true, api: true };
      }
    } catch (err) {
      console.warn('Google Calendar API sync fallback:', err);
    }
  }

  // 2. Direct Google Calendar template URL
  const googleUrl = generateGoogleCalendarUrl(booking);
  return { success: true, url: googleUrl };
}

export function generateGoogleCalendarUrl(booking) {
  const { title, date, time, clientName, venue, totalDakshina } = booking;
  const cleanDate = date.replace(/-/g, '');
  
  let startTimeStr = '083000';
  let endTimeStr = '113000';

  if (time) {
    if (time.includes('06:00') || time.includes('6:00')) {
      startTimeStr = '060000';
      endTimeStr = '090000';
    } else if (time.includes('09:00') || time.includes('9:00')) {
      startTimeStr = '090000';
      endTimeStr = '120000';
    } else if (time.includes('05:00') || time.includes('5:00') || time.includes('17:00')) {
      startTimeStr = '170000';
      endTimeStr = '200000';
    }
  }

  const startIso = `${cleanDate}T${startTimeStr}`;
  const endIso = `${cleanDate}T${endTimeStr}`;

  const eventTitle = encodeURIComponent(`🕉️ ${title} - ${clientName}`);
  const details = encodeURIComponent(
    `Bangaru Vedic Calendar Ceremony\n\n` +
    `Ceremony: ${title}\n` +
    `Yajamana Client: ${clientName}\n` +
    `Time: ${time}\n` +
    `Venue: ${venue}\n` +
    `Dakshina Fee: ₹${totalDakshina}\n\n` +
    `Auto-saved by Bangaru Vedic Calendar.`
  );
  const location = encodeURIComponent(venue || 'Yajamana Residence');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
}

export function downloadIcalFile(booking) {
  const { title, date, time, clientName, venue, totalDakshina } = booking;
  const cleanDate = date.replace(/-/g, '');
  
  const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Bangaru Vedic Calendar//NONSGML Event//EN
BEGIN:VEVENT
UID:${booking.id || Date.now()}@bangaru.vedic
DTSTAMP:${cleanDate}T000000Z
DTSTART:${cleanDate}T083000
DTEND:${cleanDate}T113000
SUMMARY:🕉️ ${title} - ${clientName}
DESCRIPTION:Ceremony: ${title}\\nClient: ${clientName}\\nDakshina: ₹${totalDakshina}
LOCATION:${venue || 'Yajamana Residence'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/\s+/g, '_')}_Event.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
