export interface ICollaborationRequest {
  id: string;
  ideaId: string;
  requesterId: string;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  chatId: string | null;
  feedback: string | null;
  createdAt: string;
  requester?: {
    displayName: string;
    icon: string | null;
  };
  idea?: {
    title: string;
    images: string[];
  };
}

export interface ICreateCollaborationRequest {
  ideaId: string;
  message: string;
}

export interface IApproveCollaborationRequest {
  collaborationRequestId: string;
  status: "APPROVED" | "REJECTED";
  feedback?: string;
}

