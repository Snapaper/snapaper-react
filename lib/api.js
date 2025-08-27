import { notification } from 'antd';

export const openNotificationWithIcon = (type, content) => {
  notification[type]({
    message: 'Notification',
    description: content,
  });
};

export async function fetcher(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchWithCache(url, options = {}) {
  const cacheOptions = {
    next: { revalidate: 3600 }, // Cache for 1 hour by default
    ...options,
  };

  return fetcher(url, cacheOptions);
}