const SEATTLE = {
  latitude: 47.6062,
  longitude: -122.3321,
  timezone: 'America/Los_Angeles',
};

const REFRESH_MS = 10 * 60 * 1000;

type IconName = 'clear' | 'partly' | 'cloudy' | 'fog' | 'rain' | 'snow' | 'storm';

function svg(body: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}

const icons: Record<IconName, string> = {
  clear: svg(
    '<circle cx="12" cy="12" r="3.5"/><path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18"/>',
  ),
  partly: svg(
    '<circle cx="8" cy="9" r="2.4"/><path d="M8 4.2v1.3M8 12.5v1.2M3.6 9H4.9M11.1 9h1.3M5 6l.9.9M10.1 11.1l.9.9M11 6l-.9.9"/><path d="M9.2 17.5h7.2a2.8 2.8 0 0 0 .4-5.6 4 4 0 0 0-7.6 1.1 2.3 2.3 0 0 0 0 4.5z"/>',
  ),
  cloudy: svg('<path d="M7.5 17.5h9.2a3.2 3.2 0 0 0 .5-6.4 4.6 4.6 0 0 0-8.8 1.3 2.6 2.6 0 0 0-.9 5.1z"/>'),
  fog: svg('<path d="M5 9h14M4 12.5h16M6 16h12"/>'),
  rain: svg(
    '<path d="M7.2 14.2h8.6a2.9 2.9 0 0 0 .4-5.8 4.2 4.2 0 0 0-8-1.2 2.4 2.4 0 0 0-1 7z"/><path d="M9 16.2l-.7 2.2M12 16.2l-.7 2.2M15 16.2l-.7 2.2"/>',
  ),
  snow: svg(
    '<path d="M7.2 14.2h8.6a2.9 2.9 0 0 0 .4-5.8 4.2 4.2 0 0 0-8-1.2 2.4 2.4 0 0 0-1 7z"/><path d="M9 17.2h.1M12 17.2h.1M15 17.2h.1M10.5 19.2h.1M13.5 19.2h.1"/>',
  ),
  storm: svg(
    '<path d="M7.2 13.4h8.4a2.8 2.8 0 0 0 .4-5.6 4 4 0 0 0-7.6 1.1 2.3 2.3 0 0 0-1.2 4.5z"/><path d="M11.2 13.2 9.4 17h2.2L10.4 21"/>',
  ),
};

function describe(code: number): { label: string; icon: IconName } {
  if (code === 0) return { label: 'Clear', icon: 'clear' };
  if (code === 1) return { label: 'Mainly clear', icon: 'partly' };
  if (code === 2) return { label: 'Partly cloudy', icon: 'partly' };
  if (code === 3) return { label: 'Overcast', icon: 'cloudy' };
  if (code === 45 || code === 48) return { label: 'Fog', icon: 'fog' };
  if (code >= 51 && code <= 67) return { label: 'Rain', icon: 'rain' };
  if (code >= 71 && code <= 77) return { label: 'Snow', icon: 'snow' };
  if (code >= 80 && code <= 82) return { label: 'Showers', icon: 'rain' };
  if (code >= 85 && code <= 86) return { label: 'Snow showers', icon: 'snow' };
  if (code >= 95) return { label: 'Thunderstorm', icon: 'storm' };
  return { label: 'Current conditions', icon: 'cloudy' };
}

export function mountWeather() {
  const root = document.querySelector<HTMLElement>('[data-weather]');
  const text = root?.querySelector<HTMLElement>('[data-weather-text]');
  const icon = root?.querySelector<HTMLElement>('[data-weather-icon]');
  if (!root || !text || !icon) return;

  let lastFetch = 0;
  let request = 0;

  const refresh = async () => {
    const id = ++request;
    const params = new URLSearchParams({
      latitude: String(SEATTLE.latitude),
      longitude: String(SEATTLE.longitude),
      current: 'temperature_2m,weather_code',
      temperature_unit: 'fahrenheit',
      timezone: SEATTLE.timezone,
    });

    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
      if (!response.ok) throw new Error(`Weather request failed (${response.status})`);
      const payload = (await response.json()) as {
        current?: { temperature_2m?: number; weather_code?: number };
      };
      const temperature = payload.current?.temperature_2m;
      const code = payload.current?.weather_code;
      if (id !== request || typeof temperature !== 'number' || typeof code !== 'number') {
        throw new Error('Weather response was incomplete');
      }
      const conditions = describe(code);
      const summary = ` · ${Math.round(temperature)}° · ${conditions.label}`;
      if (text.textContent !== summary) text.textContent = summary;
      icon.innerHTML = icons[conditions.icon];
      lastFetch = Date.now();
    } catch {
      if (id !== request) return;
      text.textContent = ' · weather unavailable';
      icon.replaceChildren();
    }
  };

  void refresh();
  window.setInterval(() => void refresh(), REFRESH_MS);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && Date.now() - lastFetch > REFRESH_MS) {
      void refresh();
    }
  });
}
