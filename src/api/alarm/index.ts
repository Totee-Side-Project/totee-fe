import { api } from '@api/instance';

export const AlarmAPI = {
  getAlarm: () => api.get(`/api/v1/notification`),
  updateAlarm: (notificationId: string) =>
    api.post(`/api/v1/notification/${notificationId}`),
};
