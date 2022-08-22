export interface Alarm {
  content: string;
  createdAt: string;
  isRead: 'N' | 'Y';
  notificationId: number;
  postId: number;
}
