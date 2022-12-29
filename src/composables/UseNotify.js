import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar();

  const notifySuccess = (message) => {
    $q.notify({ type: "positive", message });
  };

  const notifyError = (message) => {
    $q.notify({ type: "negative", message: message || "Ha ocurrido un error" });
  };

  const notifyWarning = (message) => {
    $q.notify({ type: "warning", message });
  };

  return {
    notifySuccess,
    notifyError,
    notifyWarning,
  };
}
