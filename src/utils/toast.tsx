// Sistema de notificações simples
type ToastType = "success" | "error" | "info";

let toastContainer: HTMLDivElement | null = null;

const getToastContainer = (): HTMLDivElement => {
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
};

const showToast = (message: string, type: ToastType = "info") => {
  const container = getToastContainer();
  
  const toast = document.createElement("div");
  toast.style.cssText = `
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    pointer-events: auto;
    animation: slideIn 0.3s ease-out;
    max-width: 350px;
  `;

  // Cores baseadas no tipo
  switch (type) {
    case "success":
      toast.style.background = "#10b981";
      break;
    case "error":
      toast.style.background = "#ef4444";
      break;
    default:
      toast.style.background = "#3b82f6";
  }

  toast.textContent = message;
  container.appendChild(toast);

  // Adicionar animação CSS
  if (!document.getElementById("toast-styles")) {
    const style = document.createElement("style");
    style.id = "toast-styles";
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Remover após 3 segundos
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease-in";
    setTimeout(() => {
      container.removeChild(toast);
    }, 300);
  }, 3000);
};

export const toast = {
  success: (message: string) => showToast(message, "success"),
  error: (message: string) => showToast(message, "error"),
  info: (message: string) => showToast(message, "info"),
};

