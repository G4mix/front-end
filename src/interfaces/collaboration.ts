export interface ICollaborationRequest {
  id: string;
  ideaId: string;
  requesterId: string;
  message: string;
  status: "Pending" | "Approved" | "Rejected";
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
  status: "Approved" | "Rejected";
  feedback?: string;
}

