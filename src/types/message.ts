export interface AffiliateMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'admin' | 'affiliate' | 'governor';
  content: string;
  timestamp: Date;
  conversationId: string;
  replyTo?: string;
  attachments?: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'sent' | 'delivered' | 'read';
  department?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  participantNames: string[];
  lastMessage: string;
  lastMessageTime: Date;
  createdAt: Date;
  updatedAt: Date;
}